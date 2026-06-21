import type { Metadata } from "next"
import { Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Vortex Protocol — Liquid Liquidity Engine",
    template: "%s | Vortex Protocol",
  },
  description:
    "The most capital-efficient AMM in DeFi. Concentrated liquidity positions, neural rebalancing, and cross-chain atomic swaps across 14 EVM networks.",
  metadataBase: new URL("https://vortexprotocol.xyz"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="bg-[#030712] text-white antialiased font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
