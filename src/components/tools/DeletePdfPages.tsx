'use client';

import VisualPdfEditor from './VisualPdfEditor';

interface DeletePdfPagesProps {
  files: File[];
  onReset: () => void;
}

export default function DeletePdfPages({ files, onReset }: DeletePdfPagesProps) {
  return <VisualPdfEditor file={files[0]} onReset={onReset} mode="delete" />;
}
