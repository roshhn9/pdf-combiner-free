'use client';

import ImagesToPdfConverter from './ImagesToPdfConverter';

interface ImagesToPDFProps {
  files: File[];
  onReset: () => void;
}

export default function ImagesToPDF({ files, onReset }: ImagesToPDFProps) {
  return <ImagesToPdfConverter files={files} onReset={onReset} />;
}
