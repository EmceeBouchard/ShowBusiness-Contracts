import type { ThreatCategory } from "@shared/schema";

export interface ThreatPattern {
  category: ThreatCategory;
  keywords: string[];
  title: string;
  description: string;
  revisionTemplate: string;
}

export const THREAT_MATRIX: ThreatPattern[] = [
  {
    category: "assignment_of_rights",
    keywords: [
      "assigns",
      "transfers",
      "work made for hire",
      "work-for-hire",
      "all rights",
      "assign all right",
      "transfer of ownership",
      "convey all rights"
    ],
    title: "Assignment of Rights",
    description: "This clause transfers ownership of your work. You're selling the property outright, not just licensing it.",
    revisionTemplate: "Suggested revision: 'Artist grants Company a non-exclusive license to use the Work for [specific purpose], with Artist retaining all underlying rights and ownership.'"
  },
  {
    category: "perpetual_irrevocable_license",
    keywords: [
      "perpetual",
      "irrevocable",
      "in perpetuity",
      "forever",
      "indefinite",
      "permanent license",
      "non-terminable"
    ],
    title: "Perpetual Irrevocable License",
    description: "This is functionally identical to a buyout. They can use your work forever without ever paying you again, and you can never revoke permission.",
    revisionTemplate: "Suggested revision: 'Company is granted a [3-year] license to use the Work, renewable upon mutual agreement and additional compensation. Artist may terminate with [90 days] written notice.'"
  },
  {
    category: "future_technologies_clause",
    keywords: [
      "hereafter developed",
      "now known or hereafter",
      "future technologies",
      "any media now known or later developed",
      "in any medium whether now known",
      "technologies not yet invented",
      "future formats"
    ],
    title: "Future Technologies Clause",
    description: "This is a blank check for the future. They can use your work in AI training, VR, metaverse, or technologies that don't even exist yet—without asking or paying you.",
    revisionTemplate: "Suggested revision: 'License is limited to media and technologies specifically listed: [Film, Television, Streaming]. Any use in formats developed after this agreement requires separate negotiation and compensation.'"
  },
  {
    category: "derivative_works",
    keywords: [
      "modify",
      "adapt",
      "create derivative works",
      "alter",
      "transform",
      "prepare derivative",
      "remix",
      "revise",
      "create adaptations"
    ],
    title: "Derivative Works Clause",
    description: "This is the 'voice clone' or 'remix' clause. They can modify, adapt, or create entirely new works based on yours without your involvement or additional payment.",
    revisionTemplate: "Suggested revision: 'Company may use the Work as delivered, without modification. Any adaptations, derivatives, or substantial alterations require Artist's written approval and separate compensation at Artist's standard rate.'"
  },
  {
    category: "vague_purpose_clause",
    keywords: [
      "for promotional purposes",
      "in connection with the platform",
      "for broader development",
      "for marketing",
      "for any purpose",
      "in support of",
      "related to the project"
    ],
    title: "Vague Purpose Clause",
    description: "Expansive usage rights hidden behind vague language. What exactly is 'promotional purposes'? This could mean anything from social media to billboards to product packaging.",
    revisionTemplate: "Suggested revision: 'Company may use the Work exclusively for [specific deliverable: Episode 3 of Series Name]. Any additional uses (promotional, marketing, ancillary products) require prior written consent and additional licensing fees.'"
  },
  {
    category: "expansive_partner_license",
    keywords: [
      "affiliated partners",
      "assignees",
      "sublicensable",
      "third parties",
      "licensees",
      "subsidiaries and affiliates",
      "transferable",
      "assign to any party"
    ],
    title: "Expansive Partner License",
    description: "This is a chain-of-custody failure. They can hand your work to anyone they want—competitors, subsidiaries, random third parties—and you have no control or visibility.",
    revisionTemplate: "Suggested revision: 'License is non-transferable and non-sublicensable. Company may not assign, transfer, or sublicense rights without Artist's prior written consent. Any approved transfers must maintain all Artist protections and compensation terms.'"
  },
  {
    category: "unilateral_modification_clause",
    keywords: [
      "reserve the right to modify",
      "may change these terms",
      "at our sole discretion",
      "modify without notice",
      "update this agreement",
      "change terms at any time",
      "unilaterally amend"
    ],
    title: "Unilateral Modification Clause",
    description: "The 'God Clause.' They can change the rules whenever they want, and you're just expected to accept it. This strips you of any contractual certainty.",
    revisionTemplate: "Suggested revision: 'This agreement may only be modified by written amendment signed by both parties. Any proposed changes must be provided to Artist [30 days] in advance, and Artist may terminate if changes are unacceptable.'"
  },
  {
    category: "indemnification_clause",
    keywords: [
      "indemnify and hold harmless the Company",
      "defend and indemnify",
      "hold harmless",
      "indemnify against all claims",
      "Artist shall indemnify"
    ],
    title: "Broad Indemnification Clause",
    description: "This makes you liable for their mistakes. If they use your work improperly and get sued, you're on the hook for their legal fees and damages.",
    revisionTemplate: "Suggested revision: 'Each party shall indemnify the other only for claims arising from their own breach, negligence, or willful misconduct. Artist's indemnification is limited to claims that the Work infringes third-party IP rights, capped at compensation received.'"
  },
  {
    category: "arbitration_clause",
    keywords: [
      "binding arbitration",
      "arbitration agreement",
      "waive right to jury trial",
      "resolve through arbitration",
      "arbitrator's decision is final",
      "mandatory arbitration",
      "arbitration only"
    ],
    title: "Mandatory Arbitration Clause",
    description: "This strips your right to sue in open court. Arbitration heavily favors corporations with deep pockets, and decisions can't be appealed.",
    revisionTemplate: "Suggested revision: 'Disputes shall first be negotiated in good faith. If unresolved, either party may pursue resolution in [your state] courts. Both parties retain all legal rights and remedies.'"
  }
];

export const GREEN_FLAG_PATTERNS = [
  {
    keywords: ["SAG-AFTRA", "equity", "union contract", "guild agreement", "WGA", "DGA"],
    title: "Union-Backed Agreement",
    description: "This contract appears to follow standard union guidelines. These are generally protective of artist rights."
  },
  {
    keywords: ["limited license", "specific use", "defined term", "royalties", "residuals"],
    title: "Fair Licensing Terms",
    description: "This clause includes reasonable limitations on usage, which is standard and fair for the industry."
  }
];
