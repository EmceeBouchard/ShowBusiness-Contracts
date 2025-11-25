import type { ThreatCategory } from "@shared/schema";

export interface ThreatPattern {
  category: ThreatCategory;
  keywords: string[];
  title: string;
  description: string;
  context: string;
  strategicNote: string;
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
    context: "Assignment of Rights clauses are common in work-for-hire agreements (like gig economy platforms, commercial voice work) but are rarely necessary for one-off performances or limited engagements. If they need perpetual ownership, that's a power grab—most fair agreements use limited licensing instead. Compare to union agreements, which typically protect artist ownership.",
    strategicNote: "Accept this if: (1) the fee reflects permanent buyout value, and (2) it's a low-profile gig where residual value is minimal. Flag for negotiation if: the fee doesn't account for future uses, or the work is high-profile with residual potential. Trade-off: You're selling future earning potential for immediate payment.",
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
    context: "Perpetual licenses are standard for big-budget film/TV productions and established platforms (Spotify, Netflix) because they need flexibility. But they're RED FLAGS for theatrical work, indie projects, or voice acting—especially if tied to derivative or AI technologies. Most fair agreements cap licenses at 3–7 years with renewal options.",
    strategicNote: "Accept only if: the upfront payment is substantial (accounting for perpetual value), AND there's no AI/derivative clause attached. Otherwise, RED FLAG—flag for legal review. You're essentially giving away your work forever. This severely limits your ability to re-license the same work elsewhere.",
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
    context: "Future Technologies clauses are becoming increasingly dangerous post-2023, with the rise of generative AI. Traditional media companies have used them for decades (to cover VHS→DVD→streaming evolution), but they now enable AI voice cloning and synthetic performance. This is a CRITICAL issue for voice actors and performers. SAG-AFTRA and WGA now explicitly restrict these clauses.",
    strategicNote: "CRITICAL: Flag for legal review—do not accept. This is the primary vector for AI exploitation. Insist on specific media list (Film, TV, Streaming) with explicit AI restrictions. Any agreement using your likeness/voice must explicitly prohibit AI training, deepfakes, and synthetic recreation. This is non-negotiable.",
    revisionTemplate: "Suggested revision: 'License is limited to media and technologies specifically listed: [Film, Television, Streaming]. Any use in formats developed after this agreement requires separate negotiation and compensation. Explicitly excluded: AI training, synthetic voice generation, deepfakes, and digital replicas.'"
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
    context: "Derivative works clauses are standard in film/TV (for editing, reshoots, cuts), but problematic for voice work and performance. Combined with AI clauses, this enables synthetic voice generation. Independent producers rarely need this power; it's typically a studio negotiating tactic. Fair agreements limit derivatives to the original project only.",
    strategicNote: "RED FLAG if this appears with 'future technologies' or AI language. Accept if: limited to the original project deliverable only, AND excludes synthetic/AI remixing. Reject if: open-ended or combined with perpetual licenses. Insist on approval rights for any material derivative. This is how your voice could be cloned.",
    revisionTemplate: "Suggested revision: 'Company may use the Work as delivered, without modification. Any adaptations, derivatives, or substantial alterations require Artist's written approval and separate compensation at Artist's standard rate. Explicitly excluded: synthetic voice generation, AI remixing, or performance alteration.'"
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
    context: "Vague purpose clauses are common in tech/platform agreements as catch-alls, but they're intentionally ambiguous. 'Promotional purposes' has been litigated; courts have ruled it covers everything from social media to merchandise. Union contracts (SAG, Equity) explicitly define allowed uses—this is how professional agreements protect you.",
    strategicNote: "Flag for negotiation—get specific. Replace 'promotional' with a defined list: 'social media trailer, behind-the-scenes only, not merchandisable.' Ask: Will my face/voice be used in ads? On merchandise? In other projects? Vague = they own the ambiguity, not you. Cost of closure: a single email asking for specifics.",
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
    context: "Sublicensing clauses are standard for studios (they need to share with distributors), but red flags for independent projects or one-off gigs. If a small production can sublicense your work, your work could end up in competitors' projects without your knowledge. Control over sublicensing is a core negotiating point.",
    strategicNote: "Negotiate for control. Accept 'affiliates only' if they define exactly who (e.g., parent company, Hulu/Disney only). Reject 'any third party.' Require: you're notified of sublicenses, sublicensees honor your original protections, and additional fees apply. This prevents your voice/likeness from appearing in projects you've never heard of.",
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
    context: "Unilateral modification clauses are common in terms-of-service (ToS) agreements for digital platforms, but legally questionable in service contracts with individuals. Tech companies use them to update policies; they rarely appear in fair creative contracts. This is essentially a 'we reserve the right to change anything' clause—it's a dealbreaker.",
    strategicNote: "CRITICAL: Flag for legal review—do not accept. This makes the contract meaningless because they can retroactively change terms. Insist on: bilateral amendment process, 30-day notice requirement, your right to terminate if terms become unacceptable. Non-negotiable: They cannot change your compensation or rights retroactively.",
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
    context: "Indemnification clauses are standard but heavily skewed in company agreements. Fair clauses are mutual and narrow (only your IP infringement). Unfair clauses make you liable for their misuse, negligence, or improper licensing. This is why insurance exists—but you can't insure against their mistakes.",
    strategicNote: "Accept limited, mutual indemnification (you indemnify only for your IP violations, they indemnify for their misuse). Reject if: one-sided (only you indemnify), unlimited (covers their negligence), or includes legal fees. This could bankrupt you. Absolute minimum: cap it at your total compensation received.",
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
    context: "Mandatory arbitration is standard in tech/platform ToS, but legally controversial for individual service contracts. Arbitration favors repeat players (corporations) over one-off participants (artists). You lose appeal rights, jury trials, and public precedent. Many jurisdictions (CA, NY) are restricting these clauses for workers.",
    strategicNote: "Flag for legal review—negotiate for mutual arbitration or court access. If accepted, ensure: arbitration is neutral (not company-friendly), costs are split equally, and you can appeal. Compare to union agreements—arbitration WITH your union rep is fair; unilateral company arbitration is not. Cost: attorney time to review.",
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
