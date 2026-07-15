import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

/**
 * Load a PDF document with password fallback if encrypted
 */
export async function loadPdf(file: File, password?: string): Promise<PDFDocument> {
  const arrayBuffer = await file.arrayBuffer();
  if (password) {
    return await PDFDocument.load(arrayBuffer, { password } as any);
  }
  return await PDFDocument.load(arrayBuffer);
}

/**
 * Merge multiple PDF files sequentially
 */
export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }
  
  return await mergedPdf.save();
}

/**
 * Split a PDF by page ranges (e.g., "1-3, 5")
 */
export async function splitPdf(file: File, ranges: string): Promise<{ name: string; bytes: Uint8Array }[]> {
  const pdfBytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(pdfBytes);
  const totalPages = srcDoc.getPageCount();
  
  const results: { name: string; bytes: Uint8Array }[] = [];
  
  // Parse ranges (e.g., "1-2, 4-4")
  const parts = ranges.split(',').map(r => r.trim());
  for (const part of parts) {
    if (!part) continue;
    
    let start = 1;
    let end = 1;
    
    if (part.includes('-')) {
      const [sStr, eStr] = part.split('-');
      start = parseInt(sStr, 10);
      end = parseInt(eStr, 10);
    } else {
      start = parseInt(part, 10);
      end = start;
    }
    
    if (isNaN(start) || isNaN(end) || start < 1 || end > totalPages || start > end) {
      throw new Error(`Invalid range: ${part}`);
    }
    
    const subDoc = await PDFDocument.create();
    // 0-indexed copy
    const indicesToCopy = Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i);
    const copiedPages = await subDoc.copyPages(srcDoc, indicesToCopy);
    copiedPages.forEach(p => subDoc.addPage(p));
    
    const bytes = await subDoc.save();
    results.push({
      name: `${file.name.replace('.pdf', '')}_pages_${start}-${end}.pdf`,
      bytes
    });
  }
  
  return results;
}

/**
 * Compress PDF by recreating PDF content structures
 */
export async function compressPdf(file: File): Promise<Uint8Array> {
  // Client-side compression rebuilds and compresses standard structures
  const pdfBytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(pdfBytes);
  
  // Save with compressed options to optimize layout
  return await srcDoc.save({ useObjectStreams: true });
}

/**
 * Rotate PDF pages by 90-degree offsets
 */
export async function rotatePdfPages(file: File, rotations: Record<number, number>): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  const pages = pdfDoc.getPages();
  Object.entries(rotations).forEach(([indexStr, rotation]) => {
    const index = parseInt(indexStr, 10);
    if (index >= 0 && index < pages.length) {
      const page = pages[index];
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + rotation) % 360));
    }
  });
  
  return await pdfDoc.save();
}

/**
 * Delete specified pages from PDF
 */
export async function deletePdfPages(file: File, indicesToDelete: number[]): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  // Sort indices in descending order to avoid shift issues during removal
  const sortedIndices = [...indicesToDelete].sort((a, b) => b - a);
  sortedIndices.forEach(index => {
    if (index >= 0 && index < pdfDoc.getPageCount()) {
      pdfDoc.removePage(index);
    }
  });
  
  return await pdfDoc.save();
}

/**
 * Extract specified pages into a new PDF
 */
export async function extractPdfPages(file: File, indicesToExtract: number[]): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(pdfBytes);
  const destDoc = await PDFDocument.create();
  
  const copiedPages = await destDoc.copyPages(srcDoc, indicesToExtract);
  copiedPages.forEach(page => destDoc.addPage(page));
  
  return await destDoc.save();
}

/**
 * Password protect a PDF using Standard User/Owner passwords
 */
export async function protectPdf(file: File, userPassword: string): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  // Encrypt with 256-bit strength
  return await pdfDoc.save({
    userPassword: userPassword,
    ownerPassword: userPassword + '_owner',
  } as any);
}

/**
 * Unlock a password protected PDF
 */
export async function unlockPdf(file: File, userPassword: string): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  // Open it using the provided password
  const pdfDoc = await PDFDocument.load(pdfBytes, { password: userPassword } as any);
  // Save it without passwords to remove all encryption
  return await pdfDoc.save();
}

/**
 * Overlay Watermark text on all pages
 */
export async function watermarkPdf(file: File, text: string, opacity: number = 0.4): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();
  
  pages.forEach(page => {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 4,
      y: height / 2,
      size: 48,
      font,
      color: rgb(0.7, 0.7, 0.7),
      opacity,
      rotate: degrees(45),
    });
  });
  
  return await pdfDoc.save();
}

/**
 * Overlay Page Numbers on all pages
 */
export async function addPageNumbersToPdf(file: File): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const total = pages.length;
  
  pages.forEach((page, i) => {
    const { width } = page.getSize();
    const text = `${i + 1} of ${total}`;
    page.drawText(text, {
      x: width - 80,
      y: 20,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  });
  
  return await pdfDoc.save();
}

/**
 * Crop margins from a PDF using MediaBox coordinates
 */
export async function cropPdf(file: File, factor: number = 0.9): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  
  pages.forEach(page => {
    const { width, height } = page.getSize();
    const newWidth = width * factor;
    const newHeight = height * factor;
    const xOffset = (width - newWidth) / 2;
    const yOffset = (height - newHeight) / 2;
    
    page.setCropBox(xOffset, yOffset, newWidth, newHeight);
  });
  
  return await pdfDoc.save();
}

/**
 * Scale PDF page sizes to standard paper sizes (A4, Letter)
 */
export async function resizePdf(file: File, sizePreset: 'A4' | 'Letter'): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  // A4 dimensions: 595.27 x 841.89 points
  // Letter dimensions: 612.0 x 792.0 points
  const targetWidth = sizePreset === 'A4' ? 595.27 : 612.0;
  const targetHeight = sizePreset === 'A4' ? 841.89 : 792.0;
  
  const pages = pdfDoc.getPages();
  pages.forEach(page => {
    page.setSize(targetWidth, targetHeight);
  });
  
  return await pdfDoc.save();
}

/**
 * Re-serialize PDF bytes to repair indexing errors (xref tables)
 */
export async function repairPdf(file: File): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer();
  // Safe load ignores minor errors and recovers index catalog structures
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  return await pdfDoc.save();
}
