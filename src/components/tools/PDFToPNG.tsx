'use client';

import PDFToImage from './PDFToImage';

interface PDFToPNGProps {
  files: File[];
  onReset: () => void;
}

export default function PDFToPNG({ files, onReset }: PDFToPNGProps) {
  return <PDFToImage files={files} onReset={onReset} format="png" />;
}
