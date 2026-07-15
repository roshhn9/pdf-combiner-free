'use client';

import ImagesToPdfConverter from './ImagesToPdfConverter';

interface PNGToPDFProps {
  files: File[];
  onReset: () => void;
}

export default function PNGToPDF({ files, onReset }: PNGToPDFProps) {
  return <ImagesToPdfConverter files={files} onReset={onReset} />;
}
