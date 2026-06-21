"use client"

import { useState, useEffect, useRef } from "react"

export function useCountUp(
  target: number,
  duration: number = 2000,
  startTrigger: boolean = true,
  decimals: number = 0
): string {
  const [count, setCount] = useState<number>(0)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!startTrigger) return

    startTimeRef.current = null
    setCount(0)

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // EaseOut cubic: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target

      setCount(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, startTrigger])

  return count.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
