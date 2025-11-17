import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Camera, Upload, FileText, ArrowLeft, Loader2 } from "lucide-react";
import type { ContractCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContract } from "@/lib/contractContext";
import { extractTextFromFile } from "@/lib/documentParsers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logoImage from '@assets/showbusiness-shield-logo.jpg';

export default function DocumentIngestion() {
  const [, navigate] = useLocation();
  const [contractText, setContractText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { setContractData, category } = useContract();

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

  const handleCameraCapture = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Camera capture with OCR is in development. For now, please upload a file or paste text.",
    });
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
          <Card 
            className="p-6 flex flex-col items-center text-center gap-3 opacity-50 cursor-not-allowed"
            data-testid="card-camera-option"
          >
            <div className="w-12 h-12 rounded-full bg-card border-2 border-accent flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground" data-testid="text-camera-title">Take Photo</h3>
            <p className="text-xs text-card-foreground/70">Coming soon</p>
          </Card>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={() => fileInputRef.current?.click()}
                data-testid="card-upload-option"
              >
                <div className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-card border-2 border-accent flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
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

          <Card className="p-6 flex flex-col items-center text-center gap-3 opacity-50">
            <div className="w-12 h-12 rounded-full bg-card border-2 border-accent flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">System Check</h3>
            <p className="text-xs text-card-foreground/70">Coming soon</p>
          </Card>
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
                Processing file...
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
    </div>
  );
}
