"use client"

import { motion } from "framer-motion"
import { Zap, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

const TELEGRAM_URL = "https://t.me/q12m3"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background glow blobs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(34,211,238,0.06) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-4 sm:left-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5"
        >
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.2))",
              boxShadow:
                "0 0 0 1px rgba(99,102,241,0.4), 0 0 16px rgba(99,102,241,0.25)",
            }}
          >
            <Zap className="w-4.5 h-4.5 text-cyan-400" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            VOR
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              TEX
            </span>
          </span>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 sm:p-10 flex flex-col items-center gap-6"
          style={{
            boxShadow:
              "0 0 0 1px rgba(99,102,241,0.1), 0 24px 64px rgba(0,0,0,0.6)",
          }}
        >
          {/* Emoji / icon */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl select-none"
          >
            👋
          </motion.div>

          <div className="flex flex-col gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
              Заинтересовал сайт?
            </h1>
            <p className="text-base text-white/55 leading-relaxed">
              Могу сделать похожий для любых нужд — бизнес, портфолио, продукт,
              лендинг. Пишите, обсудим.
            </p>
          </div>

          {/* Telegram CTA */}
          <motion.a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full justify-center px-6 py-4 rounded-xl text-white font-bold text-sm relative overflow-hidden group"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.9), rgba(99,102,241,0.9))",
              boxShadow:
                "0 0 24px rgba(34,211,238,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.95), rgba(168,85,247,0.95))",
              }}
            />
            <Send className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Написать в Telegram</span>
          </motion.a>

          <p className="text-xs text-white/25">
            @q12m3 — отвечу быстро
          </p>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-white/20"
        >
          Разработка веб-сайтов · UI/UX · Frontend
        </motion.p>
      </div>
    </div>
  )
}
