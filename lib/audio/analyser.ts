export interface AudioAnalyserConfig {
  fftSize?: number;
  smoothingTimeConstant?: number;
}

export class AudioAnalyser {
  private audioContext: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private sourceNode: MediaStreamAudioSourceNode | AudioBufferSourceNode | null = null;
  private frequencyData: Float32Array<ArrayBuffer> | null = null;
  private animFrameId: number | null = null;

  private lowBand = 0;
  private midBand = 0;
  private highBand = 0;

  private config: Required<AudioAnalyserConfig>;

  constructor(config: AudioAnalyserConfig = {}) {
    this.config = {
      fftSize: config.fftSize ?? 2048,
      smoothingTimeConstant: config.smoothingTimeConstant ?? 0.85,
    };
  }

  async initMic(): Promise<void> {
    this.cleanup();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    this.audioContext = new AudioContext();
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = this.config.fftSize;
    this.analyserNode.smoothingTimeConstant = this.config.smoothingTimeConstant;
    this.frequencyData = new Float32Array(this.analyserNode.frequencyBinCount);
    this.sourceNode = this.audioContext.createMediaStreamSource(stream);
    this.sourceNode.connect(this.analyserNode);
    this.startAnalysis();
  }

  async initFile(file: File): Promise<void> {
    this.cleanup();
    this.audioContext = new AudioContext();
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = this.config.fftSize;
    this.analyserNode.smoothingTimeConstant = this.config.smoothingTimeConstant;
    this.frequencyData = new Float32Array(this.analyserNode.frequencyBinCount);

    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;
    source.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);
    source.start();
    this.sourceNode = source;
    this.startAnalysis();
  }

  private startAnalysis(): void {
    const analyze = () => {
      if (!this.analyserNode || !this.frequencyData || !this.audioContext) return;
      this.animFrameId = requestAnimationFrame(analyze);
      this.analyserNode.getFloatFrequencyData(this.frequencyData);
      this.updateBands();
    };
    analyze();
  }

  private updateBands(): void {
    if (!this.frequencyData || !this.audioContext) return;

    const nyquist = this.audioContext.sampleRate / 2;
    const binHz = nyquist / this.frequencyData.length;

    const getBandLevel = (minHz: number, maxHz: number): number => {
      const minBin = Math.floor(minHz / binHz);
      const maxBin = Math.min(Math.ceil(maxHz / binHz), this.frequencyData!.length - 1);
      let sum = 0;
      let count = 0;
      for (let i = minBin; i <= maxBin; i++) {
        // Convert dB to linear (frequencyData is in dB, -Infinity to 0)
        const linear = Math.pow(10, (this.frequencyData![i] + 100) / 20);
        sum += Math.max(0, linear);
        count++;
      }
      return count > 0 ? Math.min(1, sum / count) : 0;
    };

    this.lowBand = getBandLevel(20, 250);
    this.midBand = getBandLevel(250, 4000);
    this.highBand = getBandLevel(4000, 16000);
  }

  getLevels(): { low: number; mid: number; high: number } {
    return { low: this.lowBand, mid: this.midBand, high: this.highBand };
  }

  getFrequencyData(): Float32Array | null {
    return this.frequencyData;
  }

  cleanup(): void {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.animFrameId = null;
    if (this.sourceNode && "stop" in this.sourceNode) {
      try { (this.sourceNode as AudioBufferSourceNode).stop(); } catch {}
    }
    this.audioContext?.close();
    this.audioContext = null;
    this.analyserNode = null;
    this.sourceNode = null;
    this.frequencyData = null;
  }
}
