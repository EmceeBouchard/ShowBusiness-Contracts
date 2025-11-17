import { Mic, Film, Theater, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import type { ContractCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useContract } from "@/lib/contractContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logoImage from '@assets/showbusiness-shield-logo.jpg';

export default function CategorySelection() {
  const [, navigate] = useLocation();
  const { setCategory } = useContract();
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
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <img 
            src={logoImage} 
            alt="ShowBusiness Shield" 
            className="w-16 h-16 object-cover"
            data-testid="img-logo"
          />
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2" data-testid="text-app-title">
              ShowBusiness: Contracts
            </h1>
            <p className="text-lg text-foreground/80" data-testid="text-app-subtitle">
              Your Contract Analysis Shield
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3" data-testid="text-category-heading">
            Select Your Contract Type
          </h2>
          <p className="text-base text-foreground/80" data-testid="text-category-description">
            Choose the category that best matches your work-for-hire agreement. This helps us apply the right analysis rules.
          </p>
        </div>

        <div className="grid gap-6 mb-8">
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
                    className="hover-elevate active-elevate-2 cursor-pointer transition-all duration-200" 
                    onClick={handleCategorySelect}
                    data-testid={`card-category-${category.id}`}
                  >
                    <div className="p-8 flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-card border-2 border-accent flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2" data-testid={`text-category-title-${category.id}`}>
                          {category.title}
                        </h3>
                        <p className="text-sm text-card-foreground/80" data-testid={`text-category-desc-${category.id}`}>
                          {category.description}
                        </p>
                      </div>
                      <Button size="icon" className="flex-shrink-0 bg-accent text-primary hover:bg-accent/80" data-testid={`button-select-${category.id}`}>
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Click to analyze a {category.title.toLowerCase()} contract</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            A free tool for the artistic community • 100% browser-based pattern matching • No data leaves your device
          </p>
        </div>
      </div>
    </div>
  );
}
