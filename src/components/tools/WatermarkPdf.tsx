'use client';

import { useState } from 'react';
import { watermarkPdf } from '@/lib/pdfUtils';
import { Download, RefreshCw, FileText, CheckCircle2, Stamp } from 'lucide-react';

interface WatermarkPdfProps {
  files: File[];
  onReset: () => void;
}

export default function WatermarkPdf({ files, onReset }: WatermarkPdfProps) {
  const file = files[0];
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!text.trim()) {
      alert('Please enter watermark text.');
      return;
    }
    setIsProcessing(true);
    try {
      const watermarkedBytes = await watermarkPdf(file, text, opacity);
      const blob = new Blob([watermarkedBytes as any], { type: 'application/pdf' });
      setWatermarkedUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Error watermarking PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {watermarkedUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF Watermarked!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your custom watermark has been stamped on all pages.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={watermarkedUrl}
              download={`${file.name.replace('.pdf', '')}_watermarked.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <button
              onClick={() => {
                setWatermarkedUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Watermark More
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

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Watermark Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="CONFIDENTIAL"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-foreground text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-foreground uppercase tracking-wider">
                <span>Opacity</span>
                <span className="text-primary font-extrabold">{Math.round(opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
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
              {isProcessing ? 'Watermarking...' : 'Add Watermark'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
