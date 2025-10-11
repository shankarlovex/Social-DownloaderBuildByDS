# Social Downloader - Design Guidelines

## Design Approach
**System-Based with Visual Enhancement**: Material Design 3 principles adapted with vibrant, modern aesthetics. Balances utility-first functionality with engaging visual elements for a download tool that feels both professional and approachable.

## Core Design Principles
1. **Clarity First**: Every action and state must be immediately understandable
2. **Visual Feedback**: Rich progress indicators and state changes
3. **Vibrant Personality**: Colorful without compromising readability
4. **Seamless Theming**: Consistent experience across light/dark modes

---

## Color Palette

### Light Mode
- **Primary**: 264 89% 58% (vibrant purple-blue)
- **Primary Variant**: 264 89% 48% (deeper accent)
- **Background**: 0 0% 98% (soft white)
- **Surface**: 0 0% 100% (pure white)
- **Surface Variant**: 240 20% 96% (subtle gray)
- **Text Primary**: 220 13% 18% (near black)
- **Text Secondary**: 220 9% 46% (medium gray)
- **Success**: 142 71% 45% (green for completed downloads)
- **Error**: 0 72% 51% (red for failed states)

### Dark Mode
- **Primary**: 264 89% 68% (lighter purple-blue)
- **Primary Variant**: 264 89% 78% (accent highlight)
- **Background**: 220 13% 9% (deep dark)
- **Surface**: 220 13% 13% (elevated dark)
- **Surface Variant**: 220 13% 18% (card background)
- **Text Primary**: 0 0% 98% (near white)
- **Text Secondary**: 220 9% 65% (light gray)
- **Success**: 142 71% 55% (bright green)
- **Error**: 0 72% 61% (lighter red)

---

## Typography

**Font Stack**: 'Inter' for UI, 'JetBrains Mono' for technical data (URLs, file sizes)

### Hierarchy
- **Hero/Logo**: 3xl to 5xl, font-bold (900), tracking-tight
- **Page Title**: 2xl to 3xl, font-bold (700)
- **Section Headers**: xl to 2xl, font-semibold (600)
- **Body Text**: base to lg, font-normal (400)
- **Technical Info**: sm to base, font-mono (JetBrains Mono)
- **Labels/Captions**: xs to sm, font-medium (500)

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- **Component Padding**: p-6 to p-8
- **Section Gaps**: gap-4 to gap-8
- **Container Max Width**: max-w-4xl (centered layout for focused experience)
- **Card Elevation**: Subtle shadows with blur for depth

---

## Component Library

### 1. Splash Screen (Entry Animation)
- Full-screen gradient background (primary to primary-variant)
- Animated logo: Scale-up + fade-in (0.8s ease-out)
- "Social Downloader" text with stagger animation
- Progress dots below logo (pulsing animation)

### 2. Navigation/Header
- Sticky header with blur backdrop
- Logo on left, theme switcher on right
- Smooth color transitions on theme change
- Settings icon (gear) leading to modal

### 3. Main Download Interface

**URL Input Section**:
- Large, prominent input field with rounded-2xl corners
- Paste button integrated within input (right side)
- Real-time validation indicator (checkmark/error icon)
- Animated error messages below input

**Video Preview Card** (after validation):
- Thumbnail on left (16:9 ratio, rounded-lg)
- Video metadata on right: title (font-semibold), duration, channel name
- Subtle hover elevation effect

**Format Selection**:
- Tab interface for MP4/MP3 switch (pills design)
- Grid layout for quality options: 3 columns on desktop, 2 on tablet, 1 on mobile
- Each quality button as a card with:
  - Quality label (e.g., "1080p HD")
  - File size estimate
  - Recommended badge for optimal quality
  - Hover state with scale(1.02) transform

### 4. Download Progress Display
- Full-width progress bar with gradient fill (primary colors)
- Stats row displaying:
  - Percentage (large, font-bold)
  - Download speed (MB/s)
  - Time remaining
  - File size
- All stats in rounded cards with subtle background
- Animated icons for each metric

### 5. Notification Bar/History
- Slide-in from top with blur backdrop
- List of recent downloads with:
  - Video thumbnail (small, 48x48)
  - Title (truncated)
  - Status badge (success/failed/in-progress)
  - Quick action button (re-download/delete)
- Maximum 5 recent items, scrollable

### 6. Theme Switcher
- Segmented control: System | Light | Dark
- Smooth transitions (transition-all duration-300)
- Icon indicators for each mode
- Persists preference to localStorage

### 7. Settings Modal
- Centered modal with backdrop blur
- Sections:
  - **App Info**: Version number, large display
  - **Privacy Note**: Clear, concise text about usage
  - **Developer Credits**: Name, social handles (Instagram/X) with links
  - **Additional Settings**: Future download location, auto-quality
- Close button (X) top-right with hover rotate effect

---

## Animations
**Purposeful Motion Only**:
- Logo entrance: bounce effect
- Button interactions: scale(0.98) on active
- Card reveals: fade-up on scroll (if multiple sections)
- Progress bar: smooth width transition
- Theme switch: 300ms color interpolation
- Download complete: success checkmark with scale pop

---

## Images
**Hero Section**: Not applicable - utility-first interface leads with URL input
**Thumbnails**: Video previews dynamically loaded from YouTube API
**Logo**: Custom "Social Downloader" graphic with download arrow icon
**Icons**: Heroicons library for consistent iconography (download, settings, theme, social)

---

## Responsive Behavior
- **Desktop (lg+)**: Max-width container, 3-column quality grid
- **Tablet (md)**: 2-column grid, slightly reduced spacing
- **Mobile (base)**: Single column, full-width buttons, thumb-friendly touch targets (min 44px)

---

## Accessibility
- High contrast ratios maintained in both themes (WCAG AAA where possible)
- Focus indicators: 2px outline with primary color + offset
- Keyboard navigation support for all interactive elements
- ARIA labels for icon-only buttons
- Screen reader announcements for download progress

This design creates a vibrant, modern download tool that feels polished and professional while maintaining the clarity and efficiency users expect from a utility application.