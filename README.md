# Vortex Protocol — Frontend

Production-ready Web3 DeFi landing page. Next.js 14 App Router, Framer Motion, Tailwind CSS.

## Quick Start

```bash
# 1. Copy all files into your project root (structure below)
# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

## File Structure

```
web33/
├── app/
│   ├── globals.css          # Keyframes, scrollbar, selection, utility classes
│   ├── layout.tsx           # Font setup (Space Grotesk + Space Mono), metadata
│   └── page.tsx             # Root page — section composition + OG metadata
├── components/
│   ├── CyberGrid.tsx        # Fixed SVG grid background + ambient color blobs
│   ├── CursorGlow.tsx       # Lerp-smoothed cursor aura (600px + 200px orbs)
│   ├── MagneticButton.tsx   # Reusable spring-physics magnetic button wrapper
│   ├── Navbar.tsx           # Sticky nav, scroll-blur, 3-state wallet button, mobile menu
│   ├── HeroSection.tsx      # Split-text reveal, TokenArtifact, parallax fade
│   ├── FeaturesSection.tsx  # 4 × 3D tilt cards with neon hover states
│   ├── StatsSection.tsx     # Stat cards, morphing SVG chart, live Tx feed, chain bars
│   ├── TokenomicsSection.tsx# 3 tilt cards + SVG donut chart + supply info bar
│   └── Footer.tsx           # Brand column, social icons, 3 link columns, status bar
├── hooks/
│   ├── useCursor.ts         # RAF lerp mouse tracking → { x, y, rawX, rawY }
│   └── useCountUp.ts        # EaseOut cubic count-up animation → formatted string
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts       # Custom colors, keyframes, screens (3xl/4xl), fonts
└── tsconfig.json
```

## Web3 Integration Points

| # | File | Location | Replace With |
|---|------|----------|-------------|
| 1 | `Navbar.tsx` | `handleWalletClick` async fn | `useConnect()` + `useDisconnect()` from **wagmi** |
| 2 | `Navbar.tsx` | `address` state, `walletState` state | `useAccount()` from **wagmi** |
| 3 | `HeroSection.tsx` | `MICRO_STATS` constant values | The Graph subgraph — TVL, holder count, chain count |
| 4 | `StatsSection.tsx` | `PRICES` array + `setInterval` ticker | **Dexscreener API** `/latest/dex/tokens/{address}` or **Pyth** price feed |
| 5 | `StatsSection.tsx` | `TX_POOL` + `setInterval` TxFeed | WebSocket subscription to Vortex event indexer or **The Graph** live feed |
| 6 | `StatsSection.tsx` | `CHAINS` volume percentages | Subgraph query aggregating volume per chain ID |
| 7 | `StatsSection.tsx` | `STAT_CARDS` TVL / Volume / Tx values | On-chain reads via **viem** `readContract` or subgraph |
| 8 | `TokenomicsSection.tsx` | `SUPPLY_STATS` values | `readContract` calls to VTX ERC-20 — `totalSupply()`, `circulatingSupply()` |
| 9 | `StatsSection.tsx` | `LiveChart` SVG morphing paths | **TradingView** lightweight-charts widget or **Dexscreener** embedded chart |
| 10 | `app/page.tsx` | OG image path `/og-image.png` | Upload to `/public/og-image.png` (1200×630px) |

## Recommended wagmi Setup

```bash
npm install wagmi viem @tanstack/react-query
```

Wrap your layout in:
```tsx
// app/layout.tsx
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/wagmi'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

## Animations Reference

| Animation | File | Trigger |
|-----------|------|---------|
| Split-text H1 reveal | `HeroSection` | Mount, stagger per word |
| TokenArtifact rings | `HeroSection` | Continuous rotation loop |
| Magnetic button pull | `MagneticButton` | `onMouseMove` spring |
| 3D card tilt | `FeaturesSection`, `TokenomicsSection` | `onMouseMove` spring |
| Morphing SVG chart | `StatsSection` | `setInterval` 2.8s |
| Live Tx feed | `StatsSection` | `setInterval` 1.4s + AnimatePresence |
| Count-up stats | `StatsSection` | `useInView` trigger |
| Tokenomics bars | `TokenomicsSection` | `useInView` trigger |
| Donut chart draw | `TokenomicsSection` | `useInView` trigger |
| Cursor glow | `CursorGlow` | Global `mousemove` RAF lerp |
| Scroll parallax | `HeroSection` | `useScroll` + `useTransform` |

## Performance Notes

- `CursorGlow` is hidden on touch devices via `@media (hover: none)` — no RAF loop on mobile.
- All `useInView` hooks use `{ once: true }` — animations fire once, never re-trigger on scroll.
- `CyberGrid` is a pure SVG — zero JS, zero repaints.
- Framer Motion `useSpring` values are memoized — no re-render cascade on mouse move.
- `AnimatePresence` exit animations are kept under 350ms to avoid blocking user interactions.

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. CSS `backdrop-filter` degrades gracefully on older browsers (falls back to opaque bg).
