"use client"

import { useCursor } from "@/hooks/useCursor"

export default function CursorGlow() {
  const { x, y } = useCursor(0.07)

  return (
    <>
      {/* 600px diffuse outer orb */}
      <div
        className="fixed pointer-events-none z-[9999]"
        aria-hidden="true"
        style={{
          left: x - 300,
          top: y - 300,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(34,211,238,0.06) 40%, transparent 70%)",
          mixBlendMode: "screen",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* 200px tight hot-spot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        aria-hidden="true"
        style={{
          left: x - 100,
          top: y - 100,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(34,211,238,0.14) 35%, transparent 65%)",
          mixBlendMode: "screen",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </>
  )
}
