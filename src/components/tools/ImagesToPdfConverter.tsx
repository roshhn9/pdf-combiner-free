'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ArrowRight, Trash2, ArrowUp, ArrowDown, Download, RefreshCw, FileImage, Settings } from 'lucide-react';

interface ImagesToPdfConverterProps {
  files: File[];
  onReset: () => void;
}

export default function ImagesToPdfConverter({ files: initialFiles, onReset }: ImagesToPdfConverterProps) {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'fit'>('fit');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | 'auto'>('auto');
  const [margin, setMargin] = useState<number>(0); // Margin in points
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    if (updated.length === 0) {
      onReset();
    } else {
      setFiles(updated);
    }
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= files.length) return;
    const updated = [...files];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setFiles(updated);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    moveItem(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Convert files array to PDF
  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        // Read file as data URL
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        // Load image into an HTMLImageElement to read width/height and draw on canvas
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const i = new Image();
          i.onload = () => resolve(i);
          i.onerror = () => reject(new Error('Image load failed'));
          i.src = dataUrl;
        });

        // Draw image on canvas to export as JPEG (converts webp/gifs natively)
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context fail');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const imageBytes = await fetch(jpegDataUrl).then((res) => res.arrayBuffer());
        const embeddedImage = await pdfDoc.embedJpg(imageBytes);

        // Determine Page Size
        let pageWidth = img.width;
        let pageHeight = img.height;

        if (pageSize === 'A4') {
          // A4 dimensions in points: 595.27 x 841.89
          pageWidth = 595.27;
          pageHeight = 841.89;
        } else if (pageSize === 'Letter') {
          // Letter dimensions: 612 x 792
          pageWidth = 612;
          pageHeight = 792;
        }

        // Adjust for Orientation
        if (pageSize !== 'fit') {
          const isImgLandscape = img.width > img.height;
          if (orientation === 'landscape' || (orientation === 'auto' && isImgLandscape)) {
            // Swap width & height for landscape
            const temp = pageWidth;
            pageWidth = Math.max(pageWidth, pageHeight);
            pageHeight = Math.min(temp, pageHeight);
          } else if (orientation === 'portrait') {
            const temp = pageWidth;
            pageWidth = Math.min(pageWidth, pageHeight);
            pageHeight = Math.max(temp, pageHeight);
          }
        }

        // Add page
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Fit image inside dimensions considering margins
        const activeWidth = pageWidth - margin * 2;
        const activeHeight = pageHeight - margin * 2;

        const imgRatio = img.width / img.height;
        const pageRatio = activeWidth / activeHeight;

        let drawWidth = activeWidth;
        let drawHeight = activeHeight;

        if (imgRatio > pageRatio) {
          drawHeight = activeWidth / imgRatio;
        } else {
          drawWidth = activeHeight * imgRatio;
        }

        // Center the image in the page bounds
        const x = margin + (activeWidth - drawWidth) / 2;
        const y = margin + (activeHeight - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setPdfBlobUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert('Error converting images to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {pdfBlobUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <Download className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDF Compiled Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your images have been compiled into a single PDF document.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={pdfBlobUrl}
              download="compiled_images.pdf"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <button
              onClick={() => {
                setPdfBlobUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Convert More
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 border-b border-border pb-6">
            <div className="flex-1 space-y-4">
              <h3 className="font-bold text-base text-foreground">Uploaded Images ({files.length})</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
                {files.map((file, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`group relative p-2 rounded-xl border border-border/80 bg-background/50 hover:bg-muted/30 transition-all cursor-grab active:cursor-grabbing flex flex-col items-center ${
                      draggedIndex === index ? 'opacity-40 border-primary bg-primary/5' : ''
                    }`}
                  >
                    <div className="w-full h-20 rounded bg-muted/40 mb-2 flex items-center justify-center overflow-hidden">
                      <FileImage className="w-8 h-8 text-muted-foreground group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <span className="text-[10px] font-semibold text-foreground truncate w-full text-center">
                      {file.name}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(index); }}
                      className="absolute top-1 right-1 p-1 rounded-md bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Options Column */}
            <div className="w-full md:w-64 glass-panel p-4 rounded-xl border border-border/80 space-y-4 h-fit shrink-0">
              <div className="flex items-center gap-1.5 border-b border-border pb-2">
                <Settings className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Layout Options</h4>
              </div>

              {/* Page Size */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Page Size</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
                >
                  <option value="fit">Fit to Image Size</option>
                  <option value="A4">A4 (595 x 842 pt)</option>
                  <option value="Letter">US Letter (612 x 792 pt)</option>
                </select>
              </div>

              {/* Orientation */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Orientation</label>
                <select
                  value={orientation}
                  disabled={pageSize === 'fit'}
                  onChange={(e) => setOrientation(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs disabled:opacity-40"
                >
                  <option value="auto">Auto Orient</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              {/* Margins */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Margins</label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
                >
                  <option value={0}>No Margin</option>
                  <option value={18}>Small Margin (18pt)</option>
                  <option value={36}>Big Margin (36pt)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
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
              {isProcessing ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
