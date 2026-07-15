'use client';

import VisualPdfEditor from './VisualPdfEditor';

interface OrganizePdfProps {
  files: File[];
  onReset: () => void;
}

export default function OrganizePdf({ files, onReset }: OrganizePdfProps) {
  return <VisualPdfEditor file={files[0]} onReset={onReset} mode="organize" />;
}
