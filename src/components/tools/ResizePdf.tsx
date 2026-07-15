'use client';

import { useState } from 'react';
import { resizePdf } from '@/lib/pdfUtils';
import { Download, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

interface ResizePdfProps {
  files: File[];
  onReset: () => void;
}

export default function ResizePdf({ files, onReset }: ResizePdfProps) {
  const file = files[0];
  const [sizePreset, setSizePreset] = useState<'A4' | 'Letter'>('A4');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const resizedBytes = await resizePdf(file, sizePreset);
      const blob = new Blob([resizedBytes as any], { type: 'application/pdf' });
      setResizedUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Error resizing PDF pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {resizedUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF Resized Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All pages have been scaled to standard {sizePreset} format.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={resizedUrl}
              download={`${file.name.replace('.pdf', '')}_resized_${sizePreset}.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resized PDF
            </a>
            <button
              onClick={() => {
                setResizedUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Resize More
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

          <div className="space-y-3">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Select Target Paper Size
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSizePreset('A4')}
                className={`p-4 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                  sizePreset === 'A4'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:bg-muted/30'
                }`}
              >
                A4 Format (ISO 216)
              </button>
              <button
                onClick={() => setSizePreset('Letter')}
                className={`p-4 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                  sizePreset === 'Letter'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:bg-muted/30'
                }`}
              >
                US Letter Format
              </button>
            </div>
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
              {isProcessing ? 'Resizing...' : 'Resize Pages'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
