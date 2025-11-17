import { z } from "zod";

export const contractCategorySchema = z.enum(["general_vo", "film_tv", "stage_theatre"]);
export type ContractCategory = z.infer<typeof contractCategorySchema>;

export const flagSeveritySchema = z.enum(["green", "yellow", "red"]);
export type FlagSeverity = z.infer<typeof flagSeveritySchema>;

export const threatCategorySchema = z.enum([
  "assignment_of_rights",
  "perpetual_irrevocable_license",
  "future_technologies_clause",
  "derivative_works",
  "vague_purpose_clause",
  "expansive_partner_license",
  "unilateral_modification_clause",
  "indemnification_clause",
  "arbitration_clause"
]);
export type ThreatCategory = z.infer<typeof threatCategorySchema>;

export const threatFlagSchema = z.object({
  id: z.string(),
  category: threatCategorySchema,
  severity: flagSeveritySchema,
  title: z.string(),
  clauseText: z.string(),
  analysis: z.string(),
  revisionSuggestion: z.string().optional(),
});
export type ThreatFlag = z.infer<typeof threatFlagSchema>;

export const contractAnalysisSchema = z.object({
  id: z.string(),
  category: contractCategorySchema,
  contractText: z.string(),
  analyzedAt: z.string(),
  flags: z.array(threatFlagSchema),
  overallRiskLevel: z.enum(["safe", "caution", "danger"]),
});
export type ContractAnalysis = z.infer<typeof contractAnalysisSchema>;

export const vaultEntrySchema = z.object({
  id: z.string(),
  analysis: contractAnalysisSchema,
  createdAt: z.string(),
  expiresAt: z.string(),
});
export type VaultEntry = z.infer<typeof vaultEntrySchema>;

export const analyzeContractRequestSchema = z.object({
  contractText: z.string().min(50, "Contract text must be at least 50 characters"),
  category: contractCategorySchema,
});
export type AnalyzeContractRequest = z.infer<typeof analyzeContractRequestSchema>;

export const analyzeContractResponseSchema = contractAnalysisSchema;
export type AnalyzeContractResponse = z.infer<typeof analyzeContractResponseSchema>;
