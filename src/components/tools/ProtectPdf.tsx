'use client';

import { useState } from 'react';
import { protectPdf } from '@/lib/pdfUtils';
import { Download, RefreshCw, FileText, CheckCircle2, Lock } from 'lucide-react';

interface ProtectPdfProps {
  files: File[];
  onReset: () => void;
}

export default function ProtectPdf({ files, onReset }: ProtectPdfProps) {
  const file = files[0];
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [protectedUrl, setProtectedUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!password.trim()) {
      alert('Please enter a password.');
      return;
    }
    setIsProcessing(true);
    try {
      const protectedBytes = await protectPdf(file, password);
      const blob = new Blob([protectedBytes as any], { type: 'application/pdf' });
      setProtectedUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Error protecting PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {protectedUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF Protected Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your document is now encrypted and requires a password to open.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={protectedUrl}
              download={`${file.name.replace('.pdf', '')}_protected.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Protected PDF
            </a>
            <button
              onClick={() => {
                setProtectedUrl(null);
                setPassword('');
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Protect Another
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
              Set Security Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-foreground text-sm"
              />
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              We encrypt the document client-side. Keep your password safe—we cannot retrieve passwords.
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
              {isProcessing ? 'Protecting...' : 'Protect PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
