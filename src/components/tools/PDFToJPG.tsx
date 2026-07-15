'use client';

import PDFToImage from './PDFToImage';

interface PDFToJPGProps {
  files: File[];
  onReset: () => void;
}

export default function PDFToJPG({ files, onReset }: PDFToJPGProps) {
  return <PDFToImage files={files} onReset={onReset} format="jpg" />;
}
