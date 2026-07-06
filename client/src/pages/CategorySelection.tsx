import { useState } from "react";
import { Mic, Film, Theater, ArrowRight, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import type { ContractCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContract } from "@/lib/contractContext";
import { loadAnalyses, deleteAnalysis, type VaultEntry } from "@/lib/vault";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logoImage from '@assets/showbusiness-shield-logo.jpg';

const riskBadgeConfig = {
  safe: {
    color: "bg-success/20 text-success border-success/30",
    label: "Low Risk"
  },
  caution: {
    color: "bg-warning/20 text-warning border-warning/30",
    label: "Moderate Risk"
  },
  danger: {
    color: "bg-destructive/20 text-destructive border-destructive/30",
    label: "High Risk"
  }
};

export default function CategorySelection() {
  const [, navigate] = useLocation();
  const { setCategory } = useContract();
  const [recentAnalyses, setRecentAnalyses] = useState<VaultEntry[]>(() => loadAnalyses());

  const handleDeleteEntry = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteAnalysis(id);
    setRecentAnalyses(prev => prev.filter(entry => entry.id !== id));
  };
  const categories: Array<{
    id: ContractCategory;
    title: string;
    description: string;
    icon: typeof Mic;
  }> = [
    {
      id: "general_vo",
      title: "General / VO",
      description: "Voice-over work, general performance contracts, and commercial work",
      icon: Mic
    },
    {
      id: "film_tv",
      title: "Film / TV",
      description: "Screen acting, television, streaming platforms, and digital media",
      icon: Film
    },
    {
      id: "stage_theatre",
      title: "Stage / Theatre",
      description: "Live performance, theatrical productions, and stage work",
      icon: Theater
    }
  ];

  return (
    <div className="min-h-screen stage-gradient">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-start gap-4 mb-8 animate-fade-in-up">
          <img
            src={logoImage}
            alt="ShowBusiness Shield"
            className="w-16 h-16 sm:w-24 sm:h-24 object-cover flex-shrink-0 rounded-lg"
            data-testid="img-logo"
          />
          <div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-2" data-testid="text-app-title">
              ShowBusiness: Contracts
            </h1>
            <p className="font-body text-lg text-muted-foreground" data-testid="text-app-subtitle">
              Your Contract Analysis Shield
            </p>
          </div>
          <a
            href="https://stage.showbusiness.actor"
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            data-testid="link-stage"
          >
            <Theater className="w-4 h-4" />
            <span className="hidden sm:inline">Stage</span>
          </a>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3" data-testid="text-category-heading">
            Select Your Contract Type
          </h2>
          <p className="text-base text-muted-foreground" data-testid="text-category-description">
            Choose the category that best matches your work-for-hire agreement. This helps us apply the right analysis rules.
          </p>
        </div>

        <div className="grid gap-6 mb-8 animate-fade-in-up">
          {categories.map((category) => {
            const Icon = category.icon;
            
            const handleCategorySelect = () => {
              setCategory(category.id);
              navigate("/analyze");
            };
            
            return (
              <Tooltip key={category.id}>
                <TooltipTrigger asChild>
                  <Card
                    className="group hover-elevate active-elevate-2 cursor-pointer transition-colors duration-200 hover:border-primary/50"
                    onClick={handleCategorySelect}
                    data-testid={`card-category-${category.id}`}
                  >
                    <div className="p-8 flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold text-card-foreground mb-2" data-testid={`text-category-title-${category.id}`}>
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground" data-testid={`text-category-desc-${category.id}`}>
                          {category.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 flex-shrink-0 text-primary" data-testid={`button-select-${category.id}`} />
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p>Click to analyze a {category.title.toLowerCase()} contract</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {recentAnalyses.length > 0 && (
          <div className="mt-12" data-testid="section-recent-analyses">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3" data-testid="text-recent-heading">
              Recent Analyses
            </h2>
            <div className="grid gap-3 mb-3">
              {recentAnalyses.map((entry) => (
                <Card
                  key={entry.id}
                  className="hover-elevate active-elevate-2 cursor-pointer transition-colors duration-200 hover:border-primary/50"
                  onClick={() => navigate(`/analysis?saved=${entry.id}`)}
                  data-testid={`card-recent-${entry.id}`}
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-bold text-card-foreground" data-testid={`text-recent-category-${entry.id}`}>
                        {categories.find(c => c.id === entry.category)?.title ?? entry.category}
                      </h3>
                      <p className="text-sm text-muted-foreground" data-testid={`text-recent-date-${entry.id}`}>
                        Analyzed {new Date(entry.analyzedAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge className={riskBadgeConfig[entry.riskLevel].color} data-testid={`badge-recent-risk-${entry.id}`}>
                      {riskBadgeConfig[entry.riskLevel].label}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteEntry(e, entry.id)}
                      aria-label="Delete saved analysis"
                      data-testid={`button-delete-recent-${entry.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted-foreground" data-testid="text-vault-storage-note">
              Stored only in your browser · auto-deletes after 7 days
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            A free tool for the artistic community • 100% browser-based pattern matching • No data leaves your device
          </p>
        </div>
      </div>
    </div>
  );
}
