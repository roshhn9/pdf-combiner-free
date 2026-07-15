'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept: string;
  multiple: boolean;
  title: string;
  description: string;
}

export default function DropZone({
  onFilesSelected,
  accept,
  multiple,
  title,
  description,
}: DropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setError(null);

    const filesArray = Array.from(fileList);
    
    // Quick validation
    const allowedExtensions = accept.split(',').map(ext => ext.trim().toLowerCase());
    const invalidFile = filesArray.find(file => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      // Match general image/* or docx types
      if (accept.includes('image/*') && file.type.startsWith('image/')) return false;
      return !allowedExtensions.includes(ext) && !allowedExtensions.includes(file.type);
    });

    if (invalidFile) {
      setError(`Invalid file type. Please upload files matching: ${accept}`);
      return;
    }

    if (!multiple && filesArray.length > 1) {
      onFilesSelected([filesArray[0]]);
    } else {
      onFilesSelected(filesArray);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    processFiles(e.target.files);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Clipboard paste support
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    const pastedFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const file = items[i].getAsFile();
      if (file) {
        pastedFiles.push(file);
      }
    }

    if (pastedFiles.length > 0) {
      setError(null);
      if (!multiple) {
        onFilesSelected([pastedFiles[0]]);
      } else {
        onFilesSelected(pastedFiles);
      }
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onPaste={handlePaste}
      onClick={triggerFileInput}
      className={`group w-full max-w-3xl mx-auto min-h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300 glass-panel ${
        isDragActive
          ? 'dropzone-active border-primary ring-2 ring-primary/20 scale-[1.01]'
          : 'border-border/60 hover:border-primary/50 hover:scale-[1.005]'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      <div className="p-4 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
        <UploadCloud className="w-10 h-10" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mb-4 leading-relaxed">
        {description}
      </p>
      
      <div className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-xl shadow-md shadow-primary/20 group-hover:shadow-primary/30 transition-all">
        Browse Files
      </div>

      <div className="mt-4 text-[10px] text-muted-foreground font-medium flex items-center gap-1.5 opacity-60">
        <File className="w-3 h-3" />
        Drag and drop or copy-paste directly here
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-1.5 text-xs text-rose-500 font-semibold bg-rose-500/10 px-3 py-2 rounded-xl border border-rose-500/20 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
