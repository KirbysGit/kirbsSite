// SkillTower.jsx
import React, { useId, useMemo } from "react";
import styled from "styled-components";

export default function SkillTower({
  name = "React",
  logoSrc = "",
  level = 0.85, // 0..1 -> height
  palette = { base:"#6EC1FF", mid:"#4A98E6", dark:"#2C6FB5", accent:"#B8E3FF" },
  /* NEW: visual stacking controls */
  overlap = 0,   // e.g. -20 to overlap the next tower a bit
  depth = 1,     // 0..1 (0 = far/back, 1 = front)
  w = 76,        // width override
  cap = "flat"   // "flat" | "crown" | "peak" | "billboard"
}) {
  const id = useId();

  // proportions
  const H = Math.round(clamp(80, 500, 140 + level * 140));
  const W = w;
  const SIDE = 10;
  const FACE_W = W - SIDE;
  const R = 2;

  // ----- FACE GEOMETRY -----
  const faceX = SIDE;        // left edge of main face
  const faceW = FACE_W;      // width of main face
  const faceH = H;           // height of main face

  // ----- WINDOW GRID (CENTERED) -----
  const cellW = 8, cellH = 12, gapX = 6, gapY = 6;
  const cols = Math.floor((faceW + gapX) / (cellW + gapX));
  const rows = Math.floor((faceH + gapY) / (cellH + gapY));

  const gridW = cols * cellW + (cols - 1) * gapX;
  const gridH = rows * cellH + (rows - 1) * gapY;

  const minPadX = 8;   // keep away from rounded corner/edge AO
  const minPadY = 12;

  // centered origin inside the face
  const originX = faceX + Math.max(minPadX, Math.round((faceW - gridW) / 2));
  const originY = Math.max(minPadY, Math.round((faceH - gridH) / 2));

  // deterministic lit windows
  const lit = useMemo(() => {
    const set = new Set();
    const total = rows * cols;
    const count = Math.max(2, Math.floor(total * 0.10));
    let seed = Math.floor(level * 997);
    for (let i = 0; i < count; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      set.add(seed % total);
    }
    return set;
  }, [rows, cols, level]);

  // depth → z-index & styling
  const z = 100 + Math.round(depth * 1000);
  const scale = 0.92 + depth * 0.08; // 0.92..1.00
  
  // atmospheric perspective for distant buildings
  const brightness = depth < 0.5 ? 1.06 : 0.9 + depth * 0.1; // 0.9..1.0
  const saturation = depth < 0.5 ? 0.75 : 0.9 + depth * 0.1; // 0.9..1.0
  const blur = depth < 0.5 ? 0.2 : 0; // slight blur for distant buildings

  return (
    <Wrap
      style={{ "--h": `${H}px` }}
      $z={z}
      $overlap={overlap}
      $scale={scale}
      $brightness={brightness}
      $saturation={saturation}
      $blur={blur}
    >
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${name} building`}>
        <defs>
          <linearGradient id={`${id}-face`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.accent} />
            <stop offset="100%" stopColor={palette.base} />
          </linearGradient>
          <linearGradient id={`${id}-side`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.dark} />
            <stop offset="100%" stopColor={palette.mid || palette.base} />
          </linearGradient>
          <linearGradient id={`${id}-edgeAO`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,.18)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <linearGradient id={`${id}-sheen`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,.22)" />
            <stop offset="55%" stopColor="rgba(255,255,255,.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* LEFT side face (thin) */}
        <polygon
          points={`2,4 ${SIDE},0 ${SIDE},${H} 2,${H - 2}`}
          fill={`url(#${id}-side)`}
        />

        {/* MAIN face */}
        <rect x={faceX} y="0" width={faceW} height={H} rx={R} ry={R} fill={`url(#${id}-face)`} />

        {/* edge ambient-occlusion on main face */}
        <rect x={faceX} y="0" width="6" height={H} fill={`url(#${id}-edgeAO)`} />

        {/* WINDOWS (centered) */}
        <g shapeRendering="crispEdges">
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const idx = r * cols + c;
              const x = originX + c * (cellW + gapX);
              const y = originY + r * (cellH + gapY);
              const fill = lit.has(idx)
                ? "rgba(255,238,170,.95)"
                : "rgba(210,230,255,.22)";
              return (
                <rect key={`${r}-${c}`} x={x} y={y} width={cellW} height={cellH} rx="1" ry="1" fill={fill} />
              );
            })
          )}
        </g>

        {/* sheen */}
        <path
          d={`M${faceX + 6},0 L${faceX + faceW * 0.40},0
             L${faceX + faceW * 0.22},${H} L${faceX + 6},${H} Z`}
          fill={`url(#${id}-sheen)`}
        />

        {/* logo plaque */}
        {!!logoSrc && (
          <g>
            <rect x={faceX + faceW/2 - 18} y="12" width="36" height="20" rx="4" fill="rgba(255,255,255,.9)"/>
            <image href={logoSrc} x={faceX + faceW/2 - 14} y="15" width="28" height="14" preserveAspectRatio="xMidYMid meet"/>
          </g>
        )}

        {/* cap variants for silhouette variety */}
        {cap === "crown" && (
          <polygon
            points={`${faceX + faceW/2 - 8},0 ${faceX + faceW/2},-12 ${faceX + faceW/2 + 8},0`}
            fill={palette.accent}
          />
        )}
        {cap === "peak" && (
          <polygon
            points={`${faceX + faceW/2 - 12},0 ${faceX + faceW/2},-16 ${faceX + faceW/2 + 12},0`}
            fill={palette.mid}
          />
        )}
        {cap === "billboard" && (
          <rect x={faceX + faceW/2 - 16} y="-8" width="32" height="8" rx="2" fill={palette.dark} />
        )}

        {/* hairline for crisper edges */}
        <rect x={faceX + .25} y=".25" width={faceW - .5} height={H - .5} rx={R-1} ry={R-1}
              fill="none" stroke="rgba(0,0,0,.12)" strokeWidth=".5" />
      </svg>
    </Wrap>
  );
}

/* ---------- styled ---------- */

const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: var(--h);

  /* overlap control */
  margin-left: ${({ $overlap }) => ($overlap ? `${$overlap}px` : "0")};

  /* depth look */
  z-index: ${({ $z }) => $z};
  transform: scale(${({ $scale }) => $scale});
  filter: brightness(${({ $brightness }) => $brightness}) saturate(${({ $saturation }) => $saturation}) blur(${({ $blur }) => $blur}px);

  transition: transform .25s ease, filter .25s ease, z-index .1s ease;

  /* Bring forward on hover */
  @media (hover:hover) {
    &:hover {
      z-index: 9999;
      transform: scale(1.03);
      filter: brightness(1) saturate(1) blur(0px);
    }
  }
`;

// utils
function clamp(min, max, v) {
  return Math.max(min, Math.min(max, v));
}