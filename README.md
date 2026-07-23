# TechBox Raffle Admin

Admin dashboard for a nationwide digital raffle platform (UI assessment).

**Live:** [https://assessment-2026.vercel.app/](https://assessment-2026.vercel.app/)  
**Repo:** [github.com/bakemonostan/assessment-2026](https://github.com/bakemonostan/assessment-2026)

---

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

### Demo login

Auth is mocked. **Any email + password (≥ 6 characters) works.**

On the login form, pick a role:

| Role | Access |
|------|--------|
| **Admin** | Full access, including Draw Management |
| **Support** | Dashboard, Participants, Winners (no Draws; revenue card/chart hidden) |

Session is stored in `localStorage`. Use **Log out** in the sidebar to clear it.

---

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives)
- **TanStack Query** — server state, loading / error handling
- **TanStack Table** — searchable, sortable, filterable, paginated tables
- **React Hook Form** + **Zod** — forms and validation
- **Axios** — HTTP client against `/api/*`
- **Recharts** — dashboard charts
- **next-themes** — light / dark / system
- **Sonner** — toasts
- **MSW** (optional in browser) + **Next.js route handlers** — mock API

No real backend. Data lives in in-memory stores under `mocks/data/`.

---

## Screens

1. **Login** — email, password, remember me, forgot password, sign in  
2. **Dashboard** — stats cards, ticket sales + revenue charts, recent winners  
3. **Draw Management** — table with view / edit / cancel, search + status filter (admin only)  
4. **Participants** — searchable / sortable / filterable table  
5. **Winners** — list + **Winner Details** (`/winners/[id]`) with personal info, ticket, prize, payment & verification status, audit timeline, supporting documents  
6. **Mobile** — responsive shell; sidebar on desktop, bottom tab bar on small screens  

---

## Folder structure (feature-based)

```text
app/                    # Routes only (thin pages + API handlers)
  (auth)/               # Login, forgot password
  (dashboard)/          # Protected dashboard routes
  api/                  # Mock REST endpoints

features/               # Domain modules
  auth/
  dashboard/
  draws/
  participants/
  winners/
    components/
    hooks/
    services/
    types/
    utils/

components/
  ui/                   # Design-system primitives (shadcn)
  shared/               # Cross-feature UI (layout, DataTable, modals)
  forms/                # Shared RHF field wrappers

mocks/                  # Seed data, stores, MSW handlers
lib/                    # API client, query keys, CSV util, helpers
```

**Why feature-based:** each screen owns its UI, hooks, API calls, and types. Routes stay thin. Shared pieces only live in `components/` when more than one feature needs them.

---

## Component design

| Layer | Responsibility |
|-------|----------------|
| `components/ui` | Low-level primitives (Button, Dialog, Table, …) |
| `components/shared` | Reusable product building blocks — `DataTable`, modals, layout shell |
| `components/forms` | Consistent form fields on top of React Hook Form |
| `features/*/components` | Screen-specific composition (columns, toolbars, pages) |

**DataTable** is a compound component (`Search`, `Filters`, `Export`, `ViewOptions`, pagination). Features pass columns + data; they don’t reimplement table chrome.

**Modals** are controlled (`open` / `onOpenChange`). Parents own mutations; modals stay presentational.

---

## Architecture decisions

1. **Mock API via Next route handlers** (`app/api/*`) so the UI always calls real HTTP paths (`/api/draws`, `/api/winners`, …). Swapping to a real backend later means changing the base URL / handlers, not rewriting screens.

2. **Axios + TanStack Query** for fetching and mutations — loading, error, and cache invalidation stay consistent across tables.

3. **Client-side session** (`localStorage`) — enough for a UI assessment; no JWT or server session.

4. **Lightweight RBAC** — role on the session object + nav `roles` filter + `RequireAdmin` on draws. No CASL / permission engine.

5. **Cancel draw ≠ delete** — cancel sets status to `cancelled` via `PATCH`, matching the brief’s “Cancel” action.

6. **Winner details need a dynamic route**; draws/participants stay list-first (actions/modals where needed). Row click on winners navigates to `/winners/[id]`.

---

## Assumptions

The brief doesn’t specify everything. These are the product/engineering calls made to ship a coherent demo:

| Assumption | Detail |
|------------|--------|
| Auth is mocked | Any valid form credentials sign you in; no password check against a user store |
| Two roles | `admin` and `support` (chosen at login) to demo role-based navigation |
| Currency | NGN for prizes / spend / revenue |
| Participants status | `active` / `inactive` / `suspended` |
| Winner payment vs verification | Separate fields (brief lists both) |
| Support can’t manage draws | Draws nav + route gated; revenue metrics hidden on dashboard |

---

## Bonus features included

- Dark mode + theme switcher  
- Role-based navigation  
- Pagination  
- Skeleton loaders  
- Toast notifications  
- Export to CSV  
- Loading / empty / error states on tables  

