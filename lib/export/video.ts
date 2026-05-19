export interface VideoExportOptions {
  canvas: HTMLCanvasElement;
  duration: number; // seconds
  fps: number;
  filename: string;
  format: "mp4" | "webm";
  onProgress?: (progress: number) => void;
}

export async function exportVideo({
  canvas,
  duration,
  fps,
  filename,
  format,
  onProgress,
}: VideoExportOptions): Promise<void> {
  const preferredMime =
    format === "mp4" ? "video/mp4" : "video/webm;codecs=vp9";
  const fallbackMime = "video/webm";

  const useMimeType = MediaRecorder.isTypeSupported(preferredMime)
    ? preferredMime
    : MediaRecorder.isTypeSupported(fallbackMime)
    ? fallbackMime
    : null;

  if (!useMimeType) {
    throw new Error("Video recording is not supported in this browser");
  }

  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType: useMimeType });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  return new Promise((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: useMimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // mp4 mime may still produce webm in practice; use .webm extension for compatibility
      const ext = useMimeType.startsWith("video/mp4") ? "mp4" : "webm";
      a.download = `${filename}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      resolve();
    };

    recorder.onerror = (e) => reject(new Error(`Recording error: ${e}`));
    recorder.start(100); // 100 ms chunks

    const tickMs = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += tickMs / 1000;
      onProgress?.(Math.min(elapsed / duration, 1));
      if (elapsed >= duration) {
        clearInterval(interval);
        recorder.stop();
        stream.getTracks().forEach((t) => t.stop());
      }
    }, tickMs);
  });
}
