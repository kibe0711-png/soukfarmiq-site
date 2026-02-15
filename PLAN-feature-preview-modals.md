# Plan: Interactive Feature Preview Modals

## Context
The FarmIQ marketing site has 6 feature cards that are currently static. The goal is to make each card clickable to open a modal showing a **mock preview** of what that feature looks like in the real FarmIQ app — interactive (tabs, toggles) but with no real database, purely static mock data.

## Approach
- **No new npm packages** — use native `<dialog>` element + Tailwind CSS for the modal and all UI
- Build 6 preview components with realistic mock data derived from the real Prisma schema
- Add shared reusable micro-components (tabs, status pills, toggles, bar charts)

## Files to Create

### `components/feature-previews/mock-data.ts`
All mock data with TypeScript types — worker names, task lists, harvest numbers, permissions, etc.

### `components/feature-previews/shared.tsx`
Reusable interactive components used across previews:
- **TabSwitcher** — horizontal tab bar
- **StatusPill** — colored badge (done/pending/missed)
- **ToggleSwitch** — on/off toggle for permissions
- **MiniBarChart** — pure CSS bar chart

### `components/feature-previews/FeaturePreviewModal.tsx`
Reusable `<dialog>`-based modal shell with:
- Backdrop click to close, Escape key support
- Slide-in animation, body scroll lock
- Header with feature icon, title, close button

### 6 Preview Components (one per feature card):

| Component | What it shows |
|-----------|--------------|
| `GanttSchedulingPreview.tsx` | 7-day grid with colored task bars, Labor/Nutrition tabs |
| `CompliancePreview.tsx` | Summary stats + checklist with green/red status indicators |
| `ProductionPlanningPreview.tsx` | 8-week harvest forecast table + visual bar chart |
| `LaborPayrollPreview.tsx` | Worker attendance table + payroll summary with RWF amounts |
| `HarvestPerformancePreview.tsx` | Pledged vs actual side-by-side bars + grade analysis |
| `RoleAccessPreview.tsx` | 5-role × 16-permission toggle matrix + role cards |

## Files to Modify

### `components/Features.tsx`
- Add `"use client"` directive
- Add `useState` for tracking which feature is open
- Make cards clickable with `cursor-pointer` + "Click to preview" hover text
- Render `FeaturePreviewModal` with the matching preview component

### `app/globals.css`
- Add `modal-in` and `fade-in` keyframes for dialog animations

## Implementation Order
1. `mock-data.ts` (pure data, no deps)
2. `shared.tsx` (reusable micro-components)
3. `FeaturePreviewModal.tsx` (modal shell)
4. 6 preview components (can be built sequentially)
5. Modify `Features.tsx` (wire everything together)
6. Modify `globals.css` (animations)

## Verification
- Run `npm run dev` and click each of the 6 feature cards
- Verify modal opens with correct preview content
- Test close via: X button, backdrop click, Escape key
- Test tab switching within each preview
- Test toggle switches in Role-Based Access
- Test on mobile viewport (modals should scroll internally)
- Run `npm run build` to ensure no build errors
