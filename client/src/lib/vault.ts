import type { ContractAnalysis, ContractCategory, ThreatFlag } from "@shared/schema";

// Browser-local vault for analysis history. Everything stays in
// localStorage — nothing ever leaves the device — and entries are
// purged after 7 days. Raw contract text is deliberately NOT stored;
// the report re-renders fully from the analysis results alone.

export interface VaultEntry {
  id: string;
  category: ContractCategory;
  analyzedAt: string;
  riskLevel: ContractAnalysis["overallRiskLevel"];
  flags: ThreatFlag[];
}

const VAULT_KEY = "showbusiness_vault_v1";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function readVault(): VaultEntry[] {
  try {
    const raw = localStorage.getItem(VAULT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is VaultEntry =>
        e &&
        typeof e.id === "string" &&
        typeof e.analyzedAt === "string" &&
        Array.isArray(e.flags) &&
        ["general_vo", "film_tv", "stage_theatre"].includes(e.category) &&
        ["safe", "caution", "danger"].includes(e.riskLevel)
    );
  } catch {
    return [];
  }
}

function writeVault(entries: VaultEntry[]): boolean {
  try {
    localStorage.setItem(VAULT_KEY, JSON.stringify(entries));
    return true;
  } catch {
    // Quota exceeded, private mode, storage disabled — degrade to no-vault.
    return false;
  }
}

function isExpired(entry: VaultEntry, now: number): boolean {
  const t = Date.parse(entry.analyzedAt);
  // Unparseable timestamps would never expire — treat them as expired.
  if (Number.isNaN(t)) return true;
  return now - t > MAX_AGE_MS;
}

export function purgeExpired(): void {
  try {
    const entries = readVault();
    const now = Date.now();
    const fresh = entries.filter((e) => !isExpired(e, now));
    if (fresh.length !== entries.length) writeVault(fresh);
  } catch {
    // no-vault fallback
  }
}

export function saveAnalysis(analysis: ContractAnalysis): boolean {
  try {
    const entry: VaultEntry = {
      id: analysis.id,
      category: analysis.category,
      analyzedAt: analysis.analyzedAt,
      riskLevel: analysis.overallRiskLevel,
      flags: analysis.flags,
    };
    const entries = readVault().filter((e) => e.id !== entry.id);
    entries.unshift(entry);
    return writeVault(entries);
  } catch {
    return false;
  }
}

export function loadAnalyses(): VaultEntry[] {
  try {
    purgeExpired();
    return readVault().sort((a, b) => Date.parse(b.analyzedAt) - Date.parse(a.analyzedAt));
  } catch {
    return [];
  }
}

export function loadAnalysis(id: string): VaultEntry | null {
  try {
    purgeExpired();
    return readVault().find((e) => e.id === id) ?? null;
  } catch {
    return null;
  }
}

export function deleteAnalysis(id: string): void {
  try {
    writeVault(readVault().filter((e) => e.id !== id));
  } catch {
    // no-vault fallback
  }
}

export function entryToAnalysis(entry: VaultEntry): ContractAnalysis {
  return {
    id: entry.id,
    category: entry.category,
    contractText: "",
    analyzedAt: entry.analyzedAt,
    flags: entry.flags,
    overallRiskLevel: entry.riskLevel,
  };
}
