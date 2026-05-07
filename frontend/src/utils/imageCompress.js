/**
 * imageCompress.js
 * Compresses an image File before sending to the Groq vision API.
 * - Skips compression if the image is already small / JPEG / small dimensions.
 * - Outputs a JPEG at quality 0.72 with max dimension 1280 px.
 */
export async function compressImageForVision(file) {
  if (!file.type.startsWith("image/")) return file;

  const imageUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload  = () => resolve(img);
      img.onerror = () => reject(new Error("Could not read the selected image."));
      img.src = imageUrl;
    });

    const shouldCompress =
      file.size > 1.5 * 1024 * 1024 ||
      file.type !== "image/jpeg"     ||
      image.width  > 1400            ||
      image.height > 1400;

    if (!shouldCompress) return file;

    const MAX = 1280;
    const scale  = Math.min(MAX / image.width, MAX / image.height, 1);
    const width  = Math.max(1, Math.round(image.width  * scale));
    const height = Math.max(1, Math.round(image.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width  = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not prepare the image for upload.");

    ctx.drawImage(image, 0, 0, width, height);

    const blob = await new Promise((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Compression failed."))),
        "image/jpeg",
        0.72,
      ),
    );

    return new File(
      [blob],
      `${file.name.replace(/\.[^.]+$/, "") || "upload"}.jpg`,
      { type: "image/jpeg" },
    );
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}
