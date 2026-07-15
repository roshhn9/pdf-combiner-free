'use client';

import PDFToImage from './PDFToImage';

interface PDFToWEBPProps {
  files: File[];
  onReset: () => void;
}

export default function PDFToWEBP({ files, onReset }: PDFToWEBPProps) {
  return <PDFToImage files={files} onReset={onReset} format="webp" />;
}
