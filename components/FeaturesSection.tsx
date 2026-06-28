"use client"

import { useRef, useState } from "react"
import { motion, useInView, useSpring } from "framer-motion"
import { Zap, GitMerge, ShieldCheck, BrainCircuit, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useT } from "@/lib/translations"

const FEATURE_META = [
  {
    icon: Zap,
    badge: "< 0.8s Finality",
    color: {
      border: "rgba(34,211,238,0.15)",
      glow: "rgba(34,211,238,0.08)",
      bg: "rgba(34,211,238,0.06)",
      icon: "rgba(34,211,238,0.15)",
      badge: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    },
  },
  {
    icon: GitMerge,
    badge: "Up to 34% APR",
    color: {
      border: "rgba(99,102,241,0.15)",
      glow: "rgba(99,102,241,0.08)",
      bg: "rgba(99,102,241,0.06)",
      icon: "rgba(99,102,241,0.15)",
      badge: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    },
  },
  {
    icon: ShieldCheck,
    badge: "AI-Powered",
    color: {
      border: "rgba(168,85,247,0.15)",
      glow: "rgba(168,85,247,0.08)",
      bg: "rgba(168,85,247,0.06)",
      icon: "rgba(168,85,247,0.15)",
      badge: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    },
  },
  {
    icon: BrainCircuit,
    badge: "Adaptive AMM",
    color: {
      border: "rgba(244,63,94,0.15)",
      glow: "rgba(244,63,94,0.08)",
      bg: "rgba(244,63,94,0.06)",
      icon: "rgba(244,63,94,0.15)",
      badge: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    },
  },
]

interface Feature {
  icon: React.ElementType
  badge: string
  title: string
  description: string
  detail: string
  learnMore: string
  color: {
    border: string
    glow: string
    bg: string
    icon: string
    badge: string
  }
}

interface TiltCardProps {
  feature: Feature
  index: number
}

function TiltCard({ feature, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const rotateX = useSpring(0, { stiffness: 300, damping: 24 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 24 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -14
    const y = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 14
    rotateX.set(x)
    rotateY.set(y)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setHovered(false)
  }

  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: "800px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          border: `1px solid ${hovered ? feature.color.border.replace("0.15", "0.35") : feature.color.border}`,
          boxShadow: hovered
            ? `inset 0 0 40px ${feature.color.glow}, 0 0 40px ${feature.color.glow.replace("0.08", "0.12")}`
            : `inset 0 0 20px ${feature.color.glow.replace("0.08", "0.03")}`,
        }}
        className="relative group flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.02] backdrop-blur-xl transition-all duration-300 h-full cursor-default"
      >
        {/* Gradient bg overlay intensifies on hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${feature.color.bg}, transparent 70%)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Badge */}
        <div className="flex justify-between items-start relative z-10">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl"
            style={{
              background: feature.color.icon,
              boxShadow: `0 0 20px ${feature.color.icon}`,
            }}
          >
            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${feature.color.badge}`}
          >
            {feature.badge}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 relative z-10 flex-1">
          <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
            {feature.title}
          </h3>
          <p className="text-sm text-white/55 leading-relaxed">
            {feature.description}
          </p>
          <p className="text-xs font-mono text-white/35 pt-1">{feature.detail}</p>
        </div>

        {/* Learn more */}
        <motion.div
          className="flex items-center gap-1.5 text-xs font-semibold text-white/40 group-hover:text-white/80 transition-colors duration-200 relative z-10"
        >
          <motion.span
            animate={{ x: hovered ? 0 : 0 }}
            className="flex items-center gap-1.5"
          >
            {feature.learnMore}
            <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const { lang } = useLanguage()
  const T = useT(lang)
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: "-80px" })

  const features: Feature[] = FEATURE_META.map((meta, i) => ({
    ...meta,
    ...T.features.items[i],
    learnMore: T.features.learnMore,
  }))

  return (
    <section className="relative py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="flex flex-col items-center text-center gap-4 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-400 border border-indigo-400/20 bg-indigo-400/[0.06] px-3 py-1 rounded-full"
          >
            {T.features.sectionLabel}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter"
          >
            <span className="text-white">{T.features.h2a}</span>
            <span className="bg-gradient-to-tr from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {T.features.h2b}
            </span>
            <br />
            <span className="text-white">{T.features.h2c}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-white/50 max-w-xl leading-relaxed"
          >
            {T.features.subtitle}
          </motion.p>
        </div>

        {/* 4-card grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <TiltCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
