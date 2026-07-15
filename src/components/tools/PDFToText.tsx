'use client';

import { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Download, RefreshCw, FileText, CheckCircle2, Copy } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFToTextProps {
  files: File[];
  onReset: () => void;
}

export default function PDFToText({ files, onReset }: PDFToTextProps) {
  const file = files[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      let text = '';
      
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        text += `--- Page ${i} ---\n${pageText}\n\n`;
        setProgress(Math.round((i / totalPages) * 100));
      }
      
      setExtractedText(text);
    } catch (err) {
      alert('Error extracting text from PDF. Ensure document is not encrypted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
      alert('Text copied to clipboard!');
    }
  };

  const handleDownload = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.name.replace('.pdf', '')}_text.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {extractedText ? (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-sm text-foreground">Text Extracted Successfully</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/10"
              >
                <Download className="w-3.5 h-3.5" />
                Download TXT
              </button>
              <button
                onClick={onReset}
                className="px-4 py-2 bg-secondary hover:bg-secondary/85 text-secondary-foreground font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Extract More
              </button>
            </div>
          </div>

          <div className="border border-border/80 rounded-xl p-6 bg-card max-h-[350px] overflow-y-auto shadow-inner text-xs font-mono whitespace-pre-wrap leading-relaxed text-foreground select-text">
            {extractedText}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground truncate max-w-md">{file.name}</p>
              <p className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>Reading characters...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <button
              onClick={onReset}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shadow-md shadow-primary/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Extracting...' : 'Extract Text'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
