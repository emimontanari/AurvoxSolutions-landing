# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aura Solutions - An AI-powered restaurant automation landing page built with Next.js. The site is in Spanish and targets restaurant owners in need of business automation services.

**Live URL:** https://aurasolutions.ai

## Tech Stack

- **Next.js 16** with App Router and React Server Components
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4** (CSS-first configuration, no tailwind.config.js)
- **Shadcn/UI + Radix UI** for accessible components (New York style preset)
- **React Hook Form + Zod** for form handling
- **Vercel Analytics** for tracking

## Typography

- **Display & Body Font:** Outfit (Supabase style - geometric, modern)
- **Secondary Font:** Plus Jakarta Sans (paragraphs, detailed text)

## Common Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components
  - `ui/` - Shadcn/Radix UI primitives (56 components)
  - Root level - Page sections (hero.tsx, benefits.tsx, etc.)
- `hooks/` - Custom React hooks (use-toast.ts, use-mobile.ts)
- `lib/utils.ts` - Utility functions (cn helper for class merging)

### Page Composition

The landing page (`app/page.tsx`) is composed of modular sections in order:
Header → Hero → ChallengesResults → Benefits → Services → Process → WhyUs → CTASection → FAQ → Footer

### Styling Architecture

- **Color System:** OKLCH color space with Supabase emerald green primary (`oklch(0.4365 0.1044 156.7556)`) and bright emerald accent (`oklch(0.8003 0.1821 151.7110)`)
- Dark theme based on Supabase dark palette (`oklch(0.1822 0 0)` background)
- Custom CSS classes in `app/globals.css`:
  - Layout: `glass-header`, `section-gradient`, `section-divider`
  - Cards: `card-premium`, `card-dark`, `badge-premium`
  - Buttons: `btn-gradient`, `btn-outline-glow`
  - Effects: `glow-primary`, `glow-accent`, `glow-bg-primary`, `glow-bg-accent`
  - Patterns: `grid-pattern`, `dot-pattern`, `noise-overlay`
  - Typography: `gradient-text`, `gradient-text-white`, `gradient-text-accent`, `font-display`, `font-body`
  - Animation: `animate-fade-up`, `animate-fade-in`, `animate-glow-pulse`, `animate-float`, `animate-shimmer`, `animate-border-glow`
- Animation delays: `delay-75` through `delay-700` (increments of 75-100ms)

### Framer Motion Animation System

Located in `components/motion/scroll-animations.tsx`:

**Scroll-Triggered Components:**
- `ScrollReveal` - Reveals content on scroll with variants: fadeUp, fadeIn, slideLeft, slideRight, scaleUp
- `StaggerContainer` + `StaggerItem` - Orchestrated stagger animations for lists/grids
- `ParallaxSection` - Parallax scrolling effect
- `SectionTransition` - Fade in/out as sections enter/exit viewport
- `GlowOnScroll` - Dynamic glow effect based on scroll position
- `ScrollProgress` - Top progress bar showing scroll position

**Interactive Components:**
- `FloatingElement` - Continuous floating animation
- `MagneticHover` - Magnetic cursor effect on hover
- `TextReveal` - Word-by-word text animation
- `AnimatedCounter` - Animated number counter

**Usage:**
```tsx
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

<ScrollReveal variant="fadeUp" delay={0.2}>
  <h2>Title</h2>
</ScrollReveal>

<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>{item.content}</StaggerItem>
  ))}
</StaggerContainer>
```

### Component Patterns

- Server Components by default
- Client Components marked with `"use client"` only when interactivity is needed
- Import paths use `@/` alias (maps to project root)
- Shadcn/UI components configured via `components.json`

## Key Configuration Notes

- **next.config.mjs**: TypeScript errors ignored during build, images unoptimized
- **No testing framework** is configured
- **No environment variables** template exists
- Tailwind v4 uses CSS-first approach (configuration in `app/globals.css` via `@theme` directive)
