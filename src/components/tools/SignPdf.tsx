'use client';

import { useState, useRef, MouseEvent } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Download, RefreshCw, FileText, CheckCircle2, PenTool, Eraser, Trash2 } from 'lucide-react';

interface SignPdfProps {
  files: File[];
  onReset: () => void;
}

export default function SignPdf({ files, onReset }: SignPdfProps) {
  const file = files[0];
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [targetPage, setTargetPage] = useState<number>(1);
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'center'>('bottom-right');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  // Drawing Pad Canvas Handlers
  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawing.current = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Check if canvas is blank
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    if (canvas.toDataURL() === blank.toDataURL()) {
      alert('Please draw a signature first.');
      return;
    }
    
    setSignatureImage(canvas.toDataURL('image/png'));
  };

  // Compile Signed PDF
  const handleProcess = async () => {
    if (!signatureImage) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const totalPages = pdfDoc.getPageCount();
      const pageIndex = Math.min(Math.max(1, targetPage), totalPages) - 1;
      const page = pdfDoc.getPages()[pageIndex];
      
      const sigBytes = await fetch(signatureImage).then((res) => res.arrayBuffer());
      const embeddedSig = await pdfDoc.embedPng(sigBytes);
      
      const { width, height } = page.getSize();
      const sigWidth = 150;
      const sigHeight = 60;
      
      let x = width - sigWidth - 40;
      let y = 40;
      
      if (position === 'bottom-left') {
        x = 40;
        y = 40;
      } else if (position === 'center') {
        x = (width - sigWidth) / 2;
        y = (height - sigHeight) / 2;
      }
      
      page.drawImage(embeddedSig, {
        x,
        y,
        width: sigWidth,
        height: sigHeight,
      });

      const signedBytes = await pdfDoc.save();
      const blob = new Blob([signedBytes as any], { type: 'application/pdf' });
      setSignedUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Error signing document.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {signedUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF Signed Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your signature has been embedded into the document.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={signedUrl}
              download={`${file.name.replace('.pdf', '')}_signed.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Signed PDF
            </a>
            <button
              onClick={() => {
                setSignedUrl(null);
                setSignatureImage(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Sign Another
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Signature Draw Area */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Draw Your Signature
              </label>
              <div className="border border-border/80 rounded-2xl overflow-hidden bg-white shadow-inner relative">
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={160}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-[160px] touch-none cursor-crosshair bg-white"
                />
                
                <div className="absolute bottom-2 right-2 flex gap-1.5">
                  <button
                    onClick={clearCanvas}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Clear"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={saveSignature}
                    className="px-3 py-1 bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-wider rounded-lg shadow cursor-pointer hover:bg-primary/95 transition-all"
                  >
                    Apply Pen
                  </button>
                </div>
              </div>
              
              {signatureImage && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Signature registered! Configure position details on the right.
                </div>
              )}
            </div>

            {/* Position Settings */}
            <div className="glass-panel p-5 rounded-2xl space-y-4 h-fit border border-border">
              <div className="flex items-center gap-1.5 border-b border-border pb-2">
                <PenTool className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Signature Settings</h4>
              </div>

              {/* Target Page */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Page Number</label>
                <input
                  type="number"
                  min="1"
                  value={targetPage}
                  onChange={(e) => setTargetPage(parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
                />
              </div>

              {/* Position Coordinates */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Signature Location</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
                >
                  <option value="bottom-right">Bottom Right Footer</option>
                  <option value="bottom-left">Bottom Left Footer</option>
                  <option value="center">Center of Page</option>
                </select>
              </div>
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
              disabled={isProcessing || !signatureImage}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shadow-md shadow-primary/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Sign Document'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
