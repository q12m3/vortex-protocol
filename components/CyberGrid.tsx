// Replace the three ambient divs with a <video> tag for a custom video background.
// Set the video to autoPlay muted loop playsInline with object-fit: cover.

export default function CyberGrid() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Dual-scale SVG cyber grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Small 60px grid */}
          <pattern
            id="small-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(99,102,241,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
          {/* Large 240px grid */}
          <pattern
            id="large-grid"
            width="240"
            height="240"
            patternUnits="userSpaceOnUse"
          >
            <rect width="240" height="240" fill="url(#small-grid)" />
            <path
              d="M 240 0 L 0 0 0 240"
              fill="none"
              stroke="rgba(34,211,238,0.04)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#large-grid)" />
      </svg>

      {/* Ambient blob — violet top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-8%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.18,
        }}
      />

      {/* Ambient blob — cyan center-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: "-12%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle at 60% 50%, rgba(34,211,238,0.15) 0%, transparent 70%)",
          filter: "blur(70px)",
          opacity: 0.15,
        }}
      />

      {/* Ambient blob — purple bottom-center */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          left: "30%",
          width: "60vw",
          height: "40vw",
          background:
            "radial-gradient(circle at 50% 60%, rgba(168,85,247,0.16) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.16,
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(3,7,18,0.7) 100%)",
        }}
      />
    </div>
  )
}
