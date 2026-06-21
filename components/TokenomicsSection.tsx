"use client"

import { useRef, useState } from "react"
import { motion, useInView, useSpring } from "framer-motion"
import { Lock, Flame, Gift, Coins, TrendingDown, Users } from "lucide-react"

// ─── SVG Donut Chart ──────────────────────────────────────────────────────────

const R = 70
const C = 2 * Math.PI * R // ≈ 439.82

const DONUT_SEGMENTS = [
  { label: "Liquidity Pool", pct: 40, color: "#22d3ee", glow: "rgba(34,211,238,0.6)" },
  { label: "Ecosystem Fund", pct: 25, color: "#6366f1", glow: "rgba(99,102,241,0.6)" },
  { label: "Public Sale", pct: 20, color: "#a855f7", glow: "rgba(168,85,247,0.6)" },
  { label: "Team & Advisors", pct: 15, color: "#f43f5e", glow: "rgba(244,63,94,0.6)" },
]

function DonutChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  let cumulative = 0

  return (
    <div className="flex flex-col gap-6 items-center">
      <svg
        ref={ref}
        viewBox="0 0 200 200"
        className="w-52 h-52 lg:w-60 lg:h-60"
      >
        <defs>
          {DONUT_SEGMENTS.map((seg, i) => (
            <filter key={i} id={`donut-glow-${i}`}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Background track */}
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="22"
        />

        {/* Animated segments */}
        {DONUT_SEGMENTS.map((seg, i) => {
          const startOffset = cumulative
          cumulative += seg.pct
          const dashLen = (seg.pct / 100) * C
          const dashOffset = -(startOffset / 100) * C

          return (
            <motion.circle
              key={seg.label}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth={hoveredIndex === i ? 26 : 22}
              strokeDasharray={`${dashLen} ${C}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              filter={hoveredIndex === i ? `url(#donut-glow-${i})` : undefined}
              style={{
                cursor: "pointer",
                transition: "stroke-width 0.2s ease",
                filter: hoveredIndex === i ? `drop-shadow(0 0 6px ${seg.glow})` : undefined,
              }}
              initial={{ strokeDasharray: `0 ${C}` }}
              animate={
                inView
                  ? {
                      strokeDasharray: `${dashLen} ${C}`,
                      strokeDashoffset: dashOffset,
                    }
                  : {}
              }
              transition={{
                duration: 1.6,
                delay: i * 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          )
        })}

        {/* Center label */}
        <text
          x="100"
          y="94"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-black"
          style={{
            fill: hoveredIndex !== null ? DONUT_SEGMENTS[hoveredIndex].color : "#ffffff",
            fontSize: hoveredIndex !== null ? "26px" : "22px",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            transition: "all 0.2s ease",
          }}
        >
          {hoveredIndex !== null
            ? `${DONUT_SEGMENTS[hoveredIndex].pct}%`
            : "100M"}
        </text>
        <text
          x="100"
          y="113"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: "rgba(255,255,255,0.4)",
            fontSize: "9px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.08em",
          }}
        >
          {hoveredIndex !== null
            ? DONUT_SEGMENTS[hoveredIndex].label.toUpperCase()
            : "VTX SUPPLY"}
        </text>
      </svg>

      {/* Legend grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 w-full max-w-xs">
        {DONUT_SEGMENTS.map((seg, i) => (
          <div key={seg.label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: seg.color, boxShadow: `0 0 6px ${seg.glow}` }}
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-mono font-semibold" style={{ color: seg.color }}>
                {seg.pct}%
              </span>
              <span className="text-[10px] text-white/40 leading-tight">{seg.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tokenomics Tilt Card ─────────────────────────────────────────────────────

interface TokenCardData {
  icon: React.ElementType
  value: string
  suffix: string
  title: string
  subtitle: string
  description: string
  progressPct: number
  gradient: string
  border: string
  glow: string
  iconBg: string
  barGlow: string
}

const TOKEN_CARDS: TokenCardData[] = [
  {
    icon: Lock,
    value: "65",
    suffix: "%",
    title: "Liquidity Locked",
    subtitle: "3-year lock via Unicrypt",
    description:
      "65% of all liquidity positions are locked in Unicrypt vaults with a 3-year time-lock. No rug, no drain — verifiable on-chain in real-time.",
    progressPct: 65,
    gradient: "from-cyan-500 via-teal-400 to-cyan-600",
    border: "rgba(34,211,238,0.2)",
    glow: "rgba(34,211,238,0.1)",
    iconBg: "rgba(34,211,238,0.12)",
    barGlow: "rgba(34,211,238,0.7)",
  },
  {
    icon: Flame,
    value: "2.5",
    suffix: "%",
    title: "Deflation Burn Rate",
    subtitle: "Per quarterly epoch",
    description:
      "2.5% of the circulating VTX supply is permanently burned each quarter, sourced from 15% of all protocol swap fees. Total burned to date: 1.82M VTX.",
    progressPct: 25,
    gradient: "from-orange-500 via-rose-500 to-pink-600",
    border: "rgba(244,63,94,0.2)",
    glow: "rgba(244,63,94,0.1)",
    iconBg: "rgba(244,63,94,0.12)",
    barGlow: "rgba(244,63,94,0.7)",
  },
  {
    icon: Gift,
    value: "4.2",
    suffix: "% APR",
    title: "Holder Reward Yield",
    subtitle: "Auto-distributed weekly",
    description:
      "Hold a minimum of 1,000 VTX to earn 4.2% APR in USDC rewards. Funded by 40% of protocol fees — no staking required, rewards claimable anytime.",
    progressPct: 42,
    gradient: "from-purple-500 via-indigo-500 to-violet-600",
    border: "rgba(168,85,247,0.2)",
    glow: "rgba(168,85,247,0.1)",
    iconBg: "rgba(168,85,247,0.12)",
    barGlow: "rgba(168,85,247,0.7)",
  },
]

interface TokenCardProps {
  card: TokenCardData
  index: number
}

function TokenCard({ card, index }: TokenCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const inView = useInView(cardRef, { once: true, margin: "-60px" })

  const rotateX = useSpring(0, { stiffness: 300, damping: 24 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 24 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    rotateX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -12)
    rotateY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 12)
  }

  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "900px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { rotateX.set(0); rotateY.set(0); setHovered(false) }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderColor: hovered ? card.border.replace("0.2", "0.45") : card.border,
          boxShadow: hovered
            ? `inset 0 0 50px ${card.glow}, 0 0 40px ${card.glow}`
            : `inset 0 0 20px ${card.glow.replace("0.1", "0.03")}`,
        }}
        className="relative flex flex-col gap-5 p-6 rounded-2xl border bg-white/[0.02] backdrop-blur-xl h-full transition-colors duration-300"
      >
        {/* BG gradient overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at 20% 20%, ${card.glow}, transparent 70%)`,
            opacity: hovered ? 1 : 0.3,
          }}
        />

        {/* Icon */}
        <div
          className="flex items-center justify-center w-11 h-11 rounded-xl relative z-10"
          style={{ background: card.iconBg, boxShadow: `0 0 20px ${card.iconBg}` }}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>

        {/* Value */}
        <div className="relative z-10">
          <div
            className={`text-5xl font-black tracking-tighter bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}
          >
            {card.value}
            <span className="text-2xl">{card.suffix}</span>
          </div>
          <div className="text-base font-bold text-white mt-1">{card.title}</div>
          <div className="text-xs text-white/40 font-mono mt-0.5">{card.subtitle}</div>
        </div>

        {/* Progress bar */}
        <div className="relative z-10">
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${card.progressPct}%` } : {}}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.14 + 0.4 }}
              className={`h-full rounded-full bg-gradient-to-r ${card.gradient}`}
              style={{ boxShadow: `0 0 10px ${card.barGlow}` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-white/30 font-mono">0%</span>
            <span className="text-[10px] text-white/30 font-mono">100%</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed relative z-10 flex-1">
          {card.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

// ─── Supply Info Bar ──────────────────────────────────────────────────────────

const SUPPLY_STATS = [
  { icon: Coins, label: "Total Supply", value: "100,000,000", suffix: "VTX" },
  { icon: TrendingDown, label: "Circulating Supply", value: "62,400,000", suffix: "VTX" },
  { icon: Flame, label: "Total Burned", value: "1,820,000", suffix: "VTX" },
  { icon: Users, label: "Max Wallet", value: "1%", suffix: "of supply" },
]

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TokenomicsSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headingRef, { once: true, margin: "-80px" })

  return (
    <section className="relative py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="flex flex-col items-center text-center gap-4 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 border border-purple-400/20 bg-purple-400/[0.06] px-3 py-1 rounded-full"
          >
            VTX Token
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter"
          >
            <span className="text-white">Engineered for </span>
            <span className="bg-gradient-to-tr from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              long-term value
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base text-white/50 max-w-xl leading-relaxed"
          >
            Deflationary supply, locked liquidity, and real yield — a tokenomics
            model built to reward long-term protocol participants, not speculators.
          </motion.p>
        </div>

        {/* Main grid — 3 cards + donut chart */}
        <div className="grid lg:grid-cols-3 gap-5 mb-12">
          {TOKEN_CARDS.map((card, i) => (
            <TokenCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Bottom row: supply info bar + donut */}
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Supply info bar — 3 cols */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SUPPLY_STATS.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col gap-2 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
                  >
                    <Icon className="w-4 h-4 text-white/30" />
                    <div>
                      <div className="text-sm font-mono font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-mono text-white/30 mt-0.5">
                        {stat.suffix}
                      </div>
                    </div>
                    <div className="text-[11px] text-white/40 leading-tight">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Donut chart — 2 cols */}
          <div className="lg:col-span-2 flex justify-center">
            <DonutChart />
          </div>
        </div>
      </div>
    </section>
  )
}
