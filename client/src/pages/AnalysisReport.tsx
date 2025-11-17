import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Download, Loader2, Shield } from "lucide-react";
import { generateUUID } from "@/lib/uuid";
import type { ContractAnalysis, ThreatFlag, FlagSeverity, ThreatCategory, ContractCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlagCard } from "@/components/FlagCard";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { VaultTimer } from "@/components/VaultTimer";
import { saveToVault } from "@/lib/vaultStorage";
import { useToast } from "@/hooks/use-toast";
import { useContract } from "@/lib/contractContext";
import { analyzeContract as analyzeContractPattern } from "@/lib/patternMatcher";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logoImage from '@assets/generated_images/ShowBusiness_Shield_Logo_c6d9773f.png';

export default function AnalysisReport() {
  const [, navigate] = useLocation();
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { contractText, category, clearContractData } = useContract();

  useEffect(() => {
    if (!category || !contractText) {
      navigate("/");
      return;
    }

    performAnalysis();
  }, [category, contractText, navigate]);

  const performAnalysis = () => {
    if (!category || !contractText) return;
    
    try {
      setIsLoading(true);

      const patternResult = analyzeContractPattern(contractText, category);
      const flags: ThreatFlag[] = [];

      for (const threat of patternResult.threats) {
        flags.push({
          id: generateUUID(),
          category: threat.category,
          severity: threat.severity,
          title: threat.title,
          clauseText: threat.clauseText,
          analysis: threat.analysis,
          revisionSuggestion: threat.revisionSuggestion,
        });
      }

      for (const greenFlag of patternResult.greenFlags || []) {
        flags.push({
          id: generateUUID(),
          category: "assignment_of_rights",
          severity: "green",
          title: greenFlag.title,
          clauseText: greenFlag.clauseText,
          analysis: greenFlag.analysis,
        });
      }

        const redCount = flags.filter(f => f.severity === "red").length;
        const yellowCount = flags.filter(f => f.severity === "yellow").length;
        
        let overallRiskLevel: "safe" | "caution" | "danger";
        if (redCount >= 3) {
          overallRiskLevel = "danger";
        } else if (redCount > 0 || yellowCount >= 3) {
          overallRiskLevel = "caution";
        } else {
          overallRiskLevel = "safe";
        }

        const result: ContractAnalysis = {
          id: generateUUID(),
          category,
          contractText,
          analyzedAt: new Date().toISOString(),
          flags,
          overallRiskLevel,
        };

        setAnalysis(result);
        saveToVault(result);

        toast({
          title: "Analysis complete",
          description: `Found ${result.flags.length} items to review.`,
        });
      } catch (error) {
        console.error("Analysis error:", error);
        toast({
          title: "Analysis failed",
          description: "Could not analyze the contract. Please try again.",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
  };

  const categoryTitles: Record<ContractCategory, string> = {
    general_vo: "General / VO",
    film_tv: "Film / TV",
    stage_theatre: "Stage / Theatre"
  };

  const riskLevelConfig = {
    safe: {
      color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      label: "Low Risk"
    },
    caution: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      label: "Moderate Risk"
    },
    danger: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
      label: "High Risk"
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" data-testid="loader-analyzing" />
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Analyzing Your Contract...
          </h2>
          <p className="text-foreground/80">
            Scanning for threats and predatory clauses
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const greenFlags = analysis.flags.filter(f => f.severity === "green");
  const yellowFlags = analysis.flags.filter(f => f.severity === "yellow");
  const redFlags = analysis.flags.filter(f => f.severity === "red");

  const handleRevisionCopied = () => {
    toast({
      title: "Revision copied",
      description: "The suggested revision has been copied to your clipboard.",
    });
  };

  const handleExportReport = () => {
    if (!category) return;
    
    const reportText = `
ShowBusiness: Contracts - Analysis Report
Generated: ${new Date(analysis.analyzedAt).toLocaleString()}
Category: ${categoryTitles[category]}
Overall Risk: ${riskLevelConfig[analysis.overallRiskLevel].label}

Total Flags: ${analysis.flags.length}
- Red Flags (Dangerous): ${redFlags.length}
- Yellow Flags (Iffy): ${yellowFlags.length}
- Green Flags (Safe): ${greenFlags.length}

${analysis.flags.map(flag => `
---
${flag.severity.toUpperCase()}: ${flag.title}

Clause: "${flag.clauseText}"

Analysis: ${flag.analysis}

${flag.revisionSuggestion ? `Suggested Revision: ${flag.revisionSuggestion}` : ''}
`).join('\n')}

---
LEGAL DISCLAIMER: This is a pattern-based diagnostic tool and not a substitute for legal advice from a qualified attorney.
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract-analysis-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report exported",
      description: "Your analysis report has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
        <VaultTimer />

      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <img 
            src={logoImage} 
            alt="ShowBusiness Shield" 
            className="w-16 h-16 object-contain"
            data-testid="img-logo"
          />
          <div className="flex-1">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1" data-testid="text-page-title">
              Contract Analysis Report
            </h1>
            <p className="text-base text-foreground/80" data-testid="text-contract-category">
              {category ? categoryTitles[category] : 'Unknown'} • Analyzed {new Date(analysis.analyzedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleExportReport}
                  data-testid="button-export-report"
                >
                  <Download className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export analysis as text file</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/")}
                  data-testid="button-back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Analyze a new contract</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <Card className="p-6 mb-8 border-2 border-primary/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" data-testid="icon-shield-summary" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-card-foreground mb-1" data-testid="text-overall-risk">
                  Overall Risk Level
                </h2>
                <Badge className={`${riskLevelConfig[analysis.overallRiskLevel].color} text-base px-3 py-1`} data-testid="badge-risk-level">
                  {riskLevelConfig[analysis.overallRiskLevel].label}
                </Badge>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="text-center" data-testid="stat-red-flags">
                <div className="text-2xl font-bold text-red-600">{redFlags.length}</div>
                <div className="text-muted-foreground">Red Flags</div>
              </div>
              <div className="text-center" data-testid="stat-yellow-flags">
                <div className="text-2xl font-bold text-yellow-600">{yellowFlags.length}</div>
                <div className="text-muted-foreground">Yellow Flags</div>
              </div>
              <div className="text-center" data-testid="stat-green-flags">
                <div className="text-2xl font-bold text-green-600">{greenFlags.length}</div>
                <div className="text-muted-foreground">Green Flags</div>
              </div>
            </div>
          </div>
        </Card>

        {redFlags.length > 0 && (
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2" data-testid="heading-red-flags">
              🚨 Red Flags - Dangerous Clauses
            </h2>
            <p className="text-sm text-foreground/80 mb-4">
              These clauses are predatory and should be renegotiated or removed before signing.
            </p>
            <div className="space-y-4">
              {redFlags.map((flag) => (
                <FlagCard key={flag.id} flag={flag} onGetRevision={handleRevisionCopied} />
              ))}
            </div>
          </div>
        )}

        {yellowFlags.length > 0 && (
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2" data-testid="heading-yellow-flags">
              ⚠️ Yellow Flags - Iffy Clauses
            </h2>
            <p className="text-sm text-foreground/80 mb-4">
              These clauses are vague or potentially unfavorable. Consider seeking clarification or revision.
            </p>
            <div className="space-y-4">
              {yellowFlags.map((flag) => (
                <FlagCard key={flag.id} flag={flag} onGetRevision={handleRevisionCopied} />
              ))}
            </div>
          </div>
        )}

        {greenFlags.length > 0 && (
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2" data-testid="heading-green-flags">
              ✅ Green Flags - Standard Clauses
            </h2>
            <p className="text-sm text-foreground/80 mb-4">
              These clauses are standard, fair, and typical for the industry.
            </p>
            <div className="space-y-4">
              {greenFlags.map((flag) => (
                <FlagCard key={flag.id} flag={flag} />
              ))}
            </div>
          </div>
        )}

        <LegalDisclaimer />
      </div>
    </div>
  );
}
