import { Shield, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PrivacyBanner() {
  return (
    <Card className="p-6 mb-8 border-2 border-primary/30">
      <div className="flex items-start gap-4">
        <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" data-testid="icon-shield" />
        <div>
          <p className="text-base font-semibold text-foreground mb-2" data-testid="text-privacy-title">
            Privacy & AI Analysis
          </p>
          <p className="text-sm text-foreground/90 mb-2" data-testid="text-privacy-message">
            To analyze your contract for threats, this tool sends your contract text to Google's Gemini AI servers. 
            Your explicit consent is required before any data transmission.
          </p>
          <div className="flex items-start gap-2 text-xs text-foreground/80 bg-background/30 rounded p-2">
            <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <p>
              <strong>What happens to your data:</strong> Contract text is sent to Google Gemini for analysis. 
              Results (including your contract text) are stored in your browser's local storage for 7 days, then automatically purged. 
              We don't send your contract to our servers - only to Google Gemini. 
              Google's privacy policy applies to the AI analysis.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
