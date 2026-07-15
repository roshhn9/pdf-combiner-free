'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Camera, RefreshCw, Trash2, Download, CheckCircle2, Video } from 'lucide-react';

interface ScanToPDFProps {
  files?: File[];
  onReset: () => void;
}

export default function ScanToPDF({ onReset }: ScanToPDFProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scans, setScans] = useState<string[]>([]); // data URLs
  const [filter, setFilter] = useState<'normal' | 'grayscale' | 'contrast'>('normal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Activate Camera on Mount
  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // Prefer back camera on phones
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        alert('Webcam access was denied or is unavailable on this device.');
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame on canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Apply Filter processing
    if (filter === 'grayscale') {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        data[i] = brightness;
        data[i + 1] = brightness;
        data[i + 2] = brightness;
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filter === 'contrast') {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2] >= 128) ? 255 : 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    setScans((prev) => [...prev, canvas.toDataURL('image/jpeg', 0.9)]);
  };

  const deleteScan = (index: number) => {
    setScans((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (scans.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();
      
      for (const scanUrl of scans) {
        const imageBytes = await fetch(scanUrl).then((res) => res.arrayBuffer());
        const embeddedImage = await pdfDoc.embedJpg(imageBytes);
        
        // Match standard Letter bounds
        const page = pdfDoc.addPage([612, 792]);
        page.drawImage(embeddedImage, {
          x: 20,
          y: 20,
          width: 612 - 40,
          height: 792 - 40,
        });
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setPdfBlobUrl(URL.createObjectURL(blob));

      // Stop camera stream to free resources
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (err) {
      alert('Error creating PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {pdfBlobUrl ? (
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Scan Document PDF Generated!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your captured camera pages are compiled into a PDF.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={pdfBlobUrl}
              download="camera_scan.pdf"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <button
              onClick={() => {
                setPdfBlobUrl(null);
                setScans([]);
                onReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Scan More
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Video Feed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block flex items-center gap-1">
                <Video className="w-4 h-4 text-primary" /> Camera Feed
              </label>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('normal')}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer ${filter === 'normal' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80 text-foreground'}`}
                >
                  Color
                </button>
                <button
                  onClick={() => setFilter('grayscale')}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer ${filter === 'grayscale' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80 text-foreground'}`}
                >
                  Grayscale
                </button>
                <button
                  onClick={() => setFilter('contrast')}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer ${filter === 'contrast' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80 text-foreground'}`}
                >
                  Scanner B&W
                </button>
              </div>
            </div>

            <div className="border border-border/80 rounded-2xl overflow-hidden bg-black aspect-video relative flex items-center justify-center">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <button
                onClick={capturePage}
                className="absolute bottom-4 p-4 bg-primary text-white hover:scale-105 transition-all shadow-lg rounded-full cursor-pointer border-2 border-white/20"
                title="Snap Page"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Right: Snaps list */}
          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-3">
                Scanned Pages ({scans.length})
              </label>
              
              <div className="grid grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
                {scans.map((scanUrl, index) => (
                  <div key={index} className="relative aspect-[3/4] border border-border/80 rounded-xl overflow-hidden bg-muted flex items-center justify-center group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={scanUrl} alt={`Scan ${index + 1}`} className="max-w-full max-h-full object-contain" />
                    <span className="absolute bottom-1 left-2 text-[9px] font-extrabold text-foreground bg-white/80 dark:bg-black/80 px-1 rounded">
                      Page {index + 1}
                    </span>
                    <button
                      onClick={() => deleteScan(index)}
                      className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
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
                disabled={isProcessing || scans.length === 0}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shadow-md shadow-primary/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Compiling...' : 'Compile Scans'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
