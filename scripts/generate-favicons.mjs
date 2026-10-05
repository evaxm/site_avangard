import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { deflateSync } from "node:zlib";

const root = resolve(import.meta.dirname, "..");

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  return crc >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}

function insidePolygon(x, y, points) {
  let inside = false;
  for (let current = 0, previous = points.length - 1; current < points.length; previous = current, current += 1) {
    const [xi, yi] = points[current];
    const [xj, yj] = points[previous];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function render(size) {
  const pixels = Buffer.alloc(size * size * 4);
  const dark = [20, 33, 38, 255];
  const lime = [223, 255, 67, 255];
  const shield = [[0.5, 0.11], [0.81, 0.26], [0.81, 0.51], [0.73, 0.7], [0.5, 0.88], [0.27, 0.7], [0.19, 0.51], [0.19, 0.26]];
  const inner = [[0.5, 0.25], [0.67, 0.34], [0.67, 0.52], [0.61, 0.64], [0.5, 0.73], [0.39, 0.64], [0.33, 0.52], [0.33, 0.34]];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = (x + 0.5) / size;
      const ny = (y + 0.5) / size;
      const radius = 0.18;
      const dx = Math.max(radius - nx, 0, nx - (1 - radius));
      const dy = Math.max(radius - ny, 0, ny - (1 - radius));
      const rounded = dx * dx + dy * dy <= radius * radius;
      let color = rounded ? dark : [0, 0, 0, 0];
      if (insidePolygon(nx, ny, shield)) color = lime;
      if (insidePolygon(nx, ny, inner)) color = dark;
      const crossWidth = Math.max(1.5 / size, 0.032);
      if (insidePolygon(nx, ny, inner) && (Math.abs(nx - 0.5) < crossWidth || (Math.abs(ny - 0.49) < crossWidth && nx > 0.38 && nx < 0.62))) color = lime;
      const offset = (y * size + x) * 4;
      pixels.set(color, offset);
    }
  }

  const scanlines = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y += 1) pixels.copy(scanlines, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(scanlines, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const files = [
  ["favicon-32x32.png", 32],
  ["favicon-48x48.png", 48],
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
];

const generated = new Map();
for (const [name, size] of files) {
  const png = render(size);
  generated.set(size, png);
  await writeFile(resolve(root, "public", name), png);
}

const icoPngs = [generated.get(32), generated.get(48)];
const icoHeader = Buffer.alloc(6 + icoPngs.length * 16);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(icoPngs.length, 4);
let offset = icoHeader.length;
for (let index = 0; index < icoPngs.length; index += 1) {
  const size = index === 0 ? 32 : 48;
  const entry = 6 + index * 16;
  icoHeader[entry] = size;
  icoHeader[entry + 1] = size;
  icoHeader[entry + 2] = 0;
  icoHeader[entry + 3] = 0;
  icoHeader.writeUInt16LE(1, entry + 4);
  icoHeader.writeUInt16LE(32, entry + 6);
  icoHeader.writeUInt32LE(icoPngs[index].length, entry + 8);
  icoHeader.writeUInt32LE(offset, entry + 12);
  offset += icoPngs[index].length;
}
await writeFile(resolve(root, "public", "favicon.ico"), Buffer.concat([icoHeader, ...icoPngs]));

console.log("Generated favicon assets.");
