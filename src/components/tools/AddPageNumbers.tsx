'use client';

import { useState } from 'react';
import { addPageNumbersToPdf } from '@/lib/pdfUtils';
import { Download, RefreshCw, FileText, CheckCircle2, Hash } from 'lucide-react';

interface AddPageNumbersProps {
  files: File[];
  onReset: () => void;
}

export default function AddPageNumbers({ files, onReset }: AddPageNumbersProps) {
  const file = files[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [numberedUrl, setNumberedUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const numberedBytes = await addPageNumbersToPdf(file);
      const blob = new Blob([numberedBytes as any], { type: 'application/pdf' });
      setNumberedUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Error adding page numbers.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {numberedUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Page Numbers Added!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your document is numbered (e.g., &ldquo;Page X of Y&rdquo;) in the bottom-right footer of all pages.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={numberedUrl}
              download={`${file.name.replace('.pdf', '')}_numbered.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Numbered PDF
            </a>
            <button
              onClick={() => {
                setNumberedUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Process Another
            </button>
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

          <div className="p-4 rounded-xl border border-border bg-background/50 text-xs text-muted-foreground leading-relaxed">
            This tool embeds page numbers automatically into the footer of your PDF file, processing all pages locally.
          </div>

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
              {isProcessing ? 'Processing...' : 'Add Page Numbers'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
