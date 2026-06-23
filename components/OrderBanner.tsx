"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"

const TELEGRAM_URL = "https://t.me/q12m3"

export default function OrderBanner() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !dismissed) setVisible(true)
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [dismissed])

  return (
    <>
      <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />

      <AnimatePresence>
        {visible && !dismissed && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-[9998]"
          >
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/[0.12] bg-[#030712]/90 backdrop-blur-xl"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(99,102,241,0.25), 0 8px 32px rgba(0,0,0,0.7), 0 0 24px rgba(34,211,238,0.07)",
              }}
            >
              {/* Telegram icon */}
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(99,102,241,0.15))",
                  boxShadow: "0 0 0 1px rgba(34,211,238,0.3)",
                }}
              >
                <Send className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Text */}
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-white/40 leading-none mb-1">
                  разработка сайтов
                </span>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-white hover:text-cyan-400 transition-colors duration-150 whitespace-nowrap"
                >
                  Заказать подобный сайт →
                </a>
              </div>

              {/* Close */}
              <button
                onClick={() => {
                  setVisible(false)
                  setDismissed(true)
                }}
                className="ml-1 flex items-center justify-center w-7 h-7 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-colors duration-150 flex-shrink-0"
                aria-label="Закрыть"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
