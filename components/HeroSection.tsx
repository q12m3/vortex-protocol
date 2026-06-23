"use client"

import { useRef, useEffect } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion"
import { ArrowRight, ExternalLink, TrendingUp, Users, Globe } from "lucide-react"
import { useCursor } from "@/hooks/useCursor"
import MagneticButton from "./MagneticButton"

const HERO_WORDS = [
  { text: "VORTEX:", gradient: false },
  { text: "LIQUID", gradient: true },
  { text: "LIQUIDITY", gradient: false },
  { text: "ENGINE", gradient: true },
]

const MICRO_STATS = [
  { icon: TrendingUp, label: "Total Value Locked", value: "$2.41B", color: "text-cyan-400" },
  { icon: Users, label: "Protocol Holders", value: "186K+", color: "text-indigo-400" },
  { icon: Globe, label: "Chains Supported", value: "14 Networks", color: "text-purple-400" },
]

function TokenArtifact({ cursorX, cursorY }: { cursorX: number; cursorY: number }) {
  const artifactRef = useRef<HTMLDivElement>(null)

  // Proper MotionValues updated from cursor props via useEffect
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)

  useEffect(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1440
    const h = typeof window !== "undefined" ? window.innerHeight : 900
    mvY.set(((cursorX / w) - 0.5) * 16)
    mvX.set(((cursorY / h) - 0.5) * -16)
  }, [cursorX, cursorY, mvX, mvY])

  const tiltX = useSpring(mvX, { stiffness: 120, damping: 18 })
  const tiltY = useSpring(mvY, { stiffness: 120, damping: 18 })

  return (
    <div style={{ perspective: "900px" }}>
    <motion.div
      ref={artifactRef}
      style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
      className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[420px] lg:h-[420px] flex items-center justify-center"
    >
      {/* Outer slow-spin ring — conic gradient masked to ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, rgba(99,102,241,0.6) 0%, rgba(34,211,238,0.6) 25%, rgba(168,85,247,0.6) 50%, rgba(99,102,241,0.6) 100%)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
          filter: "drop-shadow(0 0 8px rgba(99,102,241,0.6))",
        }}
      />

      {/* Middle counter-spin ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{
          width: "75%",
          height: "75%",
          borderRadius: "50%",
          background:
            "conic-gradient(from 90deg, rgba(34,211,238,0.7) 0%, transparent 30%, rgba(168,85,247,0.7) 60%, transparent 80%, rgba(34,211,238,0.7) 100%)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
          filter: "drop-shadow(0 0 6px rgba(34,211,238,0.5))",
        }}
      />

      {/* Inner fast ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background:
            "conic-gradient(from 180deg, rgba(168,85,247,0.8) 0%, transparent 40%, rgba(99,102,241,0.8) 70%, transparent 90%)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
          filter: "drop-shadow(0 0 4px rgba(168,85,247,0.6))",
        }}
      />

      {/* Orbit dot 1 — cyan */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div
          className="absolute top-[2px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400"
          style={{ boxShadow: "0 0 10px 3px rgba(34,211,238,0.8)" }}
        />
      </motion.div>

      {/* Orbit dot 2 — indigo */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{ width: "75%", height: "75%" }}
      >
        <div
          className="absolute top-0 right-[8%] w-1.5 h-1.5 rounded-full bg-indigo-400"
          style={{ boxShadow: "0 0 8px 2px rgba(99,102,241,0.9)" }}
        />
      </motion.div>

      {/* Orbit dot 3 — purple */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{ width: "50%", height: "50%" }}
      >
        <div
          className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full bg-purple-400"
          style={{ boxShadow: "0 0 8px 2px rgba(168,85,247,0.9)" }}
        />
      </motion.div>

      {/* Central coin face */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-[36%] h-[36%] rounded-full"
        animate={{
          boxShadow: [
            "0 0 20px 8px rgba(99,102,241,0.5), 0 0 60px 16px rgba(99,102,241,0.2)",
            "0 0 24px 10px rgba(34,211,238,0.6), 0 0 70px 20px rgba(34,211,238,0.15)",
            "0 0 22px 8px rgba(168,85,247,0.5), 0 0 65px 18px rgba(168,85,247,0.2)",
            "0 0 20px 8px rgba(99,102,241,0.5), 0 0 60px 16px rgba(99,102,241,0.2)",
          ],
        }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(99,102,241,0.8), rgba(168,85,247,0.8))",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <span
          className="text-white font-black tracking-tighter select-none"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.3rem)" }}
        >
          VTX
        </span>
      </motion.div>

      {/* Floating particles */}
      {[
        { x: "18%", y: "12%", size: 4, delay: 0, color: "rgba(34,211,238,0.7)" },
        { x: "82%", y: "20%", size: 3, delay: 0.6, color: "rgba(99,102,241,0.7)" },
        { x: "10%", y: "75%", size: 3, delay: 1.2, color: "rgba(168,85,247,0.7)" },
        { x: "88%", y: "68%", size: 4, delay: 0.3, color: "rgba(34,211,238,0.6)" },
        { x: "50%", y: "90%", size: 2, delay: 0.9, color: "rgba(99,102,241,0.6)" },
        { x: "72%", y: "8%", size: 3, delay: 1.5, color: "rgba(168,85,247,0.6)" },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </motion.div>
    </div>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 80])

  // TODO: Replace with useAccount() from wagmi for real wallet data
  const { rawX: cursorX, rawY: cursorY } = useCursor(0.07)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-20 lg:py-28"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-8">
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-white/70">
                Live on 14 networks — $2.41B TVL
              </span>
            </motion.div>

            {/* H1 — split-text word-by-word stagger */}
            <h1 className="text-5xl sm:text-6xl xl:text-8xl font-black tracking-tighter leading-[0.92] -mt-2">
              {HERO_WORDS.map((word, i) => (
                <div key={i} className="overflow-hidden block">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`block ${
                      word.gradient
                        ? "bg-gradient-to-tr from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent"
                        : "text-white"
                    }`}
                  >
                    {word.text}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-white/55 leading-relaxed max-w-lg font-light"
            >
              The most capital-efficient AMM in DeFi. Concentrated liquidity
              positions, neural rebalancing, and cross-chain atomic swaps — all
              in one frictionless engine.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA — Magnetic */}
              <MagneticButton
                className="relative group flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white overflow-hidden"
                style={{} as React.CSSProperties}
              >
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 4s ease infinite",
                  }}
                />
                {/* Ping ripple ring */}
                <span className="absolute inset-0 rounded-xl border border-indigo-400/40 animate-ping-slow" />
                <span className="relative flex items-center gap-2">
                  Launch App
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </MagneticButton>

              {/* Secondary CTA — Ghost */}
              <MagneticButton
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white/80 hover:text-white border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 backdrop-blur-sm"
              >
                Read Whitepaper
                <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </MagneticButton>
            </motion.div>

            {/* Micro-stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-2 sm:gap-4 pt-2"
            >
              {MICRO_STATS.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    <span className={`font-mono text-xs font-bold ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/40 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — TokenArtifact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <TokenArtifact cursorX={cursorX} cursorY={cursorY} />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#030712] to-transparent" />
    </section>
  )
}
