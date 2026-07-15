'use client';

import VisualPdfEditor from './VisualPdfEditor';

interface ReorderPagesProps {
  files: File[];
  onReset: () => void;
}

export default function ReorderPages({ files, onReset }: ReorderPagesProps) {
  return <VisualPdfEditor file={files[0]} onReset={onReset} mode="reorder" />;
}
