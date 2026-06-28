"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Loader2, CheckCircle2, Wallet, X, Menu } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useT } from "@/lib/translations"

type WalletState = "disconnected" | "connecting" | "connected"

function LangToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLanguage()
  return (
    <motion.button
      onClick={toggle}
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-bold transition-colors duration-150 hover:border-white/[0.18] ${className ?? ""}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      aria-label="Toggle language"
    >
      <span className={lang === "en" ? "text-white" : "text-white/35"}>EN</span>
      <span className="text-white/20 mx-0.5">/</span>
      <span className={lang === "ru" ? "text-white" : "text-white/35"}>RU</span>
    </motion.button>
  )
}

export default function Navbar() {
  const { lang } = useLanguage()
  const T = useT(lang)
  const [scrolled, setScrolled] = useState(false)
  const [walletState, setWalletState] = useState<WalletState>("disconnected")
  const [address] = useState("0x71c...B9Af")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // TODO: Replace with wagmi's useConnect() / useDisconnect() hooks
  const handleWalletClick = async () => {
    if (walletState === "disconnected") {
      setWalletState("connecting")
      await new Promise((r) => setTimeout(r, 1600))
      setWalletState("connected")
    } else if (walletState === "connected") {
      setWalletState("disconnected")
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#030712]/80 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="relative flex items-center justify-center w-8 h-8 rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.2))",
                  boxShadow:
                    "0 0 0 1px rgba(99,102,241,0.4), 0 0 12px rgba(99,102,241,0.2)",
                }}
              >
                <Zap className="w-4 h-4 text-cyan-400" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-black tracking-tighter text-white">
                VOR
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  TEX
                </span>
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {T.navbar.links.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group"
                >
                  {label}
                  <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-gradient-to-r from-cyan-400 to-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            {/* Right side: lang toggle + wallet + mobile hamburger */}
            <div className="flex items-center gap-2.5">
              {/* Language toggle — always visible */}
              <LangToggle />

              {/* Wallet Button */}
              <div className="relative">
                <motion.button
                  onClick={handleWalletClick}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold overflow-hidden transition-all duration-200 ${
                    walletState === "connected"
                      ? "bg-white/[0.06] border border-white/[0.1] text-white"
                      : "text-white"
                  }`}
                  style={
                    walletState !== "connected"
                      ? {
                          background:
                            "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(168,85,247,0.9))",
                          boxShadow:
                            "0 0 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }
                      : {}
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <AnimatePresence mode="wait">
                    {walletState === "disconnected" && (
                      <motion.span
                        key="disconnected"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <Wallet className="w-3.5 h-3.5" />
                        {T.navbar.connectWallet}
                      </motion.span>
                    )}
                    {walletState === "connecting" && (
                      <motion.span
                        key="connecting"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        {T.navbar.connecting}
                      </motion.span>
                    )}
                    {walletState === "connected" && (
                      <motion.span
                        key="connected"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono text-xs">{address}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Mobile Hamburger */}
              <motion.button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70"
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-white/[0.06] px-4 pb-6"
          >
            <div className="pt-4 flex flex-col gap-1">
              {T.navbar.links.map((label, i) => (
                <motion.a
                  key={label}
                  href="#"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.04] font-medium transition-colors duration-150"
                >
                  {label}
                </motion.a>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
