const fs = require('fs');
const path = require('path');

const TOOLS = [
  'merge-pdf',
  'split-pdf',
  'compress-pdf',
  'pdf-to-jpg',
  'jpg-to-pdf',
  'png-to-pdf',
  'word-to-pdf',
  'pdf-to-word',
  'excel-to-pdf',
  'powerpoint-to-pdf',
  'rotate-pdf',
  'delete-pdf-pages',
  'extract-pdf-pages',
  'reorder-pdf-pages',
  'watermark-pdf',
  'unlock-pdf',
  'protect-pdf',
  'add-page-numbers',
  'crop-pdf',
  'resize-pdf',
  'repair-pdf',
  'ocr-pdf',
  'sign-pdf',
  'compare-pdfs',
  'organize-pdf',
  'pdf-to-text',
  'pdf-to-png',
  'pdf-to-webp',
  'html-to-pdf',
  'images-to-pdf',
  'scan-to-pdf'
];

const appDir = path.join(__dirname, '..', 'src', 'app');

if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

TOOLS.forEach((tool) => {
  const toolDir = path.join(appDir, tool);
  if (!fs.existsSync(toolDir)) {
    fs.mkdirSync(toolDir);
  }

  const pageContent = `'use client';

import ToolPage from '@/components/tool/ToolPage';

export default function Page() {
  return <ToolPage toolId="${tool}" />;
}
`;

  fs.writeFileSync(path.join(toolDir, 'page.tsx'), pageContent, 'utf8');
  console.log(`Generated route for /${tool}`);
});

console.log('Successfully generated all 31 tool routes!');
