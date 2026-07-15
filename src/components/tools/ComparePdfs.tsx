'use client';

import { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Columns, RefreshCw, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ComparePdfsProps {
  files: File[];
  onReset: () => void;
}

export default function ComparePdfs({ files, onReset }: ComparePdfsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<{
    fileAText: string[];
    fileBText: string[];
    diffs: { type: 'equal' | 'delete' | 'add'; text: string }[];
  } | null>(null);

  const handleProcess = async () => {
    if (files.length < 2) {
      alert('Please upload two PDF files to compare.');
      return;
    }
    
    setIsProcessing(true);
    try {
      const textA = await extractRawText(files[0]);
      const textB = await extractRawText(files[1]);
      
      const linesA = textA.split('\n').filter(Boolean);
      const linesB = textB.split('\n').filter(Boolean);
      
      // Basic text comparison loop
      const diffs: { type: 'equal' | 'delete' | 'add'; text: string }[] = [];
      const maxLength = Math.max(linesA.length, linesB.length);
      
      for (let i = 0; i < maxLength; i++) {
        const lineA = linesA[i] || '';
        const lineB = linesB[i] || '';
        
        if (lineA === lineB) {
          if (lineA) diffs.push({ type: 'equal', text: lineA });
        } else {
          if (lineA) diffs.push({ type: 'delete', text: lineA });
          if (lineB) diffs.push({ type: 'add', text: lineB });
        }
      }
      
      setComparisonResult({
        fileAText: linesA,
        fileBText: linesB,
        diffs
      });
    } catch (err) {
      alert('Error comparing documents.');
    } finally {
      setIsProcessing(false);
    }
  };

  const extractRawText = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      fullText += textContent.items.map((item: any) => item.str).join(' ') + '\n';
    }
    return fullText;
  };

  return (
    <div className="space-y-6">
      {comparisonResult ? (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-sm text-foreground">Comparison Analysis Completed</h3>
            </div>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-secondary hover:bg-secondary/85 text-secondary-foreground font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Compare Again
            </button>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/20 p-3 rounded-xl border border-border/40">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-rose-500/20 border border-rose-500/40 rounded" />
              <span>Deletions (File A)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded" />
              <span>Additions (File B)</span>
            </div>
          </div>

          {/* Grid comparison list */}
          <div className="border border-border/80 rounded-xl p-6 bg-card max-h-[350px] overflow-y-auto space-y-2 text-xs font-mono select-text shadow-inner">
            {comparisonResult.diffs.map((diff, index) => (
              <div
                key={index}
                className={`p-2 rounded border leading-relaxed ${
                  diff.type === 'delete'
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
                    : diff.type === 'add'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-foreground/80'
                }`}
              >
                <span className="font-bold mr-2 text-[10px] uppercase">
                  {diff.type === 'delete' && '-'}
                  {diff.type === 'add' && '+'}
                  {diff.type === 'equal' && '='}
                </span>
                {diff.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h3 className="font-bold text-base text-foreground">Select two files to compare</h3>
          </div>

          <div className="space-y-3">
            {files.map((f, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background/40">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <div className="truncate flex-1">
                  <p className="text-xs font-semibold text-foreground truncate">{f.name}</p>
                  <p className="text-[9px] text-muted-foreground">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[9px]">
                  FILE {index === 0 ? 'A' : 'B'}
                </span>
              </div>
            ))}
            
            {files.length < 2 && (
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold bg-amber-500/10 px-3 py-2.5 rounded-xl border border-amber-500/20">
                <AlertCircle className="w-4 h-4" />
                Please drag or upload an additional PDF file to compare side-by-side.
              </div>
            )}
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
              disabled={isProcessing || files.length < 2}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shadow-md shadow-primary/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Comparing...' : 'Compare PDFs'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
