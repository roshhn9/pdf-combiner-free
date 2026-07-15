'use client';

import { useState, useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { PDFDocument, degrees } from 'pdf-lib';
import { rotatePdfPages, deletePdfPages, extractPdfPages } from '@/lib/pdfUtils';
import { Download, RefreshCw, FileText, RotateCw, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface VisualPdfEditorProps {
  file: File;
  onReset: () => void;
  mode: 'rotate' | 'delete' | 'extract' | 'reorder' | 'organize';
}

interface PageItem {
  index: number; // 0-indexed original position
  rotation: number; // 0, 90, 180, 270 degrees
  selected: boolean;
  dataUrl: string;
}

export default function VisualPdfEditor({ file, onReset, mode }: VisualPdfEditorProps) {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isRendering, setIsRendering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputBlobUrl, setOutputBlobUrl] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Parse and render page previews to dataUrls
  useEffect(() => {
    const renderPreviews = async () => {
      setIsRendering(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        const items: PageItem[] = [];

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.3 }); // Render thumbnail-sized previews

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            await page.render({ canvasContext: ctx, viewport, canvas }).promise;
            items.push({
              index: i - 1,
              rotation: 0,
              selected: mode === 'extract' ? false : true,
              dataUrl: canvas.toDataURL(),
            });
          }
        }
        setPages(items);
      } catch (err) {
        alert('Error rendering PDF preview.');
      } finally {
        setIsRendering(false);
      }
    };
    renderPreviews();
  }, [file, mode]);

  // Page Action functions
  const handleRotate = (index: number) => {
    setPages((prev) =>
      prev.map((p, i) => (i === index ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
  };

  const handleDelete = (index: number) => {
    setPages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleSelect = (index: number) => {
    setPages((prev) =>
      prev.map((p, i) => (i === index ? { ...p, selected: !p.selected } : p))
    );
  };

  const movePage = (from: number, to: number) => {
    if (to < 0 || to >= pages.length) return;
    const updated = [...pages];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setPages(updated);
  };

  const handleDragStart = (index: number) => {
    if (mode !== 'reorder' && mode !== 'organize') return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    movePage(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Compile final PDF based on layout edits
  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      let pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const newDoc = await PDFDocument.create();
      
      // Filter pages based on selection for delete/extract modes
      const activePages = pages.filter(p => p.selected);
      if (activePages.length === 0) {
        throw new Error('Please select at least one page.');
      }

      // Copy and arrange indices
      const sourceIndices = activePages.map(p => p.index);
      const copiedPages = await newDoc.copyPages(pdfDoc, sourceIndices);
      
      // Insert copied pages and apply custom rotations
      copiedPages.forEach((copiedPage, idx) => {
        newDoc.addPage(copiedPage);
        const originalPageConfig = activePages[idx];
        if (originalPageConfig.rotation > 0) {
          const currentRotation = copiedPage.getRotation().angle;
          copiedPage.setRotation(degrees((currentRotation + originalPageConfig.rotation) % 360));
        }
      });

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setOutputBlobUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      alert(err.message || 'Error processing changes.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isRendering) {
    return (
      <div className="text-center py-20 space-y-4">
        <RefreshCw className="w-10 h-10 animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground font-semibold">Parsing pages into visual grid...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {outputBlobUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Layout Saved Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your modified PDF document has been compiled.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={outputBlobUrl}
              download={`${file.name.replace('.pdf', '')}_edited.pdf`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <button
              onClick={() => {
                setOutputBlobUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Edit More
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground">{file.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {mode === 'reorder' && 'Drag pages to reorder'}
              {mode === 'delete' && 'Click delete on unwanted pages'}
              {mode === 'extract' && 'Select pages to extract'}
              {mode === 'rotate' && 'Click rotate on pages'}
              {mode === 'organize' && 'Drag, rotate, or delete pages'}
            </p>
          </div>

          {/* Page Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-1 max-h-[420px] overflow-y-auto">
            {pages.map((page, index) => (
              <div
                key={index}
                draggable={mode === 'reorder' || mode === 'organize'}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => mode === 'extract' && handleToggleSelect(index)}
                className={`group relative p-3 rounded-2xl border bg-background/50 flex flex-col items-center gap-2 transition-all select-none hover:scale-[1.02] ${
                  draggedIndex === index ? 'opacity-40 border-primary bg-primary/5' : 'border-border/80'
                } ${mode === 'extract' ? 'cursor-pointer' : ''} ${
                  mode === 'extract' && page.selected ? 'ring-2 ring-primary border-primary bg-primary/[0.02]' : ''
                }`}
              >
                {/* Visual Canvas Render Holder */}
                <div 
                  className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-border bg-white flex items-center justify-center shadow-sm relative"
                  style={{ transform: `rotate(${page.rotation}deg)`, transition: 'transform 0.2s ease' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={page.dataUrl} alt={`Page ${page.index + 1}`} className="max-w-full max-h-full object-contain" />
                </div>

                {/* Page Number Label */}
                <span className="text-[10px] font-bold text-muted-foreground">
                  Page {page.index + 1}
                </span>

                {/* Grid Overlay Controls */}
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Rotate Mode Buttons */}
                  {(mode === 'rotate' || mode === 'organize') && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRotate(index); }}
                      className="p-1 rounded-md bg-primary text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
                      title="Rotate 90°"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Delete Mode Buttons */}
                  {(mode === 'delete' || mode === 'organize') && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(index); }}
                      className="p-1 rounded-md bg-rose-500 text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
                      title="Delete Page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Checkbox for Page Selection (Extract Mode) */}
                {mode === 'extract' && (
                  <div className={`absolute top-2 left-2 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    page.selected 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-border bg-background'
                  }`}>
                    {page.selected && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                  </div>
                )}
              </div>
            ))}
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
              {isProcessing ? 'Processing...' : 'Apply Layout'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
