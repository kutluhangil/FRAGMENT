export class WebcamCapture {
  private videoElement: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;

  async start(mirrored: boolean = false): Promise<HTMLVideoElement> {
    this.stop();

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
    });

    this.videoElement = document.createElement("video");
    this.videoElement.srcObject = this.stream;
    this.videoElement.autoplay = true;
    this.videoElement.playsInline = true;
    this.videoElement.muted = true;
    if (mirrored) this.videoElement.style.transform = "scaleX(-1)";

    await new Promise<void>((resolve) => {
      this.videoElement!.onloadedmetadata = () => resolve();
    });

    await this.videoElement.play();
    return this.videoElement;
  }

  stop(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
      this.videoElement = null;
    }
  }

  getVideo(): HTMLVideoElement | null {
    return this.videoElement;
  }
}
