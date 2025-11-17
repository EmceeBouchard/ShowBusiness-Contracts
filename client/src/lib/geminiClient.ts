import { GoogleGenAI } from "@google/genai";
import type { ThreatCategory } from "@shared/schema";

// Client-side Gemini integration - using Replit AI Integrations
// Contract text is sent to Google's Gemini AI servers for analysis (with user consent)
// Results (including contract text) are stored in browser localStorage for 7 days, then auto-purged
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_AI_INTEGRATIONS_GEMINI_API_KEY || "placeholder",
  httpOptions: {
    apiVersion: "",
    baseUrl: import.meta.env.VITE_AI_INTEGRATIONS_GEMINI_BASE_URL || "",
  },
});

interface AIThreat {
  category: ThreatCategory;
  severity: "red" | "yellow";
  title: string;
  clauseText: string;
  analysis: string;
}

interface AIGreenFlag {
  title: string;
  clauseText: string;
  analysis: string;
}

interface AIAnalysisResponse {
  threats: AIThreat[];
  greenFlags: AIGreenFlag[];
}

export async function analyzeContractClientSide(
  contractText: string,
  category: string
): Promise<AIAnalysisResponse> {
  const prompt = `You are a contract analysis expert specializing in work-for-hire agreements for artists (actors, writers, designers). Analyze the following contract and identify any concerning clauses.

Contract Category: ${category}

Focus on these threat categories:
1. Assignment of Rights - clauses that transfer ownership (keywords: "assigns", "transfers", "work made for hire")
2. Perpetual Irrevocable License - unlimited usage rights (keywords: "perpetual", "irrevocable", "in perpetuity")
3. Future Technologies Clause - blank check for new tech (keywords: "hereafter developed", "future technologies")
4. Derivative Works - ability to modify/remix (keywords: "modify", "adapt", "create derivative works")
5. Vague Purpose Clause - expansive usage (keywords: "for promotional purposes", "in connection with")
6. Expansive Partner License - sharing with third parties (keywords: "affiliated partners", "assignees", "sublicensable")
7. Unilateral Modification - changing terms later (keywords: "reserve the right to modify", "at our sole discretion")
8. Indemnification - artist liability for company mistakes (keywords: "indemnify and hold harmless the Company")
9. Arbitration - stripping court rights (keywords: "binding arbitration", "waive right to jury trial")

${category === 'general_vo' || category === 'film_tv' ? `
IMPORTANT: This is a ${category} contract. Pay EXTRA attention to clauses about:
- AI training and synthetic voice generation (derivative works)
- Future technologies and media formats
- Perpetual licenses that could enable AI voice cloning
- Sublicensable rights that could spread to AI companies
` : ''}

Also identify any GREEN FLAGS (positive clauses):
- Union-backed agreements (SAG-AFTRA, Equity, WGA, DGA)
- Fair licensing terms (limited license, specific use, defined term, royalties)

Contract Text:
${contractText}

Provide a detailed analysis in JSON format with the following structure:
{
  "threats": [
    {
      "category": "assignment_of_rights" | "perpetual_irrevocable_license" | etc.,
      "severity": "red" | "yellow",
      "title": "Brief title",
      "clauseText": "Exact clause from contract",
      "analysis": "Plain English explanation of why this is concerning"
    }
  ],
  "greenFlags": [
    {
      "title": "Brief title",
      "clauseText": "Exact clause from contract",
      "analysis": "Why this is a positive sign"
    }
  ]
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text || "{}";
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return {
      threats: [],
      greenFlags: []
    };
  }
}
