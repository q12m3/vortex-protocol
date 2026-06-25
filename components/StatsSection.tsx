"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { TrendingUp, Activity, Layers, ChevronUp, ChevronDown } from "lucide-react"
import { useCountUp } from "@/hooks/useCountUp"

// ─── Live Chart ────────────────────────────────────────────────────────────────

const CHART_PATHS = [
  "M 0 160 C 50 155 100 140 150 135 C 200 130 250 125 300 115 C 350 105 400 98 450 92 C 500 86 550 78 600 72 C 640 68 670 66 700 62",
  "M 0 120 C 50 118 100 128 150 145 C 200 158 250 162 300 152 C 350 142 400 125 450 108 C 500 92 550 78 600 68 C 640 62 670 59 700 55",
  "M 0 140 C 50 115 100 95 150 118 C 200 141 250 158 300 140 C 350 122 400 100 450 94 C 500 88 550 110 600 112 C 640 95 675 72 700 60",
  "M 0 155 C 50 152 100 148 150 140 C 200 132 250 124 300 118 C 350 112 400 108 450 100 C 500 92 550 85 600 78 C 640 73 670 70 700 65",
]

const FILL_PATHS = CHART_PATHS.map(
  (p) => `${p} L 700 200 L 0 200 Z`
)

const PRICES = [4.8247, 4.8119, 4.8603, 4.8372, 4.8891, 4.8044, 4.8758]

function LiveChart() {
  const [pathIndex, setPathIndex] = useState(0)
  const [priceIndex, setPriceIndex] = useState(0)
  const [priceKey, setPriceKey] = useState(0)

  // TODO: Replace with real price data from Dexscreener API or Pyth oracle feed
  useEffect(() => {
    const id = setInterval(() => {
      setPathIndex((i) => (i + 1) % CHART_PATHS.length)
      setPriceIndex((i) => (i + 1) % PRICES.length)
      setPriceKey((k) => k + 1)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const currentPrice = PRICES[priceIndex]
  const prevPrice = PRICES[(priceIndex - 1 + PRICES.length) % PRICES.length]
  const priceUp = currentPrice >= prevPrice
  const priceDelta = (((currentPrice - prevPrice) / prevPrice) * 100).toFixed(2)

  return (
    <div className="flex flex-col gap-3">
      {/* Price ticker */}
      <div className="flex items-end gap-3 px-1">
        <div className="overflow-hidden h-9">
          <AnimatePresence mode="wait">
            <motion.span
              key={priceKey}
              initial={{ y: priceUp ? 24 : -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: priceUp ? -24 : 24, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block font-mono text-2xl font-bold text-white"
            >
              ${currentPrice.toFixed(4)}
            </motion.span>
          </AnimatePresence>
        </div>
        <div
          className={`flex items-center gap-0.5 text-xs font-mono font-semibold mb-1 ${
            priceUp ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {priceUp ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
          {Math.abs(Number(priceDelta))}%
        </div>
        <span className="text-white/30 text-xs mb-1 font-mono">VTX/USDC</span>
      </div>

      {/* Morphing SVG chart */}
      <div className="relative w-full" style={{ height: 200 }}>
        <svg
          viewBox="0 0 700 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(99,102,241,0.35)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0)" />
            </linearGradient>
            <filter id="chart-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Gradient fill area */}
          <motion.path
            animate={{ d: FILL_PATHS[pathIndex] }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
            fill="url(#chart-fill)"
          />

          {/* Glowing stroke line */}
          <motion.path
            animate={{ d: CHART_PATHS[pathIndex] }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
            fill="none"
            stroke="rgba(99,102,241,0.9)"
            strokeWidth="2"
            filter="url(#chart-glow)"
          />
        </svg>
      </div>
    </div>
  )
}

// ─── Transaction Feed ──────────────────────────────────────────────────────────

interface Tx {
  id: number
  type: "buy" | "sell"
  pair: string
  amount: string
  usd: string
  address: string
  ago: string
}

const TX_POOL: Omit<Tx, "id">[] = [
  { type: "buy", pair: "VTX/USDC", amount: "14,280 VTX", usd: "$68,789", address: "0x3f9a...c21b", ago: "just now" },
  { type: "sell", pair: "VTX/ETH", amount: "6,500 VTX", usd: "$31,360", address: "0x8b1c...f44d", ago: "2s ago" },
  { type: "buy", pair: "VTX/USDC", amount: "32,100 VTX", usd: "$154,817", address: "0xc7e2...91a0", ago: "4s ago" },
  { type: "sell", pair: "VTX/USDC", amount: "2,850 VTX", usd: "$13,751", address: "0x5d4f...b8c3", ago: "7s ago" },
  { type: "buy", pair: "VTX/WBTC", amount: "8,920 VTX", usd: "$43,036", address: "0x1a7d...e55f", ago: "9s ago" },
  { type: "sell", pair: "VTX/USDC", amount: "19,440 VTX", usd: "$93,784", address: "0x9c3b...2d88", ago: "12s ago" },
  { type: "buy", pair: "VTX/ETH", amount: "5,200 VTX", usd: "$25,088", address: "0x4e8a...7f1c", ago: "15s ago" },
  { type: "buy", pair: "VTX/USDC", amount: "41,600 VTX", usd: "$200,716", address: "0x2b5c...a90e", ago: "18s ago" },
]

function TxFeed() {
  const [txs, setTxs] = useState<Tx[]>(
    TX_POOL.map((t, i) => ({ ...t, id: i }))
  )
  const counterRef = useRef(TX_POOL.length)

  // TODO: Replace with WebSocket subscription to Vortex subgraph or Dexscreener live feed
  useEffect(() => {
    const id = setInterval(() => {
      const pool = TX_POOL[Math.floor(Math.random() * TX_POOL.length)]
      const next: Tx = { ...pool, id: counterRef.current++, ago: "just now" }
      setTxs((prev) => [next, ...prev.slice(0, 29)])
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="flex flex-col gap-1.5 overflow-y-auto h-[300px]"
      style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
    >
      <AnimatePresence initial={false}>
        {txs.map((tx) => (
          <motion.div
            key={tx.id}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]"
          >
            {/* Pulse dot */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-2 h-2 rounded-full ${
                  tx.type === "buy" ? "bg-emerald-400" : "bg-rose-400"
                }`}
                style={{
                  boxShadow:
                    tx.type === "buy"
                      ? "0 0 6px rgba(52,211,153,0.8)"
                      : "0 0 6px rgba(251,113,133,0.8)",
                }}
              />
            </div>

            {/* Type badge */}
            <span
              className={`text-[10px] font-bold uppercase tracking-wider w-7 flex-shrink-0 ${
                tx.type === "buy" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {tx.type}
            </span>

            {/* Pair + amount */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white truncate">
                  {tx.amount}
                </span>
                <span className="text-[10px] text-white/35 font-mono">{tx.pair}</span>
              </div>
            </div>

            {/* USD value */}
            <span className="text-xs font-mono font-semibold text-white/70 flex-shrink-0">
              {tx.usd}
            </span>

            {/* Address + time */}
            <div className="text-right flex-shrink-0 hidden sm:block">
              <div className="text-[10px] font-mono text-white/30">{tx.address}</div>
              <div className="text-[10px] text-white/25">{tx.ago}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─── Chain Volume Breakdown ────────────────────────────────────────────────────

const CHAINS = [
  { name: "Ethereum", pct: 42, color: "from-indigo-500 to-indigo-400", glow: "rgba(99,102,241,0.5)" },
  { name: "Arbitrum", pct: 28, color: "from-cyan-500 to-cyan-400", glow: "rgba(34,211,238,0.5)" },
  { name: "Base", pct: 16, color: "from-blue-500 to-blue-400", glow: "rgba(59,130,246,0.5)" },
  { name: "Optimism", pct: 9, color: "from-rose-500 to-rose-400", glow: "rgba(244,63,94,0.5)" },
  { name: "Other", pct: 5, color: "from-white/30 to-white/20", glow: "rgba(255,255,255,0.2)" },
]

function ChainBars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {CHAINS.map((chain, i) => (
        <div key={chain.name} className="flex items-center gap-3">
          <span className="text-xs text-white/50 w-20 flex-shrink-0">{chain.name}</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${chain.pct}%` } : {}}
              transition={{
                duration: 1.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`h-full rounded-full bg-gradient-to-r ${chain.color}`}
              style={{ boxShadow: `0 0 8px ${chain.glow}` }}
            />
          </div>
          <span className="text-xs font-mono text-white/40 w-8 text-right flex-shrink-0">
            {chain.pct}%
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string
  suffix: string
  color: { text: string; glow: string; bg: string }
  index: number
  inView: boolean
}

function StatCard({ icon: Icon, label, value, suffix, color, index, inView }: StatCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-5 rounded-2xl border transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: hovered ? color.bg.replace("0.06", "0.25") : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 0 30px ${color.glow}` : "none",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ background: color.bg }}
          >
            <Icon className={`w-4.5 h-4.5 ${color.text}`} strokeWidth={2} />
          </div>
          <div className="flex items-end gap-1">
            <span className={`font-mono text-2xl font-bold ${color.text}`}>{value}</span>
            <span className="text-sm text-white/40 mb-0.5 font-mono">{suffix}</span>
          </div>
          <span className="text-xs text-white/45">{label}</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })

  // TODO: Replace with on-chain data from The Graph subgraph queries
  const tvl = useCountUp(2410000000, 2000, inView, 0)
  const volume = useCountUp(847000000, 2000, inView, 0)
  const txCount = useCountUp(4820000, 2000, inView, 0)

  const STAT_CARDS = [
    {
      icon: TrendingUp,
      label: "Total Value Locked",
      value: `$${(2410000000 / 1e9).toFixed(2)}B`,
      suffix: "",
      color: { text: "text-cyan-400", glow: "rgba(34,211,238,0.12)", bg: "rgba(34,211,238,0.08)" },
    },
    {
      icon: Activity,
      label: "24h Trading Volume",
      value: `$${(847000000 / 1e6).toFixed(0)}M`,
      suffix: "",
      color: { text: "text-indigo-400", glow: "rgba(99,102,241,0.12)", bg: "rgba(99,102,241,0.08)" },
    },
    {
      icon: Layers,
      label: "Total Transactions",
      value: `4.82M`,
      suffix: "",
      color: { text: "text-purple-400", glow: "rgba(168,85,247,0.12)", bg: "rgba(168,85,247,0.08)" },
    },
  ]

  const TIMEFRAMES = ["1H", "4H", "1D", "1W"]
  const [activeTimeframe, setActiveTimeframe] = useState("1D")

  return (
    <section className="relative py-24 lg:py-36">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-4 mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1 rounded-full">
            Live Protocol Data
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">
            <span className="text-white">Numbers that </span>
            <span className="bg-gradient-to-tr from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              don't lie
            </span>
          </h2>
        </motion.div>

        {/* Top stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {STAT_CARDS.map((card, i) => (
            <StatCard key={card.label} {...card} index={i} inView={inView} />
          ))}
        </div>

        {/* Main terminal + sidebar */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Terminal panel — 2/3 width */}
          <div
            className="lg:col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl overflow-hidden"
          >
            {/* Terminal chrome */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-white/30">
                  vortex://price-feed/VTX
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setActiveTimeframe(tf)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all duration-150 ${
                      activeTimeframe === tf
                        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5">
              <LiveChart />
            </div>
          </div>

          {/* Right column — chains + tx feed */}
          <div className="flex flex-col gap-4">
            {/* Chain volume */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Volume by Chain
                </span>
                <span className="text-[10px] font-mono text-white/30">24h</span>
              </div>
              <ChainBars />
            </div>

            {/* Live Tx Feed */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-4 flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Live Transactions
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400">Live</span>
                </div>
              </div>
              <TxFeed />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
