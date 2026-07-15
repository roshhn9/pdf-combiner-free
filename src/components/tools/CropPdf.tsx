'use client';

import { useState } from 'react';
import { cropPdf } from '@/lib/pdfUtils';
import { Download, RefreshCw, FileText, CheckCircle2, Crop } from 'lucide-react';

interface CropPdfProps {
  files: File[];
  onReset: () => void;
}

export default function CropPdf({ files, onReset }: CropPdfProps) {
  const file = files[0];
  const [cropFactor, setCropFactor] = useState(0.9);
  const [isProcessing, setIsProcessing] = useState(false);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const croppedBytes = await cropPdf(file, cropFactor);
      const blob = new Blob([croppedBytes as any], { type: 'application/pdf' });
      setCroppedUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Error cropping PDF margins.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {croppedUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF Cropped!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your page boundaries have been adjusted.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={croppedUrl}
              download={`${file.name.replace('.pdf', '')}_cropped.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Cropped PDF
            </a>
            <button
              onClick={() => {
                setCroppedUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Crop Another
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
              <div className="flex justify-between text-xs font-bold text-foreground uppercase tracking-wider">
                <span>Crop Margins Factor</span>
                <span className="text-primary font-extrabold">{Math.round((1 - cropFactor) * 100)}% margins trimmed</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="0.95"
                step="0.05"
                value={cropFactor}
                onChange={(e) => setCropFactor(parseFloat(e.target.value))}
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
              {isProcessing ? 'Cropping...' : 'Crop Margins'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
