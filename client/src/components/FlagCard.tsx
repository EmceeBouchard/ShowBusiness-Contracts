import { useState } from "react";
import { CheckCircle2, AlertTriangle, AlertOctagon, ChevronDown, ChevronUp, FileEdit } from "lucide-react";
import type { ThreatFlag } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FlagCardProps {
  flag: ThreatFlag;
  onGetRevision?: (flag: ThreatFlag) => void;
}

export function FlagCard({ flag, onGetRevision }: FlagCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityConfig = {
    green: {
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-200 dark:border-green-900",
      badge: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
    },
    yellow: {
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      borderColor: "border-yellow-200 dark:border-yellow-900",
      badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
    },
    red: {
      icon: AlertOctagon,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      borderColor: "border-red-200 dark:border-red-900",
      badge: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
    }
  };

  const config = severityConfig[flag.severity];
  const Icon = config.icon;

  return (
    <Card className={`${config.bgColor} border-2 ${config.borderColor} overflow-hidden`} data-testid={`card-flag-${flag.id}`}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Icon className={`w-6 h-6 ${config.color} flex-shrink-0 mt-1`} data-testid={`icon-flag-${flag.severity}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="font-serif text-xl font-bold text-card-foreground" data-testid={`text-flag-title-${flag.id}`}>
                  {flag.title}
                </h3>
                <Badge className={config.badge} data-testid={`badge-severity-${flag.severity}`}>
                  {flag.severity.toUpperCase()}
                </Badge>
              </div>
              
              {flag.severity !== "green" && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-card-foreground mb-2">Flagged Clause:</p>
                  <div className="bg-background/30 rounded-md p-3 border border-border/50">
                    <p className="text-sm italic text-card-foreground/90" data-testid={`text-clause-${flag.id}`}>
                      "{flag.clauseText}"
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-card-foreground mb-2">Analysis</p>
                  <p className="text-sm text-card-foreground leading-relaxed" data-testid={`text-analysis-${flag.id}`}>
                    {flag.analysis}
                  </p>
                </div>

                {flag.context && (
                  <div>
                    <p className="text-sm font-semibold text-card-foreground mb-2">Industry Context</p>
                    <p className="text-sm text-card-foreground/90 leading-relaxed italic" data-testid={`text-context-${flag.id}`}>
                      {flag.context}
                    </p>
                  </div>
                )}

                {flag.strategicNote && (
                  <div>
                    <p className="text-sm font-semibold text-card-foreground mb-2">Strategic Note</p>
                    <p className="text-sm text-card-foreground/90 leading-relaxed" data-testid={`text-strategic-${flag.id}`}>
                      {flag.strategicNote}
                    </p>
                  </div>
                )}
              </div>

              {flag.severity !== "green" && flag.revisionSuggestion && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs font-semibold"
                    style={{ borderColor: 'hsl(344, 65%, 50%)', color: 'hsl(344, 65%, 50%)' }}
                    data-testid={`button-toggle-revision-${flag.id}`}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Hide Revision
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show Suggested Revision
                      </>
                    )}
                  </Button>

                  {isExpanded && (
                    <div className="mt-3 p-4 bg-primary/10 border border-primary/30 rounded-md">
                      <p className="text-sm font-semibold text-card-foreground mb-2">Suggested Revision:</p>
                      <p className="text-sm text-card-foreground/90 mb-3" data-testid={`text-revision-${flag.id}`}>
                        {flag.revisionSuggestion}
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(flag.revisionSuggestion!);
                              if (onGetRevision) onGetRevision(flag);
                            }}
                            data-testid={`button-copy-revision-${flag.id}`}
                          >
                            <FileEdit className="w-4 h-4 mr-2" />
                            Copy Revision
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy this revision to send back during negotiations</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
