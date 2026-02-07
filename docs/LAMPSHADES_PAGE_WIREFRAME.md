# Lampshades Only Page – Wireframe

## Goal
- Dedicated page to sell **only lampshades**.
- Compatibility clear (Bullet vs CoreMount); no confusion.
- Simple, systematic experience.

---

## Layout (Desktop)

```
+--------------------------------------------------------------------------------------------------+
|  NAVBAR                                                                                          |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  [Lampshades Only]                                                                               |
|  This page is only lampshades.                                                                   |
|  Copy: Mix and match… Each lampshade works with one system (Bullet or CoreMount).                |
|                                                                                                  |
|  +-------------------------------------------------------------------------------------------+   |
|  | ⓘ System not included. System must be purchased separately.                              |   |
|  +-------------------------------------------------------------------------------------------+   |
|                                                                                                  |
|  Filter: [All Systems] [Bullet System] [CoreMount System]                                        |
|                                                                                                  |
|  +----------------+  +----------------+  +----------------+  |  +------------------------+   |
|  | [LAMPSHADE     |  | [LAMPSHADE     |  | [LAMPSHADE     |  |  | ADD SYSTEM TO CART     |   |
|  |  ONLY]         |  |  ONLY]         |  |  ONLY]         |  |  | System not included.   |   |
|  | [img]          |  | [img]          |  | [img]          |  |  | [Bullet] [CoreMount]   |   |
|  | Name           |  | Name           |  | Name           |  |  | [Select variant]       |   |
|  | Bullet/CoreMount|  | ...            |  | ...            |  |  | [Add to Cart]          |   |
|  | Fits: Vaari…   |  |                |  |                |  |  | ₹4,999 / ₹7,999        |   |
|  | ₹2,999         |  |                |  |                |  |  +------------------------+   |
|  +----------------+  +----------------+  +----------------+  |  (sticky)                    |
|                                                                                                  |
|  --- When a lampshade card is selected ---                                                       |
|  +-------------------------------------------------------------------------------------------+   |
|  | Fits with: [Bullet System] [CoreMount System]  (badges or tabs)                            |   |
|  | [Tab: Bullet] [Tab: CoreMount]                                                              |   |
|  | +---------------------------------------------+                                             |   |
|  | |                                             |  Visual preview (same angle/scale)        |   |
|  | |     [Lampshade on selected system]          |                                             |   |
|  | |                                             |                                             |   |
|  | +---------------------------------------------+                                             |   |
|  | Compatible collections: Vaari, Ekkam, Ekkam Max                                              |   |
|  | Attach: One line — e.g. "Snaps onto Bullet base with magnetic connection."                 |   |
|  +-------------------------------------------------------------------------------------------+   |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
|  FOOTER                                                                                          |
+--------------------------------------------------------------------------------------------------+
```

---

## Layout (Mobile)

- Same sections, stacked vertically.
- **Add System to Cart**: Sticky at bottom or sticky below hero so it stays visible (no redirect).
- Lampshade grid: 1 column.
- Compatibility: Tabs or swipe for system preview (same lampshade on Bullet vs CoreMount).

---

## Components

| Block | Purpose |
|-------|--------|
| **Page title + copy** | State clearly: "This page is only lampshade." No full lamps. |
| **Alert note** | "System is not included. System must be purchased separately." |
| **Filter** | All / Bullet System / CoreMount System. |
| **Lampshade cards** | Each card: label "Lampshade only", image, name, system badge(s), fits (collections), price. |
| **Compatibility (on select)** | "Fits with: System A, System B" as badges; tabs or swipe for preview per system. |
| **Visual preview** | One image per compatible system; consistent angle/scale; tabs or swipe. |
| **Attach info** | One line under preview. |
| **Add System to Cart** | Fixed/sticky block: system choice (Bullet/CoreMount), one-click add, no redirect. |

---

## Interaction Flow

1. User lands on Lampshades page → sees title, note, filter, grid, and Add System block.
2. User filters by system (optional).
3. User selects a lampshade card → compatibility section appears: "Fits with" badges, tabs (or swipe) for each system, preview image, attach line.
4. User can add a system to cart from the fixed block anytime (one click, no redirect).

---

## Naming Rules

- Product titles include "Lampshade" (e.g. "Vaari Classic Lampshade") so lamp vs lampshade is clear.
- Every product card shows the label: **Lampshade only**.

---

## Two Systems (Reference)

- **Bullet System**: Vaari, Ekkam, Ekkam Max. Compact, button-operated, portable.
- **CoreMount System**: Orran, Treya, Pico, Statti, Valenza, Bravena, Stallora. Larger, touch-operated, scalable.

No cross-compatibility: Bullet parts only with Bullet; CoreMount only with CoreMount.
