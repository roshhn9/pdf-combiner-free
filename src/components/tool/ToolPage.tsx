'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { TOOLS, ToolConfig } from '@/config/tools';
import DropZone from './DropZone';
import { generateJsonLdSchema } from '@/lib/seoUtils';
import { HelpCircle, ChevronDown, ChevronUp, Star, TrendingUp, Sparkles, Shield } from 'lucide-react';

interface ToolPageProps {
  toolId: string;
}

// Dynamically import tool workspaces client-side only (improves page speed)
const MergePdf = dynamic(() => import('@/components/tools/MergePdf'), { ssr: false });
const SplitPdf = dynamic(() => import('@/components/tools/SplitPdf'), { ssr: false });
const CompressPdf = dynamic(() => import('@/components/tools/CompressPdf'), { ssr: false });
const PDFToJPG = dynamic(() => import('@/components/tools/PDFToJPG'), { ssr: false });
const JPGToPDF = dynamic(() => import('@/components/tools/JPGToPDF'), { ssr: false });
const PNGToPDF = dynamic(() => import('@/components/tools/PNGToPDF'), { ssr: false });
const WordToPDF = dynamic(() => import('@/components/tools/WordToPDF'), { ssr: false });
const PDFToWord = dynamic(() => import('@/components/tools/PDFToWord'), { ssr: false });
const ExcelToPDF = dynamic(() => import('@/components/tools/ExcelToPDF'), { ssr: false });
const PowerPointToPDF = dynamic(() => import('@/components/tools/PowerPointToPDF'), { ssr: false });
const RotatePdf = dynamic(() => import('@/components/tools/RotatePdf'), { ssr: false });
const DeletePdfPages = dynamic(() => import('@/components/tools/DeletePdfPages'), { ssr: false });
const ExtractPdfPages = dynamic(() => import('@/components/tools/ExtractPdfPages'), { ssr: false });
const ReorderPages = dynamic(() => import('@/components/tools/ReorderPages'), { ssr: false });
const WatermarkPdf = dynamic(() => import('@/components/tools/WatermarkPdf'), { ssr: false });
const UnlockPdf = dynamic(() => import('@/components/tools/UnlockPdf'), { ssr: false });
const ProtectPdf = dynamic(() => import('@/components/tools/ProtectPdf'), { ssr: false });
const AddPageNumbers = dynamic(() => import('@/components/tools/AddPageNumbers'), { ssr: false });
const CropPdf = dynamic(() => import('@/components/tools/CropPdf'), { ssr: false });
const ResizePdf = dynamic(() => import('@/components/tools/ResizePdf'), { ssr: false });
const RepairPdf = dynamic(() => import('@/components/tools/RepairPdf'), { ssr: false });
const OcrPdf = dynamic(() => import('@/components/tools/OcrPdf'), { ssr: false });
const SignPdf = dynamic(() => import('@/components/tools/SignPdf'), { ssr: false });
const ComparePdfs = dynamic(() => import('@/components/tools/ComparePdfs'), { ssr: false });
const OrganizePdf = dynamic(() => import('@/components/tools/OrganizePdf'), { ssr: false });
const PDFToText = dynamic(() => import('@/components/tools/PDFToText'), { ssr: false });
const PDFToPNG = dynamic(() => import('@/components/tools/PDFToPNG'), { ssr: false });
const PDFToWEBP = dynamic(() => import('@/components/tools/PDFToWEBP'), { ssr: false });
const HTMLToPDF = dynamic(() => import('@/components/tools/HTMLToPDF'), { ssr: false });
const ImagesToPDF = dynamic(() => import('@/components/tools/ImagesToPDF'), { ssr: false });
const ScanToPDF = dynamic(() => import('@/components/tools/ScanToPDF'), { ssr: false });

export default function ToolPage({ toolId }: ToolPageProps) {
  const tool = TOOLS[toolId];
  const [files, setFiles] = useState<File[]>([]);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  if (!tool) {
    return <div className="text-center py-20">Tool not found.</div>;
  }

  const schemas = generateJsonLdSchema(toolId);

  // Map file input rules
  const getFileAcceptType = () => {
    if (['jpg-to-pdf', 'png-to-pdf', 'images-to-pdf'].includes(toolId)) return 'image/*';
    if (toolId === 'word-to-pdf') return '.docx';
    if (toolId === 'excel-to-pdf') return '.xlsx,.xls';
    if (toolId === 'powerpoint-to-pdf') return '.pptx,.ppt';
    if (toolId === 'html-to-pdf') return '.html';
    return '.pdf';
  };

  const isMultipleAllowed = () => {
    return ['merge-pdf', 'jpg-to-pdf', 'png-to-pdf', 'images-to-pdf', 'compare-pdfs', 'organize-pdf'].includes(toolId);
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleReset = () => {
    setFiles([]);
  };

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Render the appropriate tool workspace
  const renderToolWorkspace = () => {
    const props = { files, onReset: handleReset };
    switch (toolId) {
      case 'merge-pdf': return <MergePdf {...props} />;
      case 'split-pdf': return <SplitPdf {...props} />;
      case 'compress-pdf': return <CompressPdf {...props} />;
      case 'pdf-to-jpg': return <PDFToJPG {...props} />;
      case 'jpg-to-pdf': return <JPGToPDF {...props} />;
      case 'png-to-pdf': return <PNGToPDF {...props} />;
      case 'word-to-pdf': return <WordToPDF {...props} />;
      case 'pdf-to-word': return <PDFToWord {...props} />;
      case 'excel-to-pdf': return <ExcelToPDF {...props} />;
      case 'powerpoint-to-pdf': return <PowerPointToPDF {...props} />;
      case 'rotate-pdf': return <RotatePdf {...props} />;
      case 'delete-pdf-pages': return <DeletePdfPages {...props} />;
      case 'extract-pdf-pages': return <ExtractPdfPages {...props} />;
      case 'reorder-pdf-pages': return <ReorderPages {...props} />;
      case 'watermark-pdf': return <WatermarkPdf {...props} />;
      case 'unlock-pdf': return <UnlockPdf {...props} />;
      case 'protect-pdf': return <ProtectPdf {...props} />;
      case 'add-page-numbers': return <AddPageNumbers {...props} />;
      case 'crop-pdf': return <CropPdf {...props} />;
      case 'resize-pdf': return <ResizePdf {...props} />;
      case 'repair-pdf': return <RepairPdf {...props} />;
      case 'ocr-pdf': return <OcrPdf {...props} />;
      case 'sign-pdf': return <SignPdf {...props} />;
      case 'compare-pdfs': return <ComparePdfs {...props} />;
      case 'organize-pdf': return <OrganizePdf {...props} />;
      case 'pdf-to-text': return <PDFToText {...props} />;
      case 'pdf-to-png': return <PDFToPNG {...props} />;
      case 'pdf-to-webp': return <PDFToWEBP {...props} />;
      case 'html-to-pdf': return <HTMLToPDF {...props} />;
      case 'images-to-pdf': return <ImagesToPDF {...props} />;
      case 'scan-to-pdf': return <ScanToPDF {...props} />;
      default: return <div className="text-center">Work in progress...</div>;
    }
  };

  return (
    <div className="space-y-12">
      {/* Dynamic JSON-LD Schema injection */}
      {schemas?.softwareAppSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.softwareAppSchema) }} />
      )}
      {schemas?.breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbSchema) }} />
      )}
      {schemas?.faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqSchema) }} />
      )}
      {schemas?.howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.howToSchema) }} />
      )}

      {/* Top Banner Ad Placeholder */}
      <div className="w-full h-24 bg-muted/40 rounded-2xl flex items-center justify-center border border-border/60 relative overflow-hidden select-none mb-6">
        <div className="text-[10px] text-muted-foreground absolute top-1 left-2 font-bold uppercase tracking-widest scale-75 origin-top-left">ADVERTISEMENT</div>
        <div className="text-xs text-muted-foreground font-semibold">Responsive Leaderboard Banner [AdSense Ready]</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Work Area */}
        <div className="lg:col-span-3 space-y-10">
          {/* Header */}
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text">
              {tool.h1}
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              {tool.description}
            </p>
          </div>

          {/* Active Workspace / DropZone Container */}
          <div className="min-h-[400px] flex items-center justify-center">
            {files.length === 0 && !['html-to-pdf', 'scan-to-pdf'].includes(toolId) ? (
              <DropZone
                onFilesSelected={handleFilesSelected}
                accept={getFileAcceptType()}
                multiple={isMultipleAllowed()}
                title={`Upload files for ${tool.h1}`}
                description={`Select or drag PDF files here. Processing is 100% local and safe.`}
              />
            ) : (
              <div className="w-full glass-panel p-6 md:p-8 rounded-2xl border border-border shadow-xl">
                {renderToolWorkspace()}
              </div>
            )}
          </div>

          {/* How to Guide (SEO HowTo schema matched) */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">How to use {tool.h1}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {tool.howTo.map((step, index) => (
                <div key={index} id={`step-${index + 1}`} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-sm shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-foreground mb-1">{step.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs section (SEO FAQ schema matched) */}
          {tool.faqs.length > 0 && (
            <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
              <div className="flex items-center gap-2 border-b border-border pb-4">
                <HelpCircle className="w-5 h-5 text-indigo-500" />
                <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4 pt-2">
                {tool.faqs.map((faq, index) => {
                  const isOpen = faqOpen[index];
                  return (
                    <div key={index} className="border border-border/80 rounded-xl overflow-hidden bg-muted/20">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 font-semibold text-sm text-left text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40 bg-background/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Ads and Navigation */}
        <div className="space-y-6 lg:border-l lg:border-border lg:pl-8">
          {/* Privacy Seal */}
          <div className="glass-panel p-5 rounded-2xl space-y-3 border border-emerald-500/20 bg-emerald-500/[0.02]">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <Shield className="w-4 h-4" />
              100% Secure & Private
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              We process your files directly inside your browser. No files are uploaded to any server. Your sensitive information remains completely confidential.
            </p>
          </div>

          {/* Sidebar Ad Slot */}
          <div className="w-full min-h-[250px] bg-muted/40 rounded-2xl flex flex-col items-center justify-center border border-border/60 p-4 relative overflow-hidden select-none">
            <div className="text-[10px] text-muted-foreground absolute top-1 left-2 font-bold uppercase tracking-widest scale-75 origin-top-left">ADVERTISEMENT</div>
            <div className="text-xs text-muted-foreground font-semibold text-center mb-1">Standard Rectangle Banner</div>
            <div className="text-[10px] text-muted-foreground font-medium">[AdSense Ready]</div>
          </div>

          {/* Popular Tools List */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Popular tools</h3>
            </div>
            <div className="space-y-2">
              {Object.values(TOOLS)
                .filter((t) => t.popular && t.id !== toolId)
                .slice(0, 5)
                .map((t) => (
                  <Link
                    key={t.id}
                    href={`/${t.id}`}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/80 transition-colors text-xs font-semibold group cursor-pointer"
                  >
                    <span className="text-foreground group-hover:text-primary transition-colors truncate pr-2">{t.h1}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
