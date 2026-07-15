'use client';

import ImagesToPdfConverter from './ImagesToPdfConverter';

interface JPGToPDFProps {
  files: File[];
  onReset: () => void;
}

export default function JPGToPDF({ files, onReset }: JPGToPDFProps) {
  return <ImagesToPdfConverter files={files} onReset={onReset} />;
}
