'use client';

import { useState } from 'react';
import { splitPdf } from '@/lib/pdfUtils';
import JSZip from 'jszip';
import { ArrowRight, Download, RefreshCw, AlertCircle, FileArchive, FileText } from 'lucide-react';

interface SplitPdfProps {
  files: File[];
  onReset: () => void;
}

export default function SplitPdf({ files, onReset }: SplitPdfProps) {
  const file = files[0];
  const [ranges, setRanges] = useState('1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState('');
  const [isZip, setIsZip] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      let activeRanges = ranges.trim();
      if (!activeRanges) {
        throw new Error('Please specify a page range.');
      }
      
      const results = await splitPdf(file, activeRanges);
      
      if (results.length === 0) {
        throw new Error('No files generated.');
      } else if (results.length === 1) {
        // Download single PDF
        const blob = new Blob([results[0].bytes as any], { type: 'application/pdf' });
        setDownloadUrl(URL.createObjectURL(blob));
        setDownloadName(results[0].name);
        setIsZip(false);
      } else {
        // Zip up all split files
        const zip = new JSZip();
        results.forEach((res) => {
          zip.file(res.name, res.bytes);
        });
        const zipContent = await zip.generateAsync({ type: 'blob' });
        setDownloadUrl(URL.createObjectURL(zipContent));
        setDownloadName(`${file.name.replace('.pdf', '')}_split_pages.zip`);
        setIsZip(true);
      }
    } catch (err: any) {
      setError(err?.message || 'Error splitting PDF. Ensure range indices are valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {downloadUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            {isZip ? <FileArchive className="w-8 h-8" /> : <Download className="w-8 h-8" />}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF Split Completed!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your split files are ready for download.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={downloadUrl}
              download={downloadName}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download {isZip ? 'ZIP Archive' : 'PDF File'}
            </a>
            <button
              onClick={() => {
                setDownloadUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Split More
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
              Specify Split Pages
            </label>
            <input
              type="text"
              value={ranges}
              onChange={(e) => setRanges(e.target.value)}
              placeholder="e.g., 1-2, 4-5"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-foreground text-sm"
            />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Use commas to create multiple split parts (e.g. <strong>&ldquo;1-3, 4-6&rdquo;</strong> will export two PDFs). Single page extractions (e.g. <strong>&ldquo;1&rdquo;</strong>) will export as a single PDF.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-rose-500 font-semibold bg-rose-500/10 px-3 py-2 rounded-xl border border-rose-500/20">
              <AlertCircle className="w-4 h-4" />
              {error}
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
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Splitting...
                </>
              ) : (
                <>
                  Split PDF
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
