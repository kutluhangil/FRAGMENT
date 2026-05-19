export async function exportPNG(
  canvas: HTMLCanvasElement,
  filename: string = "fragment",
  scale: number = 1
): Promise<void> {
  let exportCanvas: HTMLCanvasElement = canvas;

  if (scale > 1) {
    exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width * scale;
    exportCanvas.height = canvas.height * scale;
    const ctx = exportCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(canvas, 0, 0, exportCanvas.width, exportCanvas.height);
    }
  }

  return new Promise((resolve, reject) => {
    exportCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob from canvas"));
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        resolve();
      },
      "image/png"
    );
  });
}
