# EI Policy & Procedures Course

Interactive early intervention policy and procedures training course.

## Purpose

Dynamic learning modules with knowledge checks, progress tracking, and certificate generation for different user roles.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, Framer Motion
- jsPDF + react-pdf (PDF handling)
- Vercel hosting

## Key Directories

```
src/
├── app/                              # Next.js App Router
│   ├── page.tsx                     # Home page
│   ├── course/[role]/[module]/      # Dynamic course modules
│   └── reference/                   # Reference materials
├── components/
│   ├── KnowledgeCheck.tsx          # Quiz component
│   ├── Certificate.tsx             # Completion certificate
│   ├── ProgressReport.tsx          # Progress tracking
│   └── PDFViewer.tsx               # PDF display
└── lib/
    ├── progress.ts                  # Progress utilities
    └── content.ts                   # Content management
public/                              # Static assets
```

## Commands

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint
```

## Important Notes

- Dynamic routing by role and module IDs
- Import alias: `@/*` -> `./src/*`
- Large PDF (18MB) in root: `earlyint-policy-manual 2026.pdf`
- Deployed on Vercel

## Session Learnings

<!-- Auto-updated by update-project-context hook -->

---
