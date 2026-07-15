'use client';

import { useState } from 'react';
import { Download, RefreshCw, Printer, Code } from 'lucide-react';

interface HTMLToPDFProps {
  files?: File[];
  onReset: () => void;
}

export default function HTMLToPDF({ onReset }: HTMLToPDFProps) {
  const [htmlCode, setHtmlCode] = useState(`<h1>My PDF Document</h1>\n<p>Generate clean client-side PDFs using HTML code templates.</p>`);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePrint = () => {
    setIsProcessing(true);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Rendered HTML Document</title>
            <style>
              body { font-family: system-ui, sans-serif; padding: 40px; line-height: 1.6; color: #111; }
            </style>
          </head>
          <body>
            ${htmlCode}
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
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* HTML Editor Input */}
        <div className="flex-1 space-y-3">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
            Enter HTML Code
          </label>
          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-primary"
            placeholder="<html><body>...</body></html>"
          />
        </div>

        {/* Live Preview Pane */}
        <div className="flex-1 space-y-3 flex flex-col">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
            Live Sandbox Preview
          </label>
          <div className="flex-1 min-h-[220px] rounded-2xl border border-border bg-white overflow-hidden shadow-inner p-4">
            <iframe
              srcDoc={`<html><body style="font-family:sans-serif;font-size:12px;color:#333;margin:0;padding:5px;">${htmlCode}</body></html>`}
              className="w-full h-full border-none"
              title="HTML Preview Sandbox"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
        <button
          onClick={onReset}
          className="px-5 py-2.5 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={handlePrint}
          disabled={isProcessing || !htmlCode.trim()}
          className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shadow-md shadow-primary/20 transition-all cursor-pointer disabled:opacity-50"
        >
          <Printer className="w-4 h-4" />
          Compile & Print PDF
        </button>
      </div>
    </div>
  );
}
