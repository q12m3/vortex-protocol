"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import Link from "next/link"

// ─── Social icon SVG paths ────────────────────────────────────────────────────

const TG = "https://t.me/q12m3"

const SOCIAL_ICONS = [
  {
    name: "X (Twitter)",
    glow: "rgba(255,255,255,0.4)",
    href: TG,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Telegram",
    glow: "rgba(34,211,238,0.5)",
    href: TG,
    path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
    viewBox: "0 0 24 24",
  },
  {
    name: "Discord",
    glow: "rgba(99,102,241,0.6)",
    href: TG,
    path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
  },
  {
    name: "GitHub",
    glow: "rgba(168,85,247,0.5)",
    href: TG,
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
]

const FOOTER_LINKS = [
  {
    heading: "Protocol",
    links: ["Swap", "Liquidity", "Yield Vaults", "Analytics", "Bridge"],
  },
  {
    heading: "Developers",
    links: ["Documentation", "SDK Reference", "Smart Contracts", "Bug Bounty", "Audits"],
  },
  {
    heading: "Community",
    links: ["Governance", "Forum", "Blog", "Brand Kit", "Careers"],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-white/[0.01] backdrop-blur-sm mt-12">
      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-5">
            <motion.div
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
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
            </motion.div>

            <p className="text-sm text-white/45 leading-relaxed max-w-xs">
              The most capital-efficient concentrated liquidity protocol in DeFi.
              Instant swaps, neural yield routing, and AI security — on 14 chains.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIAL_ICONS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white hover:border-white/[0.18] transition-colors duration-200"
                  whileHover={{
                    y: -2,
                    scale: 1.1,
                    boxShadow: `0 0 14px ${social.glow}`,
                  }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="/contact">
                      <motion.span
                        className="group flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors duration-150 cursor-pointer"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 24 }}
                      >
                        {link}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-white/30">
            <span>© 2024 Vortex Protocol. All rights reserved.</span>
            <div className="flex items-center gap-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <Link
                  key={link}
                  href="/contact"
                  className="hover:text-white/60 transition-colors duration-150"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* All systems operational */}
          <div className="flex items-center gap-2 text-xs text-white/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-emerald-400/80 font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
