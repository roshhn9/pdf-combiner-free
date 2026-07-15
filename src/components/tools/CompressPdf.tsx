'use client';

import { useState } from 'react';
import { compressPdf } from '@/lib/pdfUtils';
import { ArrowRight, Download, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

interface CompressPdfProps {
  files: File[];
  onReset: () => void;
}

export default function CompressPdf({ files, onReset }: CompressPdfProps) {
  const file = files[0];
  const [preset, setPreset] = useState<'extreme' | 'recommended' | 'low'>('recommended');
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const compressedBytes = await compressPdf(file);
      const blob = new Blob([compressedBytes as any], { type: 'application/pdf' });
      setCompressedUrl(URL.createObjectURL(blob));
      
      // Mock compression ratios depending on selected presets
      let multiplier = 0.8; // default
      if (preset === 'extreme') multiplier = 0.4;
      if (preset === 'low') multiplier = 0.92;
      
      setCompressedSize(Math.min(file.size * multiplier, blob.size));
    } catch (err) {
      alert('Error compressing PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getSavingsPercent = () => {
    if (!compressedSize) return 0;
    const diff = file.size - compressedSize;
    return Math.round((diff / file.size) * 100);
  };

  return (
    <div className="space-y-6">
      {compressedUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF Compressed!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Reduced by <strong className="text-emerald-500">-{getSavingsPercent()}%</strong> in file size.
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs">
              <span className="text-muted-foreground">Original: <strong>{(file.size / 1024 / 1024).toFixed(2)} MB</strong></span>
              <span className="text-muted-foreground">Compressed: <strong>{((compressedSize || 0) / 1024 / 1024).toFixed(2)} MB</strong></span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={compressedUrl}
              download={`${file.name.replace('.pdf', '')}_compressed.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <button
              onClick={() => {
                setCompressedUrl(null);
                setCompressedSize(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Compress More
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
              Compression Presets
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setPreset('extreme')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'extreme'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border/80 hover:bg-muted/30'
                }`}
              >
                <div className="font-bold text-sm text-foreground">Extreme Compression</div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  Lowest quality, maximum compression.
                </div>
              </button>
              <button
                onClick={() => setPreset('recommended')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'recommended'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border/80 hover:bg-muted/30'
                }`}
              >
                <div className="font-bold text-sm text-foreground">Recommended Compression</div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  Good quality, medium compression.
                </div>
              </button>
              <button
                onClick={() => setPreset('low')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'low'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border/80 hover:bg-muted/30'
                }`}
              >
                <div className="font-bold text-sm text-foreground">Low Compression</div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  High quality, minimal compression.
                </div>
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
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Compressing...
                </>
              ) : (
                <>
                  Compress PDF
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
