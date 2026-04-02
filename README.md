
---

# 🌀 PokéExplorer

PokéExplorer is a high-performance, professional-grade Pokémon search interface built with **Next.js 15 (App Router)**. It provides a seamless experience for exploring the Pokémon universe with advanced filtering, server-side search, and optimized asset delivery.

## 🚀 Key Features

* **Server-Side Search & Filtering:** Utilizes URL parameters for deep-linkable search results and type filtering.
* **Dynamic Pagination:** Sophisticated pagination logic with range-truncation (e.g., `1, 2 ... 10`) for large datasets.
* **Modern Professional UI:** A clean, high-contrast interface built with Tailwind CSS, featuring glassmorphism, responsive grids, and high-fidelity skeleton loaders.
* **Breadcrumb Navigation:** Context-aware navigation for a structured user journey.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Technical Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Data Source:** [PokeAPI](https://pokeapi.co/)

---

## ⚡ Performance Optimizations (Core Web Vitals)

To ensure a Lighthouse score of ≥ 90 and satisfy the assessment requirements, the following optimizations were implemented:

### 1. Image Optimization & LCP Prioritization
* **Implementation:** Used `next/image` with calculated `sizes` and the `priority` prop.
* **LCP Fix:** The `index < 4` logic in `PokemonCard` ensures that the "above-the-fold" images are preloaded via `<link rel="preload">`, significantly reducing Largest Contentful Paint (LCP).
* **Visuals:** Added `drop-shadow` and `scale` transitions to provide high-fidelity feedback without layout shifts.


### 2. Multi-Layer Caching Strategy
* **`force-cache`:** Applied to `getPokemonByName` fetches. Since Pokémon stats are static, this ensures sub-millisecond load times for repeat visits to detail pages.
* **Incremental Static Regeneration (ISR):** The listing fetch uses `{ next: { revalidate: 3600 } }`. This caches the global list for 1 hour, balancing data freshness with high performance.
* **Parallel Fetching:** Utilized `Promise.all()` in `getPokemonListWithDetails` to fetch multiple Pokémon data points concurrently, preventing the "waterfall" performance bottleneck.


### 3. Cumulative Layout Shift (CLS) Mitigation
* **Skeleton Loaders:** Implemented a robust `loading.tsx` using Tailwind's `animate-pulse`. 
* **Fixed Aspect Ratios:** Image containers use `aspect-square` to reserve space in the DOM before the images hydrate, ensuring a CLS score of near zero.

---

## 📂 Project Architecture

```text
├── app/
│   ├── pokemon/[name]/     # Server-side detail route
│   ├── layout.tsx          # Global providers and fonts
│   ├── loading.tsx         # Global high-fidelity skeleton UI
│   ├── error.tsx           # Graceful error boundaries
│   └── page.tsx            # Main search & listing logic
├── components/
│   ├── organisms/          # FilterBar, Pagination, Breadcrumbs
│   ├── utility/            # TypeScript Interfaces
│   └── PokemonCard.tsx     # Specialized LCP-optimized card
└── lib/
    └── api.ts              # Fetch logic with caching headers
```

---

## 🔧 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:kelechi-okpani/Checkit-procure.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Build for production:**
    ```bash
    npm run build
    ```

---

## 📝 Engineering Principles

* **Type Safety:** Explicit interfaces (`PokemonDetail`, `PokemonListItem`) are used throughout to eliminate the use of `any`.
* **Graceful Degredation:** Implemented `notFound()` for invalid Pokémon queries and `error.tsx` for API failures.
* **URL as State:** Filtering and pagination are driven by the URL, allowing users to share specific search results or page numbers.
* **Accessibility:** High-contrast text colors (`text-slate-950`) and semantic HTML tags ensure the site is navigable for all users.