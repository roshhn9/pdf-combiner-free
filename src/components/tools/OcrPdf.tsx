'use client';

import { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Download, RefreshCw, FileText, CheckCircle2, ScanText } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface OcrPdfProps {
  files: File[];
  onReset: () => void;
}

export default function OcrPdf({ files, onReset }: OcrPdfProps) {
  const file = files[0];
  const [lang, setLang] = useState('eng');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const [ocrPdfUrl, setOcrPdfUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setProgress(0);
    setProgressStatus('Initializing Tesseract OCR worker...');
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;

      const worker = await createWorker(lang);
      
      const newPdfDoc = await PDFDocument.create();
      const font = await newPdfDoc.embedFont(StandardFonts.Helvetica);

      for (let i = 1; i <= totalPages; i++) {
        setProgressStatus(`Rendering Page ${i} for character recognition...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          await page.render({ canvasContext: ctx, viewport, canvas }).promise;
          
          setProgressStatus(`Running OCR on Page ${i} of ${totalPages}...`);
          // Execute OCR on the page canvas image
          const { data } = (await worker.recognize(canvas)) as any;
          
          // Add a page to pdf-lib doc
          const newPage = newPdfDoc.addPage([viewport.width, viewport.height]);
          
          // Render the recognized words onto the PDF page
          data.words.forEach((word: any) => {
            const { x0, y0, x1, y1 } = word.bbox;
            // PDF-lib coordinate space has origin (0,0) in bottom-left. Canvas is top-left.
            const textHeight = y1 - y0;
            const pdfY = viewport.height - y1; // flip coordinate
            
            newPage.drawText(word.text, {
              x: x0,
              y: pdfY,
              size: Math.max(8, textHeight * 0.8),
              font,
              color: rgb(0, 0, 0),
            });
          });
        }
        setProgress(Math.round((i / totalPages) * 100));
      }

      await worker.terminate();
      
      setProgressStatus('Saving searchable PDF...');
      const ocrPdfBytes = await newPdfDoc.save();
      const blob = new Blob([ocrPdfBytes as any], { type: 'application/pdf' });
      setOcrPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Error running OCR on PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {ocrPdfUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">OCR Text Recognition Completed!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your scanned document has been converted to a searchable PDF.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ocrPdfUrl}
              download={`${file.name.replace('.pdf', '')}_searchable.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Searchable PDF
            </a>
            <button
              onClick={() => {
                setOcrPdfUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              OCR Another
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Recognition Language
              </label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-foreground text-sm"
              >
                <option value="eng">English (English)</option>
                <option value="spa">Spanish (Español)</option>
                <option value="fra">French (Français)</option>
                <option value="deu">German (Deutsch)</option>
                <option value="chi_sim">Chinese Simplified (简体中文)</option>
              </select>
            </div>

            <div className="p-4 rounded-xl border border-border bg-background/50 text-[10px] text-muted-foreground leading-relaxed flex items-start gap-2">
              <ScanText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-1">OCR Information</p>
                The recognition process downloads language weights (~10MB) into browser local storage on its first run and extracts text characters securely without transmitting files.
              </div>
            </div>
          </div>

          {isProcessing && (
            <div className="space-y-2 animate-in fade-in">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span className="truncate pr-4">{progressStatus}</span>
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
              {isProcessing ? 'Recognizing...' : 'Start OCR Scan'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
