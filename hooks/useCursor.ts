"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export interface CursorPosition {
  x: number
  y: number
  rawX: number
  rawY: number
}

export function useCursor(lerpFactor: number = 0.07): CursorPosition {
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [position, setPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  })

  const animate = useCallback(() => {
    currentRef.current.x +=
      (targetRef.current.x - currentRef.current.x) * lerpFactor
    currentRef.current.y +=
      (targetRef.current.y - currentRef.current.y) * lerpFactor

    setPosition({
      x: currentRef.current.x,
      y: currentRef.current.y,
      rawX: targetRef.current.x,
      rawY: targetRef.current.y,
    })

    rafRef.current = requestAnimationFrame(animate)
  }, [lerpFactor])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return position
}
