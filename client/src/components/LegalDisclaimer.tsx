import { AlertCircle } from "lucide-react";

export function LegalDisclaimer() {
  return (
    <div className="mt-8 pt-6 border-t border-border/50">
      <div className="flex items-start gap-3 text-sm text-muted-foreground">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" data-testid="icon-disclaimer" />
        <p data-testid="text-disclaimer">
          <strong>Legal Disclaimer:</strong> This is an AI-powered diagnostic and not a substitute for legal advice from a qualified attorney. 
          I'm your very smart friend, not your lawyer. Always consult with a licensed attorney before signing any contract.
        </p>
      </div>
    </div>
  );
}
