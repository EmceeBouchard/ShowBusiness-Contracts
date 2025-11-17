# ShowBusiness: Contracts

## Overview

ShowBusiness: Contracts is a privacy-focused, client-side contract analysis tool designed specifically for artists (actors, voice-over talent, stage performers). The application analyzes work-for-hire agreements to identify potentially exploitative clauses using AI-powered threat detection. All contract analysis occurs entirely in the browser using Google's Gemini AI, with explicit user consent required before any data transmission. Analyzed contracts are stored locally in the browser for 7 days before automatic deletion.

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
- TanStack Query for server state (minimal usage since processing is client-side)
- Local browser storage for vault persistence

**UI Component Library**: shadcn/ui components built on Radix UI primitives, heavily customized to match the theatrical theme. Uses Tailwind CSS with extensive custom color variables defined in `index.css`.

**Typography**: 
- Headings: Playfair Display (serif, theatrical)
- Body text: Inter (sans-serif, readable)

### Data Processing Architecture

**Document Parsing**:
- PDF extraction: pdfjs-dist library
- DOCX extraction: mammoth library  
- TXT files: native browser File API
- All parsing occurs client-side with no server upload

**AI Analysis Pipeline**:
1. User must explicitly consent to sending data to Google Gemini (consent stored in localStorage)
2. Contract text + category sent to Google Gemini AI via `@google/genai` SDK
3. Gemini analyzes against predefined threat matrix (9 threat categories)
4. Response parsed into threat flags (red/yellow) and green flags (safe clauses)
5. Results stored in browser localStorage with 7-day expiry timestamp

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

### Local Storage Schema

**Vault Storage** (`showbusiness_contract_vault` key):
- Stores complete analysis results including contract text
- Auto-expires after 7 days (countdown timer visible in UI)
- Manual purge option available
- Schema defined in `shared/schema.ts` using Zod

**Consent Storage** (`gemini_consent` key):
- Boolean flag tracking whether user has consented to AI analysis
- Persists across sessions

### Backend Architecture

**Server Role**: Minimal Express server primarily serving static frontend assets. No contract processing occurs on the server.

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

### AI Services

**Google Gemini AI** (via Replit AI Integrations):
- Primary contract analysis engine
- API accessed through `@google/genai` SDK
- Credentials: `VITE_AI_INTEGRATIONS_GEMINI_API_KEY` and `VITE_AI_INTEGRATIONS_GEMINI_BASE_URL`
- User consent required before any API calls
- Contract text sent to Google servers for analysis
- Google's privacy policy applies to transmitted data

### Database (Configured but Unused)

**Neon Serverless PostgreSQL**:
- Configured via Drizzle ORM (`drizzle.config.ts`)
- Connection string: `DATABASE_URL` environment variable
- Schema defined in `shared/schema.ts` but not utilized
- Migrations output to `./migrations` directory
- Ready for future implementation of user accounts or cloud backup

### UI Component Libraries

**Radix UI**: Headless component primitives for accessible UI
- Dialog, Accordion, Checkbox, Dropdown, Select, Tooltip, Toast, and 20+ other components
- Full list in `package.json`

**Lucide React**: Icon library for UI icons

### Document Processing Libraries

**PDF.js** (`pdfjs-dist`): Client-side PDF text extraction
- Worker loaded from CDN: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`

**Mammoth.js**: DOCX to plain text conversion

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