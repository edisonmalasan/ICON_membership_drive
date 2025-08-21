import React, { useMemo } from "react";

function buildExtrudeShadow({ layers = 15, color = "rgba(2,3,2,1)" }) {
  const parts = [];
  for (let i = 1; i <= layers; i += 1) {
    const blur = Math.max(0, i - (layers - 3));
    parts.push(`${-i}px ${i}px ${blur}px ${color}`);
  }
  return parts.join(", ");
}

export default function ThreeDText({
  text = "ICON",
  className = "text-6xl md:text-7xl lg:text-8xl font-extrabold",
  skewXDeg = 60,
  skewYDeg = -30, // 330 deg equivalent
  rotateXDeg = 45,
  rotateYDeg = 0,
  rotateZDeg = 0,
  color = "#FBC748ff",
  shadowColor = "rgba(255,255,255,1)",
}) {
  const letters = useMemo(() => text.split(""), [text]);
  const shadow = useMemo(
    () => buildExtrudeShadow({ color: shadowColor }),
    [shadowColor]
  );

  return (
    <div
      className="relative select-none pointer-events-none"
      style={{ perspective: 1000 }}
    >
      <div
        className="flex [transform-style:preserve-3d]"
        style={{
          transform: `skew(${skewXDeg}deg, ${skewYDeg}deg) rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg) rotateZ(${rotateZDeg}deg)`,
        }}
      >
        {letters.map((ch, idx) => (
          <div key={idx} className="px-2 [transform-style:preserve-3d]">
            <span
              className={`block ${className}`}
              style={{
                color,
                textShadow: shadow,
                fontFamily: "Poppins, ui-sans-serif, system-ui",
              }}
            >
              {ch}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
