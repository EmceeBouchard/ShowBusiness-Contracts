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
      "work made for hire",
      "work-for-hire",
      "assigns all rights",
      "assign all right",
      "transfer of ownership",
      "convey all rights",
      "all right title and interest",
      "all intellectual property rights",
      "including all copyrights",
      "free and clear of any claims",
      "all rights in and to",
      "irrevocably assigns",
      "hereby assigns",
      "assigns to Company",
      "transfers to Company",
      "vests in Company",
      "sole and exclusive ownership",
      "work product belongs to"
    ],
    title: "Assignment of Rights",
    description: "This clause transfers full ownership of your creative work to the company — permanently. You are not licensing your work; you are selling it outright, including all future earning potential.",
    context: "Assignment clauses are common in work-for-hire agreements (e.g., corporate VO, branded content, gig platforms), but are often unnecessary for limited engagements or one-off performances. A fair agreement grants a license for a defined purpose — it does not strip you of ownership. Union agreements (SAG-AFTRA, WGA) protect artist ownership precisely because assignment is so valuable. The phrase 'work made for hire' has specific legal meaning under U.S. copyright law: it makes the company the legal 'author,' eliminating your moral rights entirely.",
    strategicNote: "Accept ONLY if: (1) the fee represents a genuine buyout value that accounts for all future uses, and (2) the work is low-visibility with minimal residual earning potential. Reject or renegotiate if: the work is high-profile, repeatable, or likely to generate ongoing revenue (ads, campaigns, series). Push back by proposing a limited license instead. You are selling future earning potential for a one-time check.",
    revisionTemplate: "Suggested revision: 'Artist grants Company a non-exclusive license to use the Work solely for [specific project/deliverable], for a period of [X years], in [specific media]. Artist retains all underlying rights, title, and ownership. Any use beyond the scope of this license requires separate written agreement and additional compensation.'"
  },
  {
    category: "perpetual_irrevocable_license",
    keywords: [
      "in perpetuity",
      "perpetual license",
      "irrevocable license",
      "perpetual and irrevocable",
      "without expiration",
      "no termination right",
      "cannot be revoked",
      "worldwide perpetual",
      "perpetual, irrevocable",
      "irrevocable, perpetual",
      "forever and irrevocably",
      "indefinite duration",
      "permanent and non-terminable",
      "throughout the universe",
      "for all time"
    ],
    title: "Perpetual Irrevocable License",
    description: "This is a functional buyout disguised as a license. They can use your work forever, in any context, and you can never legally revoke that permission — regardless of how the relationship ends or how the work is eventually used.",
    context: "Perpetual licenses are standard for major studio film/TV (they need lasting distribution rights) and established platforms like Spotify or Netflix. But they are RED FLAGS in independent projects, theatrical work, voice acting, and any context where the scope of future use is undefined. Most fair agreements cap the license at 3–7 years with renewal options and defined scope. 'Irrevocable' is the truly dangerous word — it means no exit, even if the company goes bankrupt, is acquired, or starts using your work in ways you find objectionable.",
    strategicNote: "Accept only if: (1) the upfront payment is substantial and explicitly accounts for perpetual value, AND (2) there is no AI, derivative works, or future-technologies clause attached. Otherwise, this is a red flag requiring negotiation. Propose a renewable fixed-term license instead. Even major studios routinely accept 7-year initial terms with renewals. You should never give away permanent rights in a one-time gig.",
    revisionTemplate: "Suggested revision: 'Company is granted a [3-year / 5-year] non-exclusive license to use the Work for [specific purpose and media]. This license is renewable upon mutual written agreement and additional compensation at Artist's then-current rate. Artist may terminate this license with [90 days] written notice if the Work is used outside the agreed scope.'"
  },
  {
    category: "future_technologies_clause",
    keywords: [
      "now known or hereafter",
      "hereafter developed",
      "future technologies",
      "any media now known or later developed",
      "in any medium whether now known",
      "technologies not yet invented",
      "future formats",
      "any and all media",
      "now existing or hereafter created",
      "any platform or medium",
      "all channels of distribution",
      "without limitation as to medium",
      "any technology now or hereafter",
      "by any means now known",
      "any device or medium",
      "all distribution channels",
      "any format now known",
      "media not yet conceived",
      "in any form throughout the universe"
    ],
    title: "Future Technologies Clause",
    description: "This is a blank check for the future. It authorizes the company to use your work in AI training, voice synthesis, virtual reality, holograms, deepfakes, the metaverse, or any technology that does not yet exist — without your consent, without notifying you, and without any additional payment.",
    context: "Future Technologies clauses were originally used by studios to cover format shifts (VHS → DVD → streaming). Post-2023, they are the primary legal vector for AI exploitation of performer likenesses and voices. SAG-AFTRA and WGA explicitly banned or restricted these clauses in their 2023 deals for this reason. If this clause appears in a voice, likeness, or performance agreement, it is almost certainly written to enable AI training and synthetic reproduction of your work. This is not hypothetical — it is already happening.",
    strategicNote: "CRITICAL: Do not sign without modification and legal review. This clause alone can enable your voice or likeness to be cloned without your knowledge. Insist on a specific, closed list of approved media (e.g., 'Broadcast Television, Streaming [Platform Name], Radio, Online Audio'). Add an explicit AI restriction. Any agreement that does not explicitly prohibit AI training, deepfakes, and synthetic recreation should be treated as permitting them.",
    revisionTemplate: "Suggested revision: 'License is strictly limited to the following specifically enumerated media: [e.g., Television Broadcast, Streaming via [Platform], Online Audio]. Any use in formats, technologies, or media not listed requires separate written negotiation and additional compensation. The following are explicitly excluded and prohibited without a separate signed agreement: AI training datasets, synthetic voice generation, text-to-speech systems, digital replica creation, deepfakes, hologram performances, virtual reality, augmented reality, and any AI-generated or AI-assisted reproduction of Artist's voice, likeness, or performance.'"
  },
  {
    category: "derivative_works",
    keywords: [
      "create derivative works",
      "prepare derivative",
      "create adaptations",
      "create compilations",
      "digitally alter",
      "synthetically recreate",
      "re-record",
      "remix",
      "edit, adapt",
      "modify, adapt",
      "alter your performance",
      "combine with other works",
      "incorporate into other works",
      "create a digital replica",
      "voice synthesis",
      "AI-generated version",
      "synthetic version of",
      "virtual likeness",
      "digital double"
    ],
    title: "Derivative Works & Alteration Clause",
    description: "This gives the company the right to modify, adapt, combine, re-record, or synthetically recreate your performance — without your involvement, approval, or additional payment. In 2024 and beyond, this is the legal basis for AI voice cloning and digital replica creation.",
    context: "Derivative works rights are standard in film and TV for legitimate editorial reasons (editing, cuts, reshoots, localization). But in voice work, commercial performance, and digital media, this clause becomes the mechanism for AI exploitation. Combined with a future technologies or perpetual license clause, it grants a legally defensible right to clone your voice or recreate your performance using AI. Independent producers rarely have a legitimate need for open-ended derivative rights — this is almost always a studio overreach.",
    strategicNote: "RED FLAG when combined with 'future technologies' language or any AI/synthetic terms. Even without AI language, insist on limiting derivatives to the specific original deliverable (e.g., 'the 30-second spot as delivered'). Require written approval for any material alteration. Never accept language that could allow synthetic recreation of your voice or likeness — this is how voice cloning contracts work.",
    revisionTemplate: "Suggested revision: 'Company may use the Work as delivered, without modification, adaptation, or alteration. Any derivative use — including editing, remixing, combining with other works, or any form of alteration — requires Artist's prior written consent and separate compensation at Artist's standard rate. The following are explicitly prohibited without a separate signed agreement: synthetic voice generation, AI remixing or reconstruction, digital replica creation, text-to-speech conversion of this performance, and any AI-assisted alteration of Artist's performance.'"
  },
  {
    category: "vague_purpose_clause",
    keywords: [
      "for any purpose",
      "for any and all purposes",
      "for any commercial purpose",
      "at Company's discretion",
      "as Company sees fit",
      "in any manner",
      "for any use",
      "in Company's sole judgment",
      "for broader development",
      "for any reason whatsoever",
      "without restriction",
      "for purposes determined by Company",
      "at Company's sole option",
      "for internal use",
      "in connection with any product"
    ],
    title: "Vague Purpose / Unlimited Use Clause",
    description: "This hides an unlimited usage license behind vague language. 'For any purpose' or 'at Company's discretion' means exactly that — your work can be used for anything, including advertising, merchandise, political campaigns, unrelated projects, or AI training, with no recourse for you.",
    context: "Vague purpose clauses are common in tech and platform agreements as intentional catch-alls. Courts have repeatedly ruled that 'promotional purposes' covers everything from social media to national advertising campaigns to product packaging. Union contracts (SAG-AFTRA, AEA, WGA) always enumerate specific permitted uses — the intentional vagueness here is not an oversight; it is a deliberate power grab. You own the ambiguity when you insist on specificity; they own it when you don't.",
    strategicNote: "Flag for negotiation — replace vague language with a specific, exhaustive list. Before signing, ask: Will my face or voice appear in advertising? On merchandise? In other projects not described here? In AI-generated content? The cost of asking is one email. The cost of not asking could be decades of unauthorized use. Specificity protects both parties.",
    revisionTemplate: "Suggested revision: 'Company may use the Work exclusively for [specific deliverable: e.g., the Series titled \"[Name],\" Season [X], Episodes [X–X], for streaming on [Platform] only]. Any additional uses beyond this specific scope — including promotional, advertising, marketing, or ancillary products — require Artist's prior written consent and separate licensing fees at Artist's standard rate.'"
  },
  {
    category: "expansive_partner_license",
    keywords: [
      "sublicensable",
      "assign to any party",
      "transfer to any third party",
      "sublicense to third parties",
      "assignable without consent",
      "freely transferable",
      "and their licensees",
      "successors and assigns",
      "any successor entity",
      "assigns and successors",
      "parent company and affiliates",
      "without Artist's consent",
      "may assign this agreement",
      "right to sublicense",
      "transfer rights to any entity"
    ],
    title: "Expansive Partner / Sublicense Clause",
    description: "This clause allows the company to hand your work to anyone — competitors, subsidiaries, parent companies, data brokers, AI companies, or random third parties — without notifying you or obtaining your consent. Once sublicensed, you have no visibility, no control, and no additional compensation.",
    context: "Sublicensing rights are standard for major studios and distributors (e.g., licensing content to Hulu, licensing VO to a foreign broadcast partner). But for independent projects and one-off gigs, broad sublicensing is a red flag. Your voice or likeness could end up in projects, campaigns, or AI training datasets you have never heard of. Control over sublicensing is a core negotiation point in every union agreement. Without it, your work can be laundered through shell companies or sublicensed to entities that are not bound by any of your original protections.",
    strategicNote: "Accept narrow sublicensing to specifically named affiliates only (e.g., 'Company's parent, [Parent Co.], and the streaming platform [Name], only'). Reject open-ended language. Require: written notice of any sublicense, that all sublicensees honor your original terms and compensation, and that you receive additional fees for sublicenses. This prevents your voice or performance from appearing in projects or datasets you never consented to.",
    revisionTemplate: "Suggested revision: 'This license is non-sublicensable and non-transferable without Artist's prior written consent. Company may not assign, transfer, or sublicense any rights granted herein to any third party. Any approved transfer must maintain all Artist protections, credit obligations, and compensation terms. Artist shall receive written notice of any approved sublicense within [30 days].'"
  },
  {
    category: "unilateral_modification_clause",
    keywords: [
      "reserve the right to modify",
      "may change these terms",
      "at our sole discretion",
      "modify without notice",
      "change terms at any time",
      "unilaterally amend",
      "may update this agreement",
      "Company may amend",
      "subject to change",
      "terms may be updated",
      "in its discretion",
      "without prior notice to Artist",
      "sole right to modify",
      "reserves the right to alter",
      "may revise this agreement"
    ],
    title: "Unilateral Modification Clause",
    description: "The 'God Clause.' This gives the company the power to rewrite the terms of the contract after you have already signed — including your compensation, usage rights, and obligations — without your agreement. A contract you cannot rely on to stay fixed is not a contract; it is a trap.",
    context: "Unilateral modification clauses are standard in platform Terms of Service (apps, websites) where they're arguably necessary — but they are legally and ethically inappropriate in service contracts with individual artists. They render the contract meaningless as a protective instrument. If they can change your compensation retroactively, your rate is whatever they decide it is. Courts in many jurisdictions are hostile to these clauses in employment and services contexts, but litigation is expensive. Prevention is far better.",
    strategicNote: "CRITICAL: Do not accept. Insist on mutual amendment language: any changes must be signed in writing by both parties, with at least 30 days' advance notice, and you retain the right to terminate if any changes are unacceptable. The specific protections you should insist on: they cannot reduce your compensation, they cannot expand usage rights beyond the original scope, and they cannot add obligations you did not agree to.",
    revisionTemplate: "Suggested revision: 'This agreement may only be modified by a written amendment signed by both parties. No modification is effective without Artist's written consent. Any proposed change must be provided to Artist at least [30 days] in advance. If any proposed change is unacceptable to Artist, Artist may terminate this agreement with [14 days] written notice with no penalty, retaining all compensation earned through the termination date.'"
  },
  {
    category: "indemnification_clause",
    keywords: [
      "Artist shall indemnify",
      "Performer shall indemnify",
      "you shall indemnify",
      "indemnify and hold harmless the Company",
      "indemnify Company from any and all",
      "indemnify against all claims",
      "including attorneys' fees",
      "all costs and expenses arising",
      "defend the Company from",
      "defend, indemnify, and hold",
      "at your own expense defend",
      "liability arising from your",
      "responsible for all claims against"
    ],
    title: "One-Sided Indemnification Clause",
    description: "This makes you personally liable for the company's legal problems. If they use your work improperly, get sued by a third party, or face claims arising from their own actions, you may be on the hook for their legal fees and any damages — potentially far exceeding what they paid you.",
    context: "Indemnification clauses are standard in contracts, but fairness lives in the details. A fair clause is mutual and narrowly scoped: each party indemnifies the other only for their own breach, negligence, or IP infringement. An unfair clause is one-directional (only you indemnify them), unlimited in scope (covers their own negligence and misuse), and includes legal fees. One-sided indemnification clauses have been used to force artists to pay for lawsuits they had no involvement in creating.",
    strategicNote: "Accept mutual, narrowly-scoped indemnification: you indemnify them only for claims that your Work infringes a third party's IP rights (and that is legitimately your fault). Reject: (1) one-sided indemnification (you indemnify, they don't), (2) unlimited scope (covering their negligence), (3) including attorney's fees without a cap. Absolute minimum: cap your indemnification at the total compensation you received. This is a financial ceiling that prevents a $500 gig from becoming a six-figure liability.",
    revisionTemplate: "Suggested revision: 'Each party shall indemnify, defend, and hold harmless the other party solely from claims arising from their own negligence, breach of this agreement, or willful misconduct. Artist's indemnification obligation is limited strictly to third-party claims that the Work, as delivered by Artist, directly infringes a third party's intellectual property rights. Artist's total indemnification liability is capped at the total gross compensation received under this agreement.'"
  },
  {
    category: "arbitration_clause",
    keywords: [
      "binding arbitration",
      "mandatory arbitration",
      "arbitration only",
      "arbitrator's decision is final",
      "waive right to jury trial",
      "waive your right to jury",
      "resolve through arbitration",
      "class action waiver",
      "no class action",
      "waive class action rights",
      "individual basis only",
      "AAA rules",
      "JAMS arbitration",
      "arbitration agreement",
      "disputes shall be arbitrated",
      "exclusively through arbitration",
      "arbitration is the sole remedy"
    ],
    title: "Mandatory Arbitration & Class Action Waiver",
    description: "This strips your right to sue in open court and prevents you from joining with other artists to pursue collective claims. Arbitration heavily favors repeat players (corporations with dedicated legal teams) over one-time participants (you), and decisions are rarely appealable.",
    context: "Mandatory arbitration with class action waivers is standard in tech/platform ToS, but courts and legislators in California, New York, and other states have moved to restrict or ban these clauses for individual workers and service providers. In arbitration, you lose: jury trial rights, public court records (everything is secret), the ability to appeal on legal errors, and access to collective action if many artists are similarly harmed. Companies use arbitration because they win more often and the process is far cheaper for them. The class action waiver is designed to prevent 100 similarly-wronged artists from banding together.",
    strategicNote: "Flag for legal review. If arbitration is non-negotiable, ensure: (1) arbitration is before a neutral forum (AAA or JAMS, not a company-selected arbitrator), (2) costs are shared equally (not all on you), (3) discovery rights are preserved, (4) you can still seek injunctive relief in court. The class action waiver is often the most dangerous element — insist on removing it. You have far more leverage as part of a group than alone.",
    revisionTemplate: "Suggested revision: 'Disputes arising from this agreement shall first be subject to good-faith negotiation between the parties for [30 days]. If unresolved, either party may pursue resolution in the state or federal courts located in [Artist's state/jurisdiction]. Both parties retain all legal rights and remedies, including the right to jury trial and the right to participate in class or collective actions.'"
  },
  {
    category: "no_credit_clause",
    keywords: [
      "no obligation to credit",
      "without obligation to provide credit",
      "may omit your name",
      "without attribution",
      "credit at Company's sole discretion",
      "no guaranteed credit",
      "credit is not guaranteed",
      "may be removed from credits",
      "no screen credit",
      "anonymous use",
      "without crediting Artist",
      "Company is not required to credit",
      "at Company's option to credit",
      "uncredited use",
      "right to omit credit"
    ],
    title: "No Credit / Attribution Clause",
    description: "This gives the company the right to use your work without ever crediting you by name — on the production, in marketing, or anywhere else. In show business, credits are professional currency. Losing them is not just a personal slight; it is a direct harm to your career, resume, and future earning power.",
    context: "Screen credit is a foundational right in union agreements. SAG-AFTRA, WGA, DGA, and AEA all have detailed, enforceable credit provisions because the industry understands that credits drive future work. Non-union agreements frequently omit credit guarantees or include discretionary language ('Company may credit Artist') because it costs companies nothing to grant credits but gives them leverage. The right to use your work without credit is sometimes a precursor to using it in contexts — like AI training data or third-party marketing — where crediting you would be awkward or impossible.",
    strategicNote: "Push for guaranteed, contractual screen credit in a specific form (e.g., '[Your Name]' in [size] type, in the [opening/closing] credits of each episode). Specify that this obligation survives any sublicense or assignment — the sublicensee must also credit you. For VO and commercial work, insist on at least a written record of your contribution. Credits are non-monetary compensation that compound over time; giving them away for free is a concession with long-term career costs.",
    revisionTemplate: "Suggested revision: 'Company shall provide Artist with screen/production credit in the following form: \"[Artist Name]\" (or professional name as designated by Artist), in [first/last position] in the [opening/closing] credits of each episode/production, in a size and style no less prominent than credits given to comparable contributors. This credit obligation is binding on any sublicensee or assignee. Artist shall have the right to review and approve credit language prior to publication.'"
  },
  {
    category: "exclusivity_clause",
    keywords: [
      "exclusively for Company",
      "sole and exclusive services",
      "shall not perform for",
      "shall not provide services to",
      "non-compete",
      "compete directly or indirectly",
      "during the term shall not",
      "exclusivity period",
      "exclusive services",
      "shall not engage in",
      "refrain from working for",
      "restricted from performing",
      "exclusive right to your services",
      "you agree not to work for",
      "exclusive engagement"
    ],
    title: "Exclusivity / Non-Compete Clause",
    description: "This restricts your ability to work for anyone else — potentially including competing productions, similar roles, or even your existing clients — during the term of this agreement. If there is no guaranteed minimum workload or compensation, you may be locked out of your livelihood without any guarantee of income from this company.",
    context: "Legitimate exclusivity clauses exist (a lead actor on a series cannot also be a lead on a competing series). But predatory exclusivity clauses are broad, under-compensated, and used to lock out talent without corresponding obligation. The danger signs are: (1) broad category definitions ('any entertainment work'), (2) long duration without guaranteed pay, (3) geographic scope covering everywhere, (4) no carve-outs for pre-existing clients. Union agreements include detailed exclusivity provisions with mandatory holdback pay when exclusivity is required.",
    strategicNote: "Negotiation is essential. Demand: (1) clear definition of what you are excluded from (not a catch-all), (2) exclusivity pay on top of your regular fee, (3) carve-outs for your existing clients and any projects in progress at the time of signing, (4) a duration cap — exclusivity beyond the actual production period is almost never legitimate. If they want you exclusively, they should pay for that privilege.",
    revisionTemplate: "Suggested revision: 'Artist's exclusivity under this agreement is limited solely to [specific, narrowly defined category, e.g., \"the role of [Character Name] in projects directly competitive with [Project Title] as defined herein\"]. Exclusivity applies only during [specific production period dates]. Artist is not restricted from any other work, including but not limited to pre-existing client commitments and non-competing work. Exclusivity compensation of [amount] is payable in addition to all other fees.'"
  },
  {
    category: "payment_contingency_clause",
    keywords: [
      "upon Company's sole satisfaction",
      "subject to Company's approval",
      "upon acceptance",
      "at Company's sole discretion",
      "contingent upon delivery",
      "upon greenlight",
      "subject to funding",
      "contingent upon production",
      "payment is not guaranteed",
      "no kill fee",
      "speculative basis",
      "on spec",
      "upon broadcast",
      "upon delivery and acceptance",
      "at Company's sole satisfaction",
      "if the project proceeds",
      "payment contingent on",
      "only if the project is completed"
    ],
    title: "Contingent Payment Clause",
    description: "Your payment depends on conditions you do not control — such as the company's 'satisfaction,' a funding decision, a broadcast deal, or whether the project 'proceeds.' If those conditions are not met (or if the company simply says they are not), you may do the work and receive nothing.",
    context: "Kill fees and approval-contingent payment structures are among the most commonly abused provisions in non-union entertainment agreements. A company can commission work, reject it under a vague satisfaction standard, and owe nothing. 'On spec' arrangements (working speculatively) are standard in some creative fields but deeply exploitative when applied to professional talent who should be paid for their time regardless of outcome. Union agreements require guaranteed payment upon delivery, with satisfaction disputes handled through a defined grievance process — not the company's unilateral judgment.",
    strategicNote: "Insist on a kill fee (typically 50% of total fee) payable if the project is cancelled or your work is not used. Reject any satisfaction standard that is purely subjective and controlled by the company. Payment should be tied to delivery of work (under an objective standard), not to the company's approval. If they need an approval right, that approval must be exercised within a defined window (e.g., 10 business days) and must be based on objective criteria (e.g., technical specs, agreed deliverables list).",
    revisionTemplate: "Suggested revision: 'Payment is due upon delivery of the Work meeting the following objective technical and creative specifications: [list specific deliverables]. Company shall have [10 business days] to accept or provide specific, actionable written feedback. If the project is cancelled for any reason other than Artist's uncured material breach, Artist is entitled to a kill fee of [50%] of the total contracted amount, payable within [30 days] of cancellation. Payment is not conditional on project completion, broadcast, funding, or any other event outside Artist's control.'"
  },
  {
    category: "no_residuals_clause",
    keywords: [
      "no residuals",
      "flat fee in full satisfaction",
      "full and final payment",
      "one-time payment constitutes full compensation",
      "no additional compensation regardless of use",
      "all-in fee",
      "buyout with no further obligation",
      "no further compensation due",
      "waive all residual rights",
      "no royalties or residuals",
      "full buyout",
      "this fee covers all uses",
      "no royalty obligation",
      "in lieu of any and all other compensation",
      "waiver of residuals"
    ],
    title: "Flat Buyout / No Residuals Clause",
    description: "Your one-time payment is declared the entire compensation for all uses of the work, forever — including reruns, streaming, international distribution, new platforms, and any revenue the company generates from your performance. If the project earns millions, you receive nothing beyond your initial check.",
    context: "Residuals — additional payments for re-use — are a cornerstone of union entertainment agreements and were created specifically because flat buyouts systematically undervalue performers' work. SAG-AFTRA, WGA, and DGA residual structures exist because studios discovered that a $5,000 buyout for a commercial that runs nationally for five years extracts immense value from a performer for a single check. Flat buyouts are appropriate when the scope of use is genuinely limited and the fee reflects that. They are predatory when the fee is low and the potential use is unlimited.",
    strategicNote: "Evaluate whether the flat fee genuinely reflects the likely total value of the work across all its uses. If the work is a local one-time project, a buyout may be appropriate. If it is a national ad campaign, a streaming production, or content with commercial replay potential, insist on residuals or a significantly higher buyout fee. At minimum, negotiate for a use-based escalation: additional compensation triggers if the work is used beyond the initially agreed scope (e.g., 'if used more than [X] times, additional fee of [Y] applies').",
    revisionTemplate: "Suggested revision: 'The fee paid under this agreement covers use of the Work for [specific initial use: e.g., one 13-week broadcast cycle in [Region]]. Any use beyond this initial scope — including but not limited to additional broadcast cycles, streaming, international distribution, new platform distribution, or any use beyond [X months] from initial release — shall require additional compensation to be negotiated in good faith at Artist's then-standard rate. Artist does not waive residual rights except as to the specific, enumerated initial use described herein.'"
  }
];

export const GREEN_FLAG_PATTERNS = [
  {
    keywords: ["SAG-AFTRA", "AFTRA", "actors equity", "AEA", "union contract", "guild agreement", "WGA", "DGA", "IATSE", "union scale", "union minimums"],
    title: "Union-Backed Agreement",
    description: "This contract references established union guidelines. Union agreements are generally the strongest legal protections available to performing artists, with mandatory minimums, residuals, and arbitration through your union rep."
  },
  {
    keywords: ["limited license", "specific use", "limited to", "solely for the purpose", "non-exclusive license", "limited to the following"],
    title: "Appropriately Limited License",
    description: "This clause restricts usage to specific, defined purposes — which is the standard structure for a fair licensing agreement. Specificity protects you by making unauthorized uses clearly identifiable."
  },
  {
    keywords: ["royalties", "residuals", "revenue share", "profit participation", "additional compensation for", "reuse fee"],
    title: "Ongoing Compensation Structure",
    description: "This contract includes provisions for ongoing payment when your work is reused — which is the industry standard for fair compensation in entertainment. Residuals and royalties acknowledge that your work continues to have value over time."
  },
  {
    keywords: ["artist retains", "artist shall retain", "artist reserves", "artist's prior written approval", "artist's written consent required", "subject to artist approval", "requires artist's consent"],
    title: "Artist Retains Control",
    description: "This clause preserves your control or approval rights over how your work is used. Approval rights are a hallmark of fair contracts that respect the artist's continued stake in their creative output."
  },
  {
    keywords: ["mutual indemnification", "each party shall indemnify", "both parties indemnify", "mutual obligation", "both parties agree to"],
    title: "Mutual Protections",
    description: "This indemnification is structured as a mutual obligation — both parties share liability for their own actions. This is the fair, standard structure that protects both sides equally."
  }
];
