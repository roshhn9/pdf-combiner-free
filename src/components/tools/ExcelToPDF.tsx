'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Download, RefreshCw, FileText, Printer, CheckCircle2 } from 'lucide-react';

interface ExcelToPDFProps {
  files: File[];
  onReset: () => void;
}

export default function ExcelToPDF({ files, onReset }: ExcelToPDFProps) {
  const file = files[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [sheetsData, setSheetsData] = useState<{ name: string; html: string }[] | null>(null);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      const parsedSheets = workbook.SheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const html = XLSX.utils.sheet_to_html(worksheet, { editable: false });
        return { name: sheetName, html };
      });
      
      setSheetsData(parsedSheets);
    } catch (err) {
      alert('Error parsing Excel spreadsheet. Ensure it is a valid .xlsx or .xls file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    if (!sheetsData) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${file.name.replace('.xlsx', '')}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #333; }
              table { border-collapse: collapse; width: 100%; margin-bottom: 30px; font-size: 11px; }
              th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
              h2 { font-size: 14px; margin-bottom: 10px; color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
            </style>
          </head>
          <body>
            <h2>Sheet: ${sheetsData[activeSheetIndex].name}</h2>
            ${sheetsData[activeSheetIndex].html}
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
      {sheetsData ? (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-sm text-foreground">Spreadsheet Converted</h3>
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

          {/* Sheet Selector */}
          {sheetsData.length > 1 && (
            <div className="flex gap-2 border-b border-border/60 pb-2 overflow-x-auto">
              {sheetsData.map((sheet, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSheetIndex(index)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    activeSheetIndex === index
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {sheet.name}
                </button>
              ))}
            </div>
          )}

          <div className="border border-border/80 rounded-xl p-4 bg-card max-h-[350px] overflow-auto shadow-inner text-xs">
            {/* Custom classes to style SheetJS outputs */}
            <div 
              className="excel-table-preview overflow-auto"
              dangerouslySetInnerHTML={{ __html: sheetsData[activeSheetIndex].html }} 
            />
            <style jsx global>{`
              .excel-table-preview table {
                border-collapse: collapse;
                width: 100%;
              }
              .excel-table-preview th, .excel-table-preview td {
                border: 1px solid var(--border);
                padding: 6px 8px;
                text-align: left;
                color: var(--foreground);
              }
            `}</style>
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
            This tool converts Excel tables (.xlsx/.xls) to PDF client-side. Spreadsheet tabs are rendered as HTML tables for local verification and exported layout formatting.
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
              {isProcessing ? 'Converting...' : 'Convert Excel File'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
