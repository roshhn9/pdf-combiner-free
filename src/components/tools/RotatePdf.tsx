'use client';

import VisualPdfEditor from './VisualPdfEditor';

interface RotatePdfProps {
  files: File[];
  onReset: () => void;
}

export default function RotatePdf({ files, onReset }: RotatePdfProps) {
  return <VisualPdfEditor file={files[0]} onReset={onReset} mode="rotate" />;
}
