# ShowBusiness: Contracts

## Overview

ShowBusiness: Contracts is a **100% client-side** contract analysis tool designed specifically for artists (actors, voice-over talent, stage performers). The application analyzes work-for-hire agreements to identify potentially exploitative clauses using **pure JavaScript pattern matching**. All contract analysis occurs entirely in the browser with **zero external API calls** for analysis. Analyzed contracts are stored locally in the browser for 7 days before automatic deletion.

The application follows a theatrical, prestigious design aesthetic with a color palette of Velvet Red, Antique Gold, and Steel Gray, presenting contract analysis as a "sanctuary" rather than a sterile utility tool.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for client-side routing with three main pages:
- Category Selection (entry point)
- Document Ingestion (file/text upload)
- Analysis Report (results display)

**State Management**: 
- React Context API (`ContractProvider`) for sharing contract text and category across pages
- TanStack Query for any future server state needs (currently minimal usage)
- Local browser storage for vault persistence

**UI Component Library**: shadcn/ui components built on Radix UI primitives, heavily customized to match the theatrical theme. Uses Tailwind CSS with extensive custom color variables defined in `index.css`.

**Typography**: 
- Headings: Playfair Display (serif, theatrical) - loaded from Google Fonts CDN
- Body text: Inter (sans-serif, readable) - loaded from Google Fonts CDN

### Data Processing Architecture

**Document Parsing** (Client-Side):
- PDF extraction: pdfjs-dist library
- DOCX extraction: mammoth library  
- TXT files: native browser File API
- All parsing occurs client-side with no server upload

**Pattern Matching Analysis Pipeline** (100% Local):
1. User uploads/pastes contract text → stored in React Context (in-memory)
2. User clicks analyze → `analyzeContract()` function in `patternMatcher.ts`
3. **Pure JavaScript regex and keyword matching** scans for threat patterns
4. Severity calculated based on:
   - High-severity keyword indicators
   - Critical threat categories
   - AI exploitation detection (for General/VO and Film/TV categories)
5. Results include threat flags (red/yellow) and green flags (safe clauses)
6. Results stored in browser localStorage with 7-day expiry timestamp

**NO EXTERNAL AI CALLS**: All analysis happens locally using regex pattern matching against the threat matrix.

**Threat Detection**: Custom threat matrix in `client/src/lib/threatMatrix.ts` defines patterns for:
- Assignment of Rights
- Perpetual Irrevocable License
- Future Technologies Clause
- Derivative Works
- Vague Purpose Clause
- Expansive Partner License
- Unilateral Modification Clause
- Indemnification Clause
- Arbitration Clause

**Green Flag Detection**: Positive patterns for:
- Union-backed agreements (SAG-AFTRA, WGA, DGA, Equity)
- Fair licensing terms (limited license, residuals, royalties)

### Local Storage Schema

**Vault Storage** (`showbusiness_contract_vault` key):
- Stores complete analysis results including contract text
- Auto-expires after 7 days (countdown timer visible in UI)
- Manual purge option available
- Schema defined in `shared/schema.ts` using Zod

### Backend Architecture

**Server Role**: Minimal Express server primarily serving static frontend assets. **Zero contract processing occurs on the server.**

**Database**: Drizzle ORM configured with PostgreSQL (via Neon serverless) but currently unused. Schema exists in `shared/schema.ts` but no database operations are implemented. The application is designed to be fully client-side.

**Storage Interface**: In-memory storage implementation exists (`server/storage.ts`) but is not actively used. Prepared for potential future user accounts or cloud sync features.

### Design System

**Color Palette** (mandated by `design_guidelines.md`):
- Primary Background: `hsl(344 65% 30%)` - Velvet Red
- Accent/Highlights: `hsl(45 50% 58%)` - Antique Gold
- Secondary Elements: `hsl(220 8% 70%)` - Steel Gray
- Primary Text: `hsl(60 20% 96%)` - Off-White

**Spacing System**: Tailwind units 4, 6, 8, 12, 16 for consistent rhythm

**Component Variants**: Custom button and card variants using class-variance-authority to maintain theatrical aesthetic

## External Dependencies

### Styling CDN

**Google Fonts**: 
- Playfair Display (serif headings)
- Inter (sans-serif body text)
- Loaded from Google Fonts CDN for optimal typography
- **NOTE**: This is the ONLY external network call - purely for styling, not data processing

### UI Component Libraries

**Radix UI**: Headless component primitives for accessible UI
- Dialog, Accordion, Checkbox, Dropdown, Select, Tooltip, Toast, and 20+ other components
- Full list in `package.json`

**Lucide React**: Icon library for UI icons

### Document Processing Libraries (Client-Side)

**PDF.js** (`pdfjs-dist`): Client-side PDF text extraction
- Worker loaded from CDN: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`

**Mammoth.js**: DOCX to plain text conversion (client-side)

### Development Tools

**Replit Plugins**:
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development banner

### Form Validation

**Zod**: Schema validation for contract data types
- Used with `drizzle-zod` for database schema validation
- Type-safe schema definitions in `shared/schema.ts`

**React Hook Form**: Form state management (via `@hookform/resolvers` integration)

### Styling

**Tailwind CSS**: Utility-first CSS framework with extensive custom configuration
- Custom color system mapped to HSL values
- Custom spacing, border radius, and shadow tokens

**date-fns**: Date formatting for vault expiry display

## Recent Changes (November 2025)

### Removed Google Gemini AI Integration

Previously, the application used Google's Gemini AI for contract analysis (with user consent). This has been completely replaced with:
- **Pure JavaScript pattern matcher** (`client/src/lib/patternMatcher.ts`)
- Regex-based keyword detection
- Local severity calculation
- **Zero external API calls for analysis**

**Deleted Components**:
- `client/src/lib/geminiClient.ts` - Gemini API integration
- `client/src/components/ConsentDialog.tsx` - User consent for AI analysis
- `client/src/components/PrivacyBanner.tsx` - Privacy warnings about Gemini
- `@google/genai` package dependency

**Updated Messaging**:
- Removed all references to "AI-powered" analysis
- Removed consent requirement (no longer needed)
- Updated footer: "100% browser-based pattern matching • No data leaves your device"
- Updated HTML meta: "pattern-based threat detection"

### Privacy Architecture (Current)

**User Flow**:
1. User selects category → stored in React Context (in-memory)
2. User uploads contract → stored in React Context (in-memory)
3. User clicks analyze → `patternMatcher.ts` runs synchronously in browser
4. Results displayed instantly (no loading delay for API calls)
5. Results stored in localStorage vault with 7-day auto-purge

**Data Privacy**:
- ✅ **100% browser-based processing**
- ✅ **Zero contract data sent to external services**
- ✅ **No consent dialogs needed** (all local)
- ✅ **localStorage-only storage** (7-day auto-purge)
- ✅ **Static deployment ready** (no backend required for analysis)

**External Network Calls**:
- Google Fonts CDN (typography only)
- PDF.js worker CDN (document parsing only)
- NO analytics, NO tracking, NO AI services

## Deployment Considerations

This application can be deployed as **pure static files** to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

The Express server is optional and only needed if you want to serve the files yourself. All contract analysis happens 100% client-side.
