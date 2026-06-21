/**
 * Vortex Protocol — Landing Page
 *
 * Deployment Integration Points:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1.  Navbar.tsx          → Replace wallet button with wagmi useConnect/useDisconnect
 * 2.  HeroSection.tsx     → Replace micro-stats with The Graph TVL/holder subgraph
 * 3.  StatsSection.tsx    → Replace price with Dexscreener API / Pyth oracle feed
 * 4.  StatsSection.tsx    → Replace TxFeed with WebSocket from Vortex event indexer
 * 5.  StatsSection.tsx    → Replace chain volumes with subgraph query per chain
 * 6.  TokenomicsSection   → Replace supply stats with on-chain contract reads
 * 7.  app/layout.tsx      → Add <Script> for TradingView widget if chart is replaced
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Metadata } from "next"
import CyberGrid from "@/components/CyberGrid"
import CursorGlow from "@/components/CursorGlow"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import FeaturesSection from "@/components/FeaturesSection"
import StatsSection from "@/components/StatsSection"
import TokenomicsSection from "@/components/TokenomicsSection"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Vortex Protocol — Liquid Liquidity Engine",
  description:
    "The most capital-efficient AMM in DeFi. Concentrated liquidity, neural yield routing, and AI-powered security across 14 EVM chains.",
  keywords: [
    "DeFi",
    "AMM",
    "liquidity",
    "yield",
    "cross-chain",
    "Web3",
    "Vortex",
    "VTX",
    "swap",
    "concentrated liquidity",
  ],
  openGraph: {
    title: "Vortex Protocol — Liquid Liquidity Engine",
    description:
      "The most capital-efficient AMM in DeFi. $2.41B TVL, 14 chains, sub-second swaps.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex Protocol — Liquid Liquidity Engine",
    description:
      "The most capital-efficient AMM in DeFi. $2.41B TVL, 14 chains, sub-second swaps.",
    images: ["/og-image.png"],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Fixed background layer — z-0 */}
      <CyberGrid />

      {/* Cursor glow — z-[9999], client-only */}
      <CursorGlow />

      {/* Navigation — z-50 */}
      <Navbar />

      {/* Main content — z-10 */}
      <div className="relative z-10">
        <main>
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
          <TokenomicsSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
