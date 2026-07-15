'use client';

import VisualPdfEditor from './VisualPdfEditor';

interface ExtractPdfPagesProps {
  files: File[];
  onReset: () => void;
}

export default function ExtractPdfPages({ files, onReset }: ExtractPdfPagesProps) {
  return <VisualPdfEditor file={files[0]} onReset={onReset} mode="extract" />;
}
