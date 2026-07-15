'use client';

import { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import JSZip from 'jszip';
import { Download, RefreshCw, FileText, FileImage, Settings, Play } from 'lucide-react';

// Configure PDF.js Worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFToImageProps {
  files: File[];
  onReset: () => void;
  format: 'jpg' | 'png' | 'webp';
}

export default function PDFToImage({ files, onReset, format }: PDFToImageProps) {
  const file = files[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const zip = new JSZip();
      
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 }); // Crisp 1.5x resolution scale
        
        // Render page onto an off-screen canvas
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          await page.render({ canvasContext: ctx, viewport, canvas }).promise;
          
          // Convert canvas content to blob according to target format
          let mimeType = 'image/jpeg';
          let ext = 'jpg';
          if (format === 'png') { mimeType = 'image/png'; ext = 'png'; }
          if (format === 'webp') { mimeType = 'image/webp'; ext = 'webp'; }
          
          const imageBlob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), mimeType, 0.9);
          });
          
          if (imageBlob) {
            zip.file(`page_${pageNum}.${ext}`, imageBlob);
          }
        }
        setProgress(Math.round((pageNum / totalPages) * 100));
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      setDownloadUrl(URL.createObjectURL(zipBlob));
    } catch (err) {
      alert('Error parsing PDF. Try rendering another document.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {downloadUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <FileImage className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Conversion Complete!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All PDF pages have been converted to high-quality {format.toUpperCase()} images.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={downloadUrl}
              download={`${file.name.replace('.pdf', '')}_images_${format}.zip`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Images (ZIP)
            </a>
            <button
              onClick={() => {
                setDownloadUrl(null);
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

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-muted-foreground">Target Format</span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg font-extrabold text-[10px] uppercase">
                {format}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Settings className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>Resolution: High-definition 150 DPI. Output packaged as a single ZIP.</span>
            </div>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>Rendering pages...</span>
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
              {isProcessing ? (
                'Converting...'
              ) : (
                <>
                  Convert to {format.toUpperCase()}
                  <Play className="w-4 h-4 fill-current" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
