import fs from 'fs'
import path from 'path'

// Minimal 16x16 32-bit RGBA ICO file binary
const header = Buffer.from([
  0x00, 0x00, // Reserved
  0x01, 0x00, // Type 1 (ICO)
  0x01, 0x00, // 1 image
  // Image Entry
  16,         // width
  16,         // height
  0,          // color palette
  0,          // reserved
  0x01, 0x00, // color planes
  0x20, 0x00, // bits per pixel (32-bit RGBA)
  0x40, 0x04, 0x00, 0x00, // size of image data (1088 bytes)
  0x16, 0x00, 0x00, 0x00  // offset of image data (22 bytes)
])

// BITMAPINFOHEADER (40 bytes)
const bih = Buffer.alloc(40)
bih.writeUInt32LE(40, 0)       // header size
bih.writeInt32LE(16, 4)        // width
bih.writeInt32LE(32, 8)        // height * 2 (for XOR and AND masks)
bih.writeUInt16LE(1, 12)       // planes
bih.writeUInt16LE(32, 14)      // bpp
bih.writeUInt32LE(0, 16)       // compression (BI_RGB)
bih.writeUInt32LE(16 * 16 * 4, 20) // image size
bih.writeInt32LE(0, 24)        // X pixels per meter
bih.writeInt32LE(0, 28)        // Y pixels per meter
bih.writeUInt32LE(0, 32)       // colors used
bih.writeUInt32LE(0, 36)       // important colors

// Pixel data: 16x16 RGBA pixels filled with Indigo #6366f1 (BGRA in BMP: 0xf1, 0x66, 0x63, 0xff)
const pixels = Buffer.alloc(16 * 16 * 4)
for (let i = 0; i < 16 * 16; i++) {
  pixels[i * 4 + 0] = 0xf1 // B
  pixels[i * 4 + 1] = 0x66 // G
  pixels[i * 4 + 2] = 0x63 // R
  pixels[i * 4 + 3] = 0xff // A
}

// AND mask (1 bit per pixel, 16x16 / 8 = 32 bytes)
const andMask = Buffer.alloc(16 * (16 / 8), 0x00)

const ico = Buffer.concat([header, bih, pixels, andMask])

const pubDir = path.resolve('public')
if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true })

fs.writeFileSync(path.join(pubDir, 'favicon.ico'), ico)
fs.writeFileSync(path.resolve('app/favicon.ico'), ico)
console.log('Successfully generated valid favicon.ico in public/ and app/')

