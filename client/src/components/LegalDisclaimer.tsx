import { AlertCircle } from "lucide-react";

export function LegalDisclaimer() {
  return (
    <div className="mt-8 pt-6 border-t border-border/50">
      <div className="flex items-start gap-3 text-sm" style={{ color: 'hsl(0, 0%, 100%)' }}>
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" data-testid="icon-disclaimer" style={{ color: 'hsl(0, 0%, 100%)' }} />
        <p data-testid="text-disclaimer">
          <strong>Legal Disclaimer:</strong> This is a pattern-based diagnostic and not a substitute for legal advice from a qualified attorney. 
          I'm your very smart friend, not your lawyer. Consult with a licensed attorney if you have further questions.
        </p>
      </div>
    </div>
  );
}
