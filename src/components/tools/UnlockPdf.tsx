'use client';

import { useState } from 'react';
import { unlockPdf } from '@/lib/pdfUtils';
import { Download, RefreshCw, FileText, CheckCircle2, Unlock } from 'lucide-react';

interface UnlockPdfProps {
  files: File[];
  onReset: () => void;
}

export default function UnlockPdf({ files, onReset }: UnlockPdfProps) {
  const file = files[0];
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const unlockedBytes = await unlockPdf(file, password);
      const blob = new Blob([unlockedBytes as any], { type: 'application/pdf' });
      setUnlockedUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Failed to unlock. Ensure the password is correct or the file is unlocked already.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {unlockedUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF Unlocked!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All viewing and editing restrictions have been removed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={unlockedUrl}
              download={`${file.name.replace('.pdf', '')}_unlocked.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Unlocked PDF
            </a>
            <button
              onClick={() => {
                setUnlockedUrl(null);
                setPassword('');
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Unlock Another
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

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Enter PDF Password (if required)
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-foreground text-sm"
              />
              <Unlock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              If the file has copy/edit restrictions only, you can leave the password blank and click Unlock PDF.
            </p>
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
              {isProcessing ? 'Unlocking...' : 'Unlock PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
