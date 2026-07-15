'use client';

import { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Download, RefreshCw, FileText, CheckCircle2, FileEdit } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFToWordProps {
  files: File[];
  onReset: () => void;
}

export default function PDFToWord({ files, onReset }: PDFToWordProps) {
  const file = files[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadBlobUrl, setDownloadBlobUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      let htmlDoc = '<html><head><meta charset="utf-8"></head><body>';
      
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        htmlDoc += `<div style="page-break-after:always; margin-bottom:50px;">`;
        htmlDoc += `<p style="color:#777; font-size:10px;">--- Page ${i} ---</p>`;
        
        let lastY = -1;
        let line = '';
        
        // Form lines based on text positioning coordinates
        for (const item of textContent.items as any[]) {
          const y = item.transform[5];
          if (lastY !== -1 && Math.abs(y - lastY) > 5) {
            htmlDoc += `<p style="font-family:Arial, sans-serif; font-size:12px; margin-bottom:10px;">${line}</p>`;
            line = '';
          }
          line += item.str + ' ';
          lastY = y;
        }
        
        if (line) {
          htmlDoc += `<p style="font-family:Arial, sans-serif; font-size:12px; margin-bottom:10px;">${line}</p>`;
        }
        
        htmlDoc += `</div>`;
        setProgress(Math.round((i / totalPages) * 100));
      }
      
      htmlDoc += '</body></html>';
      
      // Compile into standard Word file mime type
      const blob = new Blob([htmlDoc], { type: 'application/msword;charset=utf-8' });
      setDownloadBlobUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Error parsing PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {downloadBlobUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <FileEdit className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF to Word Conversion Complete!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your editable Word document (.doc) is compiled and ready.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={downloadBlobUrl}
              download={`${file.name.replace('.pdf', '')}_editable.doc`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Word Doc
            </a>
            <button
              onClick={() => {
                setDownloadBlobUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Convert Another
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

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>Structuring document layout...</span>
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
              {isProcessing ? 'Structuring...' : 'Convert to Word'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
