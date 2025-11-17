import type { ThreatCategory } from "@shared/schema";
import { THREAT_MATRIX, GREEN_FLAG_PATTERNS } from "./threatMatrix";

export interface DetectedThreat {
  category: ThreatCategory;
  severity: "red" | "yellow";
  title: string;
  clauseText: string;
  analysis: string;
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
  const contextRadius = 150;
  const start = Math.max(0, matchIndex - contextRadius);
  const end = Math.min(text.length, matchIndex + matchLength + contextRadius);
  
  let clause = text.substring(start, end).trim();
  
  if (start > 0) clause = "..." + clause;
  if (end < text.length) clause = clause + "...";
  
  return clause;
}

function calculateSeverity(
  pattern: typeof THREAT_MATRIX[0],
  contractText: string,
  category: string,
  matchedKeywords: string[]
): "red" | "yellow" {
  const lowerText = contractText.toLowerCase();
  
  const highSeverityIndicators = [
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
    "sole discretion"
  ];
  
  const aiRelatedTerms = [
    "ai",
    "artificial intelligence",
    "machine learning",
    "synthetic",
    "voice clone",
    "deepfake",
    "digital replica"
  ];
  
  const hasHighSeverityLanguage = highSeverityIndicators.some(term => 
    lowerText.includes(term)
  );
  
  const isAIExploitative = (category === 'general_vo' || category === 'film_tv') &&
    (pattern.category === 'derivative_works' || 
     pattern.category === 'future_technologies_clause' ||
     pattern.category === 'perpetual_irrevocable_license' ||
     pattern.category === 'expansive_partner_license') &&
    aiRelatedTerms.some(term => lowerText.includes(term));
  
  if (isAIExploitative) return "red";
  
  const criticalCategories: ThreatCategory[] = [
    "assignment_of_rights",
    "perpetual_irrevocable_license",
    "unilateral_modification_clause",
    "indemnification_clause"
  ];
  
  if (criticalCategories.includes(pattern.category) && hasHighSeverityLanguage) {
    return "red";
  }
  
  if (matchedKeywords.length >= 2 && hasHighSeverityLanguage) {
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
  
  const lowerText = contractText.toLowerCase();
  
  for (const pattern of THREAT_MATRIX) {
    const matchedKeywords: string[] = [];
    let firstMatchIndex = -1;
    let firstMatchLength = 0;
    
    for (const keyword of pattern.keywords) {
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi');
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
        : `Contract contains language related to: ${matchedKeywords.slice(0, 3).join(', ')}`;
      
      const severity = calculateSeverity(pattern, contractText, category, matchedKeywords);
      
      let analysis = pattern.description;
      if (matchedKeywords.length > 1) {
        analysis += ` Detected multiple concerning terms: ${matchedKeywords.slice(0, 3).join(', ')}.`;
      }
      
      if ((category === 'general_vo' || category === 'film_tv') && 
          (pattern.category === 'derivative_works' || 
           pattern.category === 'future_technologies_clause')) {
        analysis += " ⚠️ CRITICAL FOR VOICE/PERFORMANCE WORK: This language could enable AI voice cloning, deepfakes, or synthetic recreation of your performance without your consent or additional compensation.";
      }
      
      threats.push({
        category: pattern.category,
        severity,
        title: pattern.title,
        clauseText,
        analysis,
        revisionSuggestion: pattern.revisionTemplate
      });
    }
  }
  
  for (const greenPattern of GREEN_FLAG_PATTERNS) {
    const matchedKeywords: string[] = [];
    let firstMatchIndex = -1;
    let firstMatchLength = 0;
    
    for (const keyword of greenPattern.keywords) {
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi');
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
        : `Contract contains: ${matchedKeywords.join(', ')}`;
      
      greenFlags.push({
        title: greenPattern.title,
        clauseText,
        analysis: greenPattern.description
      });
    }
  }
  
  threats.sort((a, b) => {
    if (a.severity === "red" && b.severity === "yellow") return -1;
    if (a.severity === "yellow" && b.severity === "red") return 1;
    return 0;
  });
  
  return { threats, greenFlags };
}
