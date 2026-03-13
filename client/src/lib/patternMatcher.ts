import type { ThreatCategory } from "@shared/schema";
import { THREAT_MATRIX, GREEN_FLAG_PATTERNS } from "./threatMatrix";

export interface DetectedThreat {
  category: ThreatCategory;
  severity: "red" | "yellow";
  title: string;
  clauseText: string;
  analysis: string;
  context: string;
  strategicNote: string;
  revisionSuggestion: string;
}

export interface DetectedGreenFlag {
  title: string;
  clauseText: string;
  analysis: string;
}

export interface AnalysisResult {
  threats: DetectedThreat[];
  greenFlags: DetectedGreenFlag[];
}

function extractClauseContext(text: string, matchIndex: number, matchLength: number): string {
  const contextRadius = 200;
  const start = Math.max(0, matchIndex - contextRadius);
  const end = Math.min(text.length, matchIndex + matchLength + contextRadius);

  let clause = text.substring(start, end).trim();

  if (start > 0) clause = "..." + clause;
  if (end < text.length) clause = clause + "...";

  return clause;
}

// Categories that are inherently red flags — the presence of this language is
// dangerous regardless of surrounding context. Do not require high-severity
// language elsewhere in the contract to escalate these.
const ALWAYS_RED_CATEGORIES: ThreatCategory[] = [
  "future_technologies_clause",
  "unilateral_modification_clause",
  "no_residuals_clause",
];

// Categories that are red when combined with high-severity indicators in the
// local clause context (not the entire contract).
const CRITICAL_CATEGORIES: ThreatCategory[] = [
  "assignment_of_rights",
  "perpetual_irrevocable_license",
  "indemnification_clause",
  "payment_contingency_clause",
];

// High-severity indicators that, when found near the matched clause, escalate
// a critical category to RED. We check the extracted clause text (local
// context), not the entire contract, to avoid false escalations.
const HIGH_SEVERITY_INDICATORS = [
  "perpetual",
  "irrevocable",
  "in perpetuity",
  "all rights",
  "work made for hire",
  "assign",
  "transfer",
  "binding arbitration",
  "waive",
  "forever",
  "any purpose",
  "sole discretion",
  "without limitation",
  "throughout the universe",
  "worldwide",
  "any and all",
];

// AI/synthetic terms that escalate to red when found anywhere in a VO or
// Film/TV contract combined with a high-risk category.
const AI_EXPLOITATION_TERMS = [
  "ai training",
  "artificial intelligence",
  "machine learning",
  "synthetic voice",
  "voice clone",
  "voice synthesis",
  "deepfake",
  "digital replica",
  "digital double",
  "text-to-speech",
  "voice synthesis",
  "virtual likeness",
  "ai-generated",
  "generative ai",
  "large language model",
];

// Mutual/bilateral language that indicates indemnification may be fair,
// reducing its severity from red to yellow.
const MUTUAL_LANGUAGE = [
  "each party",
  "both parties",
  "mutual",
  "mutually",
  "respectively",
  "party shall indemnify the other",
];

function clauseHasHighSeverityLanguage(clauseText: string): boolean {
  const lower = clauseText.toLowerCase();
  return HIGH_SEVERITY_INDICATORS.some(term => lower.includes(term));
}

function contractHasAILanguage(contractText: string): boolean {
  const lower = contractText.toLowerCase();
  return AI_EXPLOITATION_TERMS.some(term => lower.includes(term));
}

function indemnificationIsMutual(clauseText: string): boolean {
  const lower = clauseText.toLowerCase();
  return MUTUAL_LANGUAGE.some(term => lower.includes(term));
}

function calculateSeverity(
  pattern: typeof THREAT_MATRIX[0],
  contractText: string,
  clauseText: string,
  category: string,
  matchedKeywords: string[]
): "red" | "yellow" {

  // Always-red categories: these clauses are dangerous by definition.
  if (ALWAYS_RED_CATEGORIES.includes(pattern.category)) {
    return "red";
  }

  // AI exploitation check: for VO and Film/TV, certain categories become red
  // if the contract contains AI-related language anywhere — because those
  // categories are the vectors through which AI exploitation is structured.
  const aiRiskCategories: ThreatCategory[] = [
    "derivative_works",
    "future_technologies_clause",
    "perpetual_irrevocable_license",
    "expansive_partner_license",
    "assignment_of_rights",
    "vague_purpose_clause",
  ];
  const isAIRiskCategory = aiRiskCategories.includes(pattern.category);
  const isPerformanceCategory = category === "general_vo" || category === "film_tv" || category === "stage_theatre";

  if (isAIRiskCategory && isPerformanceCategory && contractHasAILanguage(contractText)) {
    return "red";
  }

  // Critical categories: RED if the extracted clause itself contains
  // high-severity language (we check the local clause, not the whole contract,
  // to avoid false escalations across unrelated sections).
  if (CRITICAL_CATEGORIES.includes(pattern.category)) {
    if (clauseHasHighSeverityLanguage(clauseText)) {
      return "red";
    }
    // Indemnification: stay yellow if the clause itself uses mutual language.
    if (pattern.category === "indemnification_clause") {
      if (indemnificationIsMutual(clauseText)) {
        return "yellow";
      }
      // One-sided indemnification with explicit artist-obligation language is red.
      const lower = clauseText.toLowerCase();
      if (lower.includes("artist shall indemnify") ||
          lower.includes("performer shall indemnify") ||
          lower.includes("you shall indemnify") ||
          lower.includes("defend the company")) {
        return "red";
      }
    }
  }

  // Exclusivity clause: RED if no carve-outs and covers broad categories of work.
  if (pattern.category === "exclusivity_clause") {
    const lower = clauseText.toLowerCase();
    const hasBroadScope = lower.includes("any entertainment") ||
                          lower.includes("any work") ||
                          lower.includes("any services") ||
                          lower.includes("without limitation");
    const hasNoCarveout = !lower.includes("except") && !lower.includes("carve") && !lower.includes("excluding");
    if (hasBroadScope && hasNoCarveout) return "red";
  }

  // Arbitration: RED if class action waiver is present (that's the most harmful element).
  if (pattern.category === "arbitration_clause") {
    const lower = clauseText.toLowerCase();
    if (lower.includes("class action waiver") || lower.includes("no class action") ||
        lower.includes("individual basis only") || lower.includes("waive class action")) {
      return "red";
    }
  }

  // No-credit clause: RED for on-camera, VO, and performance where credits
  // directly affect career advancement.
  if (pattern.category === "no_credit_clause") {
    if (category === "film_tv" || category === "stage_theatre") {
      return "red";
    }
  }

  // Expansive partner license: RED if explicitly transferable to "any party"
  // without any restriction.
  if (pattern.category === "expansive_partner_license") {
    const lower = clauseText.toLowerCase();
    if (lower.includes("any third party") || lower.includes("any party") ||
        lower.includes("without consent") || lower.includes("without artist")) {
      return "red";
    }
  }

  // Multiple matched keywords + high-severity language in the clause = RED.
  if (matchedKeywords.length >= 2 && clauseHasHighSeverityLanguage(clauseText)) {
    return "red";
  }

  return "yellow";
}

export function analyzeContract(
  contractText: string,
  category: string
): AnalysisResult {
  const threats: DetectedThreat[] = [];
  const greenFlags: DetectedGreenFlag[] = [];
  const detectedCategories = new Set<ThreatCategory>();

  for (const pattern of THREAT_MATRIX) {
    const matchedKeywords: string[] = [];
    let firstMatchIndex = -1;
    let firstMatchLength = 0;

    for (const keyword of pattern.keywords) {
      // Escape regex special chars. Use \b only at the start; many of our
      // keywords are multi-word phrases where a trailing \b would be
      // unreliable. The leading \b prevents matching mid-word.
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}`, "gi");
      const match = regex.exec(contractText);

      if (match) {
        matchedKeywords.push(keyword);
        if (firstMatchIndex === -1) {
          firstMatchIndex = match.index;
          firstMatchLength = match[0].length;
        }
      }
    }

    if (matchedKeywords.length > 0 && !detectedCategories.has(pattern.category)) {
      detectedCategories.add(pattern.category);

      const clauseText = firstMatchIndex >= 0
        ? extractClauseContext(contractText, firstMatchIndex, firstMatchLength)
        : `Contract contains language related to: ${matchedKeywords.slice(0, 3).join(", ")}`;

      const severity = calculateSeverity(pattern, contractText, clauseText, category, matchedKeywords);

      let analysis = pattern.description;
      if (matchedKeywords.length > 1) {
        analysis += ` Multiple concerning terms detected: ${matchedKeywords.slice(0, 4).join(", ")}.`;
      }

      // Add AI-specific warning for performance-based categories.
      const aiCriticalCategories: ThreatCategory[] = ["derivative_works", "future_technologies_clause"];
      if (
        (category === "general_vo" || category === "film_tv" || category === "stage_theatre") &&
        aiCriticalCategories.includes(pattern.category)
      ) {
        analysis +=
          " CRITICAL FOR VOICE/PERFORMANCE WORK: This language is a recognized legal basis for AI voice cloning, deepfakes, and synthetic recreation of your performance without your consent or additional compensation.";
      }

      threats.push({
        category: pattern.category,
        severity,
        title: pattern.title,
        clauseText,
        analysis,
        context: pattern.context,
        strategicNote: pattern.strategicNote,
        revisionSuggestion: pattern.revisionTemplate,
      });
    }
  }

  for (const greenPattern of GREEN_FLAG_PATTERNS) {
    const matchedKeywords: string[] = [];
    let firstMatchIndex = -1;
    let firstMatchLength = 0;

    for (const keyword of greenPattern.keywords) {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}`, "gi");
      const match = regex.exec(contractText);

      if (match) {
        matchedKeywords.push(keyword);
        if (firstMatchIndex === -1) {
          firstMatchIndex = match.index;
          firstMatchLength = match[0].length;
        }
      }
    }

    if (matchedKeywords.length > 0) {
      const clauseText = firstMatchIndex >= 0
        ? extractClauseContext(contractText, firstMatchIndex, firstMatchLength)
        : `Contract contains: ${matchedKeywords.join(", ")}`;

      greenFlags.push({
        title: greenPattern.title,
        clauseText,
        analysis: greenPattern.description,
      });
    }
  }

  // Sort: RED first, then YELLOW, preserving relative order within each group.
  threats.sort((a, b) => {
    if (a.severity === "red" && b.severity === "yellow") return -1;
    if (a.severity === "yellow" && b.severity === "red") return 1;
    return 0;
  });

  return { threats, greenFlags };
}
