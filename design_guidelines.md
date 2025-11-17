# ShowBusiness: Contracts - Design Guidelines

## Visual Identity (MANDATORY)

### Color Palette
**These colors are non-negotiable and must be used throughout:**
- **Primary Background**: Deep, rich Velvet Red
- **Accent & Highlights**: Elegant, burnished Antique Gold (for buttons, borders, key highlights)
- **Secondary Elements**: Stark, metallic Steel Gray/Silver (for secondary UI elements, card backgrounds)
- **Primary Text**: Clean, high-contrast Off-White (for maximum readability)

### Logo
- **ShowBusiness Shield logo** must be prominently and cleanly displayed in the **top-left corner** on all screens
- Logo URL: https://ibb.co/qvFFLpT

### Design Philosophy
The entire interface must evoke: **prestige, security, and theatrical gravitas**. This is a sanctuary for artists, not a sterile utility tool. Think Old Hollywood meets modern security vault.

## Layout & Spacing

### Core Spacing System
Use Tailwind spacing units: **4, 6, 8, 12, 16** for consistent rhythm
- Button padding: `px-8 py-4`
- Section padding: `py-12` (mobile), `py-16` (desktop)
- Card spacing: `p-6` to `p-8`
- Element gaps: `gap-6` to `gap-8`

### Container Strategy
- Max-width containers: `max-w-4xl` for forms and primary content
- Full-width sections with inner constraints for stage selection screens
- Generous whitespace to emphasize theatrical elegance

## Typography

### Hierarchy
- **Headings**: Bold, commanding serif font (Playfair Display or Cinzel from Google Fonts)
  - H1: `text-4xl md:text-5xl font-bold` 
  - H2: `text-3xl md:text-4xl font-bold`
  - H3: `text-2xl md:text-3xl font-semibold`
- **Body Text**: Clean, highly readable sans-serif (Inter or Source Sans Pro)
  - Body: `text-base md:text-lg`
  - Small text: `text-sm`
- **Buttons**: `text-lg font-semibold tracking-wide uppercase`

## Component Design

### Stage 1: Contract Categorization Screen
Three large, prominent category buttons in a single-column or grid layout:
- Each button: Antique Gold border, Steel Gray background, generous padding
- Button text: Off-White, all caps
- Hover state: Slight gold glow effect, background brightens

### Stage 2: Document Ingestion Interface
Clean upload area with four distinct input methods:
- Camera button (mobile-optimized)
- PDF upload button
- Generic file upload button
- Large text paste area (Steel Gray background, Off-White text)
- All buttons: Antique Gold styling with hover tooltips
- Primary "Analyze Contract" CTA: Prominent Antique Gold button

### Stage 3 & 4: Analysis Report
Color-coded flag system:
- **Green Flags**: Subtle green accent with checkmark icons
- **Yellow Flags**: Amber/gold warning indicators
- **Red Flags**: Bright red danger indicators with warning icons
- Each flagged item displayed in expandable cards (Steel Gray background)
- "Get Revisions" buttons: Antique Gold, positioned next to each flag

### Interactive Elements

**Buttons**: 
- Primary (CTA): Antique Gold background, Velvet Red text, bold
- Secondary: Antique Gold border, transparent background, Off-White text
- All buttons include subtle shadow and hover scaling effect

**Tooltips**: 
- Steel Gray background with slight transparency
- Off-White text, small serif font
- Appear on hover with friendly, conversational copy

**The Vault Timer**: 
- Prominent countdown display in top-right corner
- Antique Gold numerals, Steel Gray background panel
- Include vault icon

## Accessibility & Privacy Messaging

### Privacy Banner
Large, reassuring message at top of first screen:
- "This tool runs entirely in your browser. No contract data is ever uploaded, saved, or seen by anyone."
- Steel Gray background panel, Off-White text, lock icon

### Legal Disclaimer
Display on every analysis report screen:
- "This is an AI-powered diagnostic and not a substitute for legal advice from a qualified attorney. I'm your very smart friend, not your lawyer."
- Subtle, smaller text but clearly visible

## Icons
Use **Font Awesome** (CDN) for all icons:
- Shield icons for security messaging
- Check/warning/danger icons for flag indicators  
- Upload/camera/document icons for input methods
- Clock/timer icons for vault countdown

## Images
No hero images required. This is a utility application focused on clarity and function within the theatrical visual identity.

## Mobile Responsiveness
- Single-column layouts on mobile
- Larger touch targets for buttons (min 48px height)
- Camera integration optimized for mobile devices
- Collapsible flag details for easier scanning on small screens