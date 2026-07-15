'use client';

import { useState } from 'react';
import { mergePdfs } from '@/lib/pdfUtils';
import { ArrowRight, Trash2, ArrowUp, ArrowDown, Download, RefreshCw, FileText } from 'lucide-react';

interface MergePdfProps {
  files: File[];
  onReset: () => void;
}

export default function MergePdf({ files: initialFiles, onReset }: MergePdfProps) {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedBlobUrl, setMergedBlobUrl] = useState<string | null>(null);
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

  // HTML5 Drag & Drop handlers
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

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const mergedBytes = await mergePdfs(files);
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedBlobUrl(url);
    } catch (err) {
      alert('Error merging files. Ensure all documents are non-corrupt PDFs.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {mergedBlobUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <Download className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">PDFs Merged Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your new combined PDF document is ready for download.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={mergedBlobUrl}
              download="merged_document.pdf"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <button
              onClick={() => {
                setMergedBlobUrl(null);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Merge More
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="font-bold text-base text-foreground">Uploaded Documents ({files.length})</h3>
            <p className="text-xs text-muted-foreground">Drag items to rearrange page order</p>
          </div>

          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center justify-between p-4 rounded-xl border border-border/80 bg-background/50 hover:bg-muted/30 transition-all cursor-grab active:cursor-grabbing ${
                  draggedIndex === index ? 'opacity-40 border-primary bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold truncate text-foreground">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveItem(index, index - 1)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(index, index + 1)}
                    disabled={index === files.length - 1}
                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Merging...
                </>
              ) : (
                <>
                  Combine PDFs
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
