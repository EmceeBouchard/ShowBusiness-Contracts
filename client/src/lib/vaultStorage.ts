import type { VaultEntry, ContractAnalysis } from "@shared/schema";

const VAULT_KEY = "showbusiness_contract_vault";
const VAULT_EXPIRY_DAYS = 7;

export function saveToVault(analysis: ContractAnalysis): VaultEntry {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + VAULT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  
  const entry: VaultEntry = {
    id: analysis.id,
    analysis,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  localStorage.setItem(VAULT_KEY, JSON.stringify(entry));
  return entry;
}

export function getFromVault(): VaultEntry | null {
  try {
    const stored = localStorage.getItem(VAULT_KEY);
    if (!stored) return null;

    const entry: VaultEntry = JSON.parse(stored);
    
    const expiryDate = new Date(entry.expiresAt);
    const now = new Date();
    
    if (now > expiryDate) {
      clearVault();
      return null;
    }

    return entry;
  } catch (error) {
    console.error("Error reading from vault:", error);
    return null;
  }
}

export function clearVault(): void {
  localStorage.removeItem(VAULT_KEY);
}

export function getTimeUntilExpiry(): number | null {
  const entry = getFromVault();
  if (!entry) return null;

  const expiryDate = new Date(entry.expiresAt);
  const now = new Date();
  const msRemaining = expiryDate.getTime() - now.getTime();

  return Math.max(0, msRemaining);
}

export function formatTimeRemaining(ms: number): string {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
