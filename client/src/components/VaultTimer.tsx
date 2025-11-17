import { useEffect, useState } from "react";
import { Clock, Trash2 } from "lucide-react";
import { getTimeUntilExpiry, formatTimeRemaining, clearVault } from "@/lib/vaultStorage";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function VaultTimer() {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const remaining = getTimeUntilExpiry();
      setTimeRemaining(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);

    return () => clearInterval(interval);
  }, []);

  if (timeRemaining === null) {
    return null;
  }

  const handleClearVault = () => {
    if (confirm("Are you sure you want to delete your saved contract analysis?")) {
      clearVault();
      setTimeRemaining(null);
      window.location.reload();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-card border-2 border-primary/30 rounded-md px-4 py-2 shadow-lg">
        <Clock className="w-4 h-4 text-primary" data-testid="icon-vault-timer" />
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">Vault Expires In</span>
          <span className="text-sm font-bold text-primary font-mono" data-testid="text-vault-time">
            {formatTimeRemaining(timeRemaining)}
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 ml-2"
              onClick={handleClearVault}
              data-testid="button-clear-vault"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete saved analysis</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
