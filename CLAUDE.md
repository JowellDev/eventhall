# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (TypeScript errors ignored, see next.config.mjs)
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint auto-fix
pnpm format       # Prettier format all files
pnpm format:check # Prettier check
```

No test suite is configured.

## Architecture

### Single-page role-based UI

The entire app renders from a single route (`app/page.tsx`). There is no routing between views — role selection happens via a login modal, and the active `Role` state (`'client' | 'owner' | 'admin' | null`) determines which top-level component mounts:

- `null` → `<ClientPage>` (landing/unauthenticated view) + `<LoginModal>`
- `'client'` → `<ClientPage isAuthenticated={true}>`
- `'owner'` → `<OwnerDashboard>`
- `'admin'` → `<AdminDashboard>`

### Mock data only

There is no backend or API. All data lives in `lib/mock-data.ts` (halls, bookings, packages, `formatPrice`). The login modal hard-codes three demo accounts (`client@eventhalls.com`, `owner@eventhalls.com`, `admin@eventhalls.com`) inside `components/auth/login-modal.tsx`.

### Component organization

Components are co-located by role/feature under `components/`:

- `components/client/` — landing page and header for unauthenticated/client users
- `components/owner/` — owner dashboard with tabs (overview, bookings, halls, stats)
- `components/admin/` — admin dashboard with tabs (overview, halls, owners, analytics)
- `components/booking/` — multi-step booking modal (4 steps: datetime → packages → review → confirmation), driven by `hooks/use-booking.ts`
- `components/halls/` — hall card, hall grid, hall detail modal, search bar
- `components/auth/` — login modal
- `components/shared/` — cross-role components: `AppLogo`, `DashboardHeader`, `KpiCard`, `StatusBadge`, `BarChart`
- `components/ui/` — shadcn/ui primitives (do not edit manually; use `pnpm dlx shadcn@latest add <component>`)

### Styling

- Tailwind CSS v4 with `tw-animate-css`; config is CSS-only in `app/globals.css` (no `tailwind.config.ts`)
- Fixed dark theme: gold (`#d4af37` / `--gold`) on black (`#0a0a0a`). No light mode variant — `:root` defines everything, no `.dark` class toggle
- Custom CSS variables: `--gold`, `--gold-light`, `--gold-dark`, `--surface`, `--surface-raised`, `--surface-overlay`
- Font: Montserrat loaded via `next/font/google`, mapped to `--font-sans`
- Prettier sorts Tailwind classes automatically via `prettier-plugin-tailwindcss`

### Path aliases

`@/` maps to the repo root. Key paths: `@/components`, `@/lib`, `@/hooks`, `@/types`.

### Types

All domain types (`Role`, `Hall`, `Booking`, `BookingStatus`, `Package`, `BookingFormData`) are defined in `types/index.ts`.

### Demo credentials

| Role   | Email                 | Password   |
| ------ | --------------------- | ---------- |
| client | client@eventhalls.com | Client@123 |
| owner  | owner@eventhalls.com  | Owner@123  |
| admin  | admin@eventhalls.com  | Admin@123  |
