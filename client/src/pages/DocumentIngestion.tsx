import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Camera, Upload, FileText, ArrowLeft, Loader2, CheckCircle2, XCircle } from "lucide-react";
import type { ContractCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContract } from "@/lib/contractContext";
import { extractTextFromFile } from "@/lib/documentParsers";
import { analyzeContract } from "@/lib/patternMatcher";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createWorker } from 'tesseract.js';
import logoImage from '@assets/showbusiness-shield-logo.jpg';

export default function DocumentIngestion() {
  const [, navigate] = useLocation();
  const [contractText, setContractText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const [showSystemCheckDialog, setShowSystemCheckDialog] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [systemCheckResults, setSystemCheckResults] = useState<{
    patternMatcher: boolean;
    documentParsers: boolean;
    localStorage: boolean;
    camera: boolean;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const { setContractData, category } = useContract();

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!category) {
    navigate("/");
    return null;
  }

  const categoryTitles: Record<ContractCategory, string> = {
    general_vo: "General / VO",
    film_tv: "Film / TV",
    stage_theatre: "Stage / Theatre"
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const text = await extractTextFromFile(file);
      setContractText(text);
      toast({
        title: "File loaded successfully",
        description: `${file.name} has been imported. ${text.length} characters extracted.`,
      });
    } catch (error) {
      toast({
        title: "Error loading file",
        description: error instanceof Error ? error.message : "Could not read the file.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCameraCapture = async () => {
    setShowCameraDialog(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please grant camera permissions to use this feature.",
        variant: "destructive",
      });
      setShowCameraDialog(false);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    stopCamera();
    setIsProcessing(true);
    setOcrProgress(0);

    let worker;
    try {
      worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        },
      });
      
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:!?-()[]{}"\' ',
      });

      const { data } = await worker.recognize(canvas, {}, {
        text: true,
        blocks: true,
        hocr: false,
        tsv: false,
      });

      if (data.text && data.text.trim().length > 0) {
        setContractText(prev => prev ? `${prev}\n\n${data.text}` : data.text);
        toast({
          title: "Text extracted successfully",
          description: `${data.text.length} characters extracted from the photo.`,
        });
      } else {
        toast({
          title: "No text detected",
          description: "Please try again with better lighting or a clearer image.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "OCR failed",
        description: error instanceof Error ? error.message : "Could not extract text from image.",
        variant: "destructive",
      });
    } finally {
      if (worker) {
        await worker.terminate();
      }
      setIsProcessing(false);
      setOcrProgress(0);
      setShowCameraDialog(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handleSystemCheck = async () => {
    setShowSystemCheckDialog(true);
    setIsProcessing(true);

    const results = {
      patternMatcher: false,
      documentParsers: false,
      localStorage: false,
      camera: false,
    };

    try {
      const testContract = `
        This is a Work-For-Hire Agreement. Artist hereby grants Company a perpetual, 
        irrevocable, worldwide license to use Artist's work in any manner whatsoever, 
        including but not limited to future technologies and derivative works.
      `;
      const analysis = analyzeContract(testContract, 'general_vo');
      results.patternMatcher = analysis.threats.length > 0;
    } catch (error) {
      console.error('Pattern matcher test failed:', error);
    }

    try {
      const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      await extractTextFromFile(testFile);
      results.documentParsers = true;
    } catch (error) {
      console.error('Document parser test failed:', error);
    }

    try {
      localStorage.setItem('showbusiness_test', 'test');
      const testValue = localStorage.getItem('showbusiness_test');
      localStorage.removeItem('showbusiness_test');
      results.localStorage = testValue === 'test';
    } catch (error) {
      console.error('LocalStorage test failed:', error);
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      results.camera = devices.some(device => device.kind === 'videoinput');
    } catch (error) {
      console.error('Camera check failed:', error);
    }

    setSystemCheckResults(results);
    setIsProcessing(false);
  };

  const handleAnalyze = () => {
    if (contractText.trim().length < 50) {
      toast({
        title: "Contract text too short",
        description: "Please enter at least 50 characters of contract text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setContractData(contractText, category);
    navigate("/analysis");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <img 
            src={logoImage} 
            alt="ShowBusiness Shield" 
            className="w-16 h-16 object-cover"
            data-testid="img-logo"
          />
          <div className="flex-1">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1" data-testid="text-page-title">
              Upload Your Contract
            </h1>
            <p className="text-base text-foreground/80" data-testid="text-contract-category">
              Category: <span className="font-semibold">{categoryTitles[category]}</span>
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/")}
                className="border-accent text-accent hover:bg-accent/10"
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Back to category selection</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={handleCameraCapture}
                data-testid="card-camera-option"
              >
                <div className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-card border-2 flex items-center justify-center" style={{ borderColor: 'hsl(45, 50%, 58%)' }}>
                    <Camera className="w-6 h-6" style={{ color: 'hsl(344, 65%, 50%)' }} />
                  </div>
                  <h3 className="font-semibold text-card-foreground" data-testid="text-camera-title">Take Photo</h3>
                  <p className="text-xs text-card-foreground/70">Capture & OCR</p>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Use your device camera to capture contract pages. Text will be extracted automatically using OCR.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={() => fileInputRef.current?.click()}
                data-testid="card-upload-option"
              >
                <div className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-card border-2 flex items-center justify-center" style={{ borderColor: 'hsl(45, 50%, 58%)' }}>
                    <Upload className="w-6 h-6" style={{ color: 'hsl(344, 65%, 50%)' }} />
                  </div>
                  <h3 className="font-semibold text-card-foreground" data-testid="text-upload-title">Upload File</h3>
                  <p className="text-xs text-card-foreground/70">PDF, DOCX, or TXT</p>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>The most reliable method. Upload a standard PDF, DOCX, or TXT file for a full analysis.</p>
            </TooltipContent>
          </Tooltip>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,text/plain,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
            data-testid="input-file-upload"
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={handleSystemCheck}
                data-testid="card-system-check-option"
              >
                <div className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-card border-2 flex items-center justify-center" style={{ borderColor: 'hsl(45, 50%, 58%)' }}>
                    <FileText className="w-6 h-6" style={{ color: 'hsl(344, 65%, 50%)' }} />
                  </div>
                  <h3 className="font-semibold text-card-foreground">System Check</h3>
                  <p className="text-xs text-card-foreground/70">Test Features</p>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Verify that all app features are working correctly on your device.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Card className="p-6 mb-6">
          <label className="block mb-3">
            <span className="font-semibold text-card-foreground text-lg mb-2 block" data-testid="text-paste-label">
              Or paste your contract text here:
            </span>
            <Textarea
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              placeholder="Paste the full text of your contract here..."
              className="min-h-[300px] font-mono text-sm resize-y"
              data-testid="textarea-contract-input"
            />
          </label>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground" data-testid="text-char-count">
              {contractText.length} characters
            </span>
            {isProcessing && (
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {ocrProgress > 0 ? `Extracting text: ${ocrProgress}%` : 'Processing file...'}
              </span>
            )}
          </div>
        </Card>

        <div className="flex justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={contractText.trim().length < 50 || isProcessing}
                className="px-12 py-6 text-lg font-bold uppercase tracking-wider"
                data-testid="button-analyze-contract"
              >
                Analyze Contract
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Begin pattern-based threat analysis of your contract</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Dialog open={showCameraDialog} onOpenChange={(open) => {
        if (!open) {
          stopCamera();
          setShowCameraDialog(false);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Capture Contract Photo</DialogTitle>
            <DialogDescription>
              Position your contract in the camera frame and click capture. Text will be extracted automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                data-testid="video-camera-preview"
              />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  stopCamera();
                  setShowCameraDialog(false);
                }}
                data-testid="button-cancel-camera"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCapture}
                disabled={isProcessing}
                data-testid="button-capture-photo"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Extracting Text...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Photo
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSystemCheckDialog} onOpenChange={setShowSystemCheckDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>System Check</DialogTitle>
            <DialogDescription>
              Verifying that all features are working correctly on your device
            </DialogDescription>
          </DialogHeader>
          {isProcessing ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'hsl(45, 50%, 58%)' }} />
            </div>
          ) : systemCheckResults && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-card" data-testid="check-pattern-matcher">
                <span className="text-sm font-medium text-card-foreground">Pattern Matcher</span>
                {systemCheckResults.patternMatcher ? (
                  <CheckCircle2 className="w-5 h-5" style={{ color: 'hsl(120, 60%, 50%)' }} />
                ) : (
                  <XCircle className="w-5 h-5" style={{ color: 'hsl(0, 72%, 50%)' }} />
                )}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-card" data-testid="check-document-parsers">
                <span className="text-sm font-medium text-card-foreground">Document Parsers</span>
                {systemCheckResults.documentParsers ? (
                  <CheckCircle2 className="w-5 h-5" style={{ color: 'hsl(120, 60%, 50%)' }} />
                ) : (
                  <XCircle className="w-5 h-5" style={{ color: 'hsl(0, 72%, 50%)' }} />
                )}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-card" data-testid="check-local-storage">
                <span className="text-sm font-medium text-card-foreground">Local Storage</span>
                {systemCheckResults.localStorage ? (
                  <CheckCircle2 className="w-5 h-5" style={{ color: 'hsl(120, 60%, 50%)' }} />
                ) : (
                  <XCircle className="w-5 h-5" style={{ color: 'hsl(0, 72%, 50%)' }} />
                )}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-card" data-testid="check-camera">
                <span className="text-sm font-medium text-card-foreground">Camera Access</span>
                {systemCheckResults.camera ? (
                  <CheckCircle2 className="w-5 h-5" style={{ color: 'hsl(120, 60%, 50%)' }} />
                ) : (
                  <XCircle className="w-5 h-5" style={{ color: 'hsl(0, 72%, 50%)' }} />
                )}
              </div>
              <div className="pt-3">
                <Button
                  onClick={() => setShowSystemCheckDialog(false)}
                  className="w-full"
                  data-testid="button-close-system-check"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
