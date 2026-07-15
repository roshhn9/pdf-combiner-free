'use client';

import { useState } from 'react';
import mammoth from 'mammoth';
import { Download, RefreshCw, FileText, Printer, CheckCircle2 } from 'lucide-react';

interface WordToPDFProps {
  files: File[];
  onReset: () => void;
}

export default function WordToPDF({ files, onReset }: WordToPDFProps) {
  const file = files[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setHtmlContent(result.value);
    } catch (err) {
      alert('Error parsing Word document. Ensure it is a valid .docx file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    // Open a clean window with only the parsed HTML for perfect print layout
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${file.name.replace('.docx', '')}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
              table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            ${htmlContent}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() { window.close(); }
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-6">
      {htmlContent ? (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-sm text-foreground">Document Converted Successfully</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/10"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
              <button
                onClick={onReset}
                className="px-4 py-2 bg-secondary hover:bg-secondary/85 text-secondary-foreground font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Convert More
              </button>
            </div>
          </div>

          <div className="border border-border/80 rounded-xl p-6 bg-card max-h-[400px] overflow-y-auto shadow-inner text-sm leading-relaxed prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
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

          <div className="p-4 rounded-xl border border-border bg-background/50 text-xs text-muted-foreground leading-relaxed">
            This tool converts Word (.docx) documents to PDF client-side. We parse text, tables, list structures, and images, rendering them directly in your browser.
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
              {isProcessing ? 'Converting...' : 'Convert Word File'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
