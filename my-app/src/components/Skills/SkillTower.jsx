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
  cap = "flat",  // "flat" | "crown" | "peak" | "billboard"
  leftPos = 0    // horizontal position as percentage of parent width (0-100)
}) {
  const id = useId();

  // proportions - scaled up for prominence
  const H = Math.round(clamp(120, 650, 200 + level * 280));
  const W = w;
  const SIDE = 10;
  const FACE_W = W - SIDE;
  const R = 2;

  // ----- FACE GEOMETRY -----
  const faceX = SIDE;        // left edge of main face
  const faceW = FACE_W;      // width of main face
  const faceH = H;           // height of main face

  // ----- WINDOW GRID (CENTERED) -----
  const cellW = 11, cellH = 16, gapX = 8, gapY = 8;
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
      $leftPos={leftPos}
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
            <stop offset="0%" stopColor="rgba(255,255,255,.12)" />
            <stop offset="55%" stopColor="rgba(255,255,255,.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id={`${id}-winEdge`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.0)"/>
            <stop offset="60%"  stopColor="rgba(255,255,255,0.55)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.85)"/>
          </linearGradient>
          <linearGradient id={`${id}-winStripe`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.7)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)"/>
          </linearGradient>
          {/* thin building rim highlight at the RIGHT edge */}
          <linearGradient id={`${id}-sunRimRight`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.0)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.45)"/>
          </linearGradient>
        </defs>

        {/* LEFT side face (thin) - shadowed side */}
        <polygon
          points={`2,4 ${SIDE},0 ${SIDE},${H} 2,${H - 2}`}
          fill={`url(#${id}-side)`}
          opacity="0.9"
        />

        {/* MAIN face */}
        <rect x={faceX} y="0" width={faceW} height={H} rx={R} ry={R} fill={`url(#${id}-face)`} />

        {/* edge ambient-occlusion on main face */}
        <rect x={faceX} y="0" width="6" height={H} fill={`url(#${id}-edgeAO)`} />

        {/* right rim highlight (sun on the right) */}
        <rect
          x={faceX + faceW - 8}
          y="0"
          width="8"
          height={H}
          fill={`url(#${id}-sunRimRight)`}
          style={{ mixBlendMode: 'screen' }}
        />

        {/* WINDOWS (centered) */}
        <g shapeRendering="crispEdges">
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const idx = r * cols + c;

              // positions
              const x = originX + c * (cellW + gapX);
              const y = originY + r * (cellH + gapY);

              // base glass vs lit
              const isLit = lit.has(idx);

              // sun-right glare factor: stronger toward RIGHT and TOP
              const colT = cols > 1 ? c / (cols - 1) : 0;      // 0 = left, 1 = right
              const rowT = rows > 1 ? 1 - r / (rows - 1) : 1;  // 0 = bottom, 1 = top
              const glare = Math.min(1, 0.15 + 0.8 * colT * (0.6 + 0.4 * rowT));

              // tiny deterministic jitter so stripes don't align perfectly
              const jitter = ((idx * 16807) % 100) / 100; // 0..1

              return (
                <g key={`${r}-${c}`}>
                  {/* base glass */}
                  <rect
                    x={x} y={y} width={cellW} height={cellH} rx="1" ry="1"
                    fill={`rgba(30,45,70,${0.28 + 0.18 * (1 - glare)})`}
                  />

                  {/* warm interior light (washed slightly by glare) */}
                  {isLit && (
                    <rect
                      x={x + 1} y={y + 1} width={cellW - 2} height={cellH - 2} rx="1" ry="1"
                      fill="rgba(255,230,150,0.85)"
                      style={{ mixBlendMode: 'screen', opacity: 0.85 - glare * 0.35 }}
                    />
                  )}

                  {/* right-edge specular rim */}
                  <rect
                    x={x + cellW * 0.55} y={y + 1}
                    width={cellW * 0.40} height={cellH - 2}
                    fill={`url(#${id}-winEdge)`}
                    style={{ mixBlendMode: 'screen', opacity: 0.55 * glare }}
                  />

                  {/* diagonal glint band (top-right -> bottom-left) */}
                  <polygon
                    points={[
                      `${x + cellW * (0.85 - 0.1 * jitter)},${y + cellH * (0.20 + 0.05 * jitter)}`,
                      `${x + cellW * (1.05 - 0.1 * jitter)},${y + cellH * (0.25 + 0.05 * jitter)}`,
                      `${x + cellW * (0.25 - 0.05 * jitter)},${y + cellH * (0.60 + 0.06 * jitter)}`,
                      `${x + cellW * (0.05 - 0.05 * jitter)},${y + cellH * (0.65 + 0.06 * jitter)}`
                    ].join(' ')}
                    fill={`url(#${id}-winStripe)`}
                    style={{ mixBlendMode: 'screen', opacity: 0.35 * glare }}
                  />
                </g>
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
            <rect x={faceX + faceW/2 - 26} y="16" width="52" height="28" rx="5" fill="rgba(255,255,255,.9)"/>
            <image href={logoSrc} x={faceX + faceW/2 - 20} y="20" width="40" height="20" preserveAspectRatio="xMidYMid meet"/>
          </g>
        )}

        {/* cap variants for silhouette variety */}
        {cap === "crown" && (
          <polygon
            points={`${faceX + faceW/2 - 12},0 ${faceX + faceW/2},-18 ${faceX + faceW/2 + 12},0`}
            fill={palette.accent}
          />
        )}
        {cap === "peak" && (
          <polygon
            points={`${faceX + faceW/2 - 18},0 ${faceX + faceW/2},-24 ${faceX + faceW/2 + 18},0`}
            fill={palette.mid}
          />
        )}
        {cap === "billboard" && (
          <rect x={faceX + faceW/2 - 24} y="-12" width="48" height="12" rx="3" fill={palette.dark} />
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
  position: absolute;
  bottom: 0;
  left: ${({ $leftPos }) => $leftPos}%;
  display: flex;
  align-items: center;
  height: var(--h);

  /* overlap control (fine-tuning) */
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