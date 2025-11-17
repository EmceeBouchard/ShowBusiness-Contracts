import { useState } from "react";
import { Shield, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface ConsentDialogProps {
  open: boolean;
  onConsent: () => void;
  onDecline: () => void;
}

export function ConsentDialog({ open, onConsent, onDecline }: ConsentDialogProps) {
  const [hasConsented, setHasConsented] = useState(false);

  const handleConsent = () => {
    if (hasConsented) {
      localStorage.setItem("gemini_consent", "true");
      onConsent();
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl" data-testid="dialog-consent">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <DialogTitle className="text-2xl font-serif" data-testid="text-consent-title">
              AI Analysis Consent Required
            </DialogTitle>
          </div>
          <DialogDescription className="text-base" data-testid="text-consent-description">
            Before analyzing your contract, please review and consent to how your data will be processed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="bg-card p-4 rounded-md border border-border">
            <h3 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              How This Works
            </h3>
            <ul className="text-sm text-card-foreground/90 space-y-2 ml-6 list-disc">
              <li>Your contract text will be sent to <strong>Google's Gemini AI</strong> for analysis</li>
              <li>Gemini analyzes the contract and identifies concerning clauses</li>
              <li>Results (including your contract text) are stored in your browser's local storage for 7 days</li>
              <li>Stored analyses are automatically purged after 7 days</li>
              <li>This tool does not send your contract data to our servers - only to Google Gemini</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-900">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">Important Notes</h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1 ml-6 list-disc">
              <li>Your contract will be transmitted to Google's servers</li>
              <li>Google's privacy policy and terms apply to this AI processing</li>
              <li>Do not analyze contracts containing highly sensitive or classified information</li>
              <li>This is a diagnostic tool, not legal advice - consult an attorney before signing</li>
            </ul>
          </div>

          <div className="flex items-start gap-3 p-4 bg-background rounded-md border border-border">
            <Checkbox 
              id="consent" 
              checked={hasConsented}
              onCheckedChange={(checked) => setHasConsented(checked as boolean)}
              data-testid="checkbox-consent"
            />
            <label 
              htmlFor="consent" 
              className="text-sm text-foreground cursor-pointer leading-relaxed"
              data-testid="label-consent"
            >
              I understand that my contract will be sent to Google Gemini AI for analysis, 
              and I consent to this processing. I have reviewed the privacy implications and 
              agree to proceed with the AI-powered analysis.
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={onDecline}
            data-testid="button-decline-consent"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConsent}
            disabled={!hasConsented}
            data-testid="button-accept-consent"
          >
            I Consent - Analyze Contract
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
