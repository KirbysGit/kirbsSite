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
  w = 12,        // width as percentage of container (8-25 recommended)
  cap = "flat",  // "flat" | "crown" | "peak" | "billboard"
  leftPos = 0    // horizontal position as percentage of parent width (0-100)
}) {
  const id = useId();

  // proportions - dramatic height variation
  // Formula: 60 + (level * 520) gives range from 60px to 580px
  // level 0.3 = 216px, level 0.85 = 502px, level 1.0 = 580px
  const H = Math.round(clamp(60, 580, 60 + level * 520));
  
  // Convert percentage width to pixels (assuming ~900px container at 60vw on typical screen)
  // This scales responsively: w=10 becomes 85px, w=18 becomes 153px
  const W = Math.round(w * 8.5);
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

  // Add extra height for cap decorations
  const capHeight = 30; // extra space above for caps
  const totalH = H + capHeight;

  return (
    <Wrap
      style={{ "--h": `${totalH}px` }}
      $z={z}
      $overlap={overlap}
      $scale={scale}
      $brightness={brightness}
      $saturation={saturation}
      $blur={blur}
      $leftPos={leftPos}
    >
      <svg 
        width={W} 
        height={totalH} 
        viewBox={`0 -${capHeight} ${W} ${totalH}`} 
        role="img" 
        aria-label={`${name} building`}
        style={{ overflow: 'visible' }}
      >
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
          {/* Unified sun glare gradient from right */}
          <linearGradient id={`${id}-sunRimRight`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.0)"/>
            <stop offset="60%"  stopColor="rgba(255,255,255,0.25)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.5)"/>
          </linearGradient>
          {/* Clipping path to keep windows within building bounds */}
          <clipPath id={`${id}-buildingClip`}>
            <rect x={faceX} y="0" width={faceW} height={H} rx={R} ry={R} />
          </clipPath>
          {/* Drop shadow for billboard */}
          <filter id={`${id}-billboardShadow`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
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

        {/* WINDOWS (centered) - simplified for performance */}
        <g shapeRendering="crispEdges" clipPath={`url(#${id}-buildingClip)`}>
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const idx = r * cols + c;
              const x = originX + c * (cellW + gapX);
              const y = originY + r * (cellH + gapY);
              const isLit = lit.has(idx);

              return (
                <rect 
                  key={`${r}-${c}`}
                  x={x} 
                  y={y} 
                  width={cellW} 
                  height={cellH} 
                  rx="1" 
                  ry="1"
                  fill={isLit ? "rgba(255,230,150,.75)" : "rgba(35,50,70,.4)"}
                />
              );
            })
          )}
        </g>

        {/* Unified glare overlay - single layer for all windows */}
        <rect 
          x={faceX + faceW * 0.35} 
          y="0" 
          width={faceW * 0.65} 
          height={H} 
          fill={`url(#${id}-sunRimRight)`}
          style={{ mixBlendMode: 'screen' }}
          opacity="0.4"
          clipPath={`url(#${id}-buildingClip)`}
        />

        {/* sheen */}
        <path
          d={`M${faceX + 6},0 L${faceX + faceW * 0.40},0
             L${faceX + faceW * 0.22},${H} L${faceX + 6},${H} Z`}
          fill={`url(#${id}-sheen)`}
          clipPath={`url(#${id}-buildingClip)`}
        />

        {/* Billboard-style logo display */}
        {!!logoSrc && (
          <g>
            {/* Billboard background */}
            <rect 
              x={faceX + faceW/2 - 35} 
              y="20" 
              width="70" 
              height="70" 
              rx="6" 
              fill="rgba(255,255,255,.95)"
              stroke="rgba(0,0,0,.15)"
              strokeWidth="1"
            />
            
            {/* Technology name text */}
            <text
              x={faceX + faceW/2}
              y="38"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="rgba(30,30,30,.9)"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {name}
            </text>
            
            {/* Logo image - larger and centered */}
            <image 
              href={logoSrc} 
              x={faceX + faceW/2 - 24} 
              y="45" 
              width="48" 
              height="38" 
              preserveAspectRatio="xMidYMid meet"
            />
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