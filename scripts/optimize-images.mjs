import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputDir = path.join(projectRoot, "src", "assets", "optimized");

const images = [
  {
    name: "carambolo-logo",
    input: "src/assets/carambolo-logo.png",
    widths: [80, 160, 320],
    fallbackWidths: [320],
    formats: ["avif", "webp", "png"],
    fit: "inside",
  },
  {
    name: "hero-studio",
    input: "src/assets/hero-studio-web.jpg",
    widths: [768, 1280, 1600],
    fallbackWidths: [1600],
    formats: ["avif", "webp", "jpg"],
  },
  {
    name: "gallery-band",
    input: "src/assets/gallery-band.jpg",
    widths: [320, 640, 800],
    fallbackWidths: [800],
    formats: ["avif", "webp", "jpg"],
  },
  {
    name: "gallery-console",
    input: "src/assets/gallery-console.jpg",
    widths: [320, 640, 941],
    fallbackWidths: [941],
    formats: ["avif", "webp", "jpg"],
  },
  {
    name: "gallery-drums",
    input: "src/assets/gallery-drums.jpg",
    widths: [320, 640, 1254],
    fallbackWidths: [1254],
    formats: ["avif", "webp", "jpg"],
  },
  {
    name: "gallery-guitar",
    input: "src/assets/gallery-guitar.jpg",
    widths: [320, 640, 800],
    fallbackWidths: [800],
    formats: ["avif", "webp", "jpg"],
  },
  {
    name: "gallery-mic",
    input: "src/assets/gallery-mic.jpg",
    widths: [320, 640, 800],
    fallbackWidths: [800],
    formats: ["avif", "webp", "jpg"],
  },
  {
    name: "gallery-vocal",
    input: "src/assets/gallery-vocal.jpg",
    widths: [320, 640, 800],
    fallbackWidths: [800],
    formats: ["avif", "webp", "jpg"],
  },
  {
    name: "parking-studio",
    input: "src/assets/parking-studio.jpg",
    widths: [640, 960, 1200],
    fallbackWidths: [1200],
    formats: ["avif", "webp", "jpg"],
  },
];

const encoders = {
  avif: (image) => image.avif({ quality: 58, effort: 6 }),
  webp: (image) => image.webp({ quality: 78, effort: 5 }),
  jpg: (image) => image.jpeg({ quality: 78, mozjpeg: true, progressive: true }),
  png: (image) => image.png({ compressionLevel: 9, palette: true }),
};

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function widthsForFormat(config, format) {
  const isFallback = format === "jpg" || format === "png";
  return isFallback ? (config.fallbackWidths ?? config.widths) : config.widths;
}

async function writeIfChanged(outputPath, buffer) {
  if (await exists(outputPath)) {
    const current = await fs.readFile(outputPath);
    if (Buffer.compare(current, buffer) === 0) {
      return false;
    }
  }

  await fs.writeFile(outputPath, buffer);
  return true;
}

async function optimizeImage(config, expectedFiles) {
  const inputPath = path.join(projectRoot, config.input);

  if (!(await exists(inputPath))) {
    throw new Error(`Arquivo de origem não encontrado: ${config.input}`);
  }

  const metadata = await sharp(inputPath).metadata();
  const sourceWidth = metadata.width ?? 0;
  const sourceHeight = metadata.height ?? 0;

  if (!sourceWidth || !sourceHeight) {
    throw new Error(`Não foi possível ler dimensões de: ${config.input}`);
  }

  const validWidths = new Set(config.widths.filter((width) => width <= sourceWidth));
  const validFallbackWidths = new Set(
    (config.fallbackWidths ?? config.widths).filter((width) => width <= sourceWidth),
  );

  if (validWidths.size === 0 || validFallbackWidths.size === 0) {
    throw new Error(`Nenhuma largura válida para: ${config.input}`);
  }

  const generated = [];

  for (const format of config.formats) {
    const widths = widthsForFormat(config, format).filter((width) =>
      format === "jpg" || format === "png"
        ? validFallbackWidths.has(width)
        : validWidths.has(width),
    );

    for (const width of widths) {
      const extension = format === "jpg" ? "jpg" : format;
      const outputFileName = `${config.name}-${width}.${extension}`;
      const outputPath = path.join(outputDir, outputFileName);
      expectedFiles.add(outputFileName);

      if (path.resolve(outputPath) === path.resolve(inputPath)) {
        throw new Error(`Recusando sobrescrever original: ${config.input}`);
      }

      const transformer = sharp(inputPath)
        .rotate()
        .resize({
          width,
          withoutEnlargement: true,
          fit: config.fit ?? "cover",
        });

      const buffer = await encoders[format](transformer).toBuffer();
      const wrote = await writeIfChanged(outputPath, buffer);

      const stats = await fs.stat(outputPath);
      generated.push({
        file: path.relative(projectRoot, outputPath).replaceAll("\\", "/"),
        width,
        height: Math.round((sourceHeight / sourceWidth) * width),
        sizeKb: Math.round((stats.size / 1024) * 10) / 10,
        status: wrote ? "updated" : "unchanged",
      });
    }
  }

  return generated;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const allGenerated = [];
  const expectedFiles = new Set();

  for (const image of images) {
    const generated = await optimizeImage(image, expectedFiles);
    allGenerated.push(...generated);
  }

  const existingFiles = await fs.readdir(outputDir);
  const removed = [];

  for (const fileName of existingFiles) {
    if (!expectedFiles.has(fileName)) {
      await fs.rm(path.join(outputDir, fileName));
      removed.push(fileName);
    }
  }

  console.log("Imagens geradas:");
  for (const item of allGenerated) {
    console.log(`- ${item.file} (${item.width}w, ${item.sizeKb} KB, ${item.status})`);
  }

  if (removed.length > 0) {
    console.log("Imagens removidas por não fazerem parte do manifesto:");
    for (const fileName of removed) {
      console.log(`- src/assets/optimized/${fileName}`);
    }
  }
}

main().catch((error) => {
  console.error("Falha ao otimizar imagens:");
  console.error(error);
  process.exitCode = 1;
});
