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
  const capHeight = 
    cap === "spire" ? Math.max(50, Math.round(H * 0.18)) :
    cap === "dome" ? Math.max(28, Math.round(H * 0.08)) :
    cap === "gable" ? 46 : // 8 + 14 + 22 + 2 for ridge
    cap === "ac" ? 14 : // 4 curb + 8 units + 2 extras
    cap === "stairwell" ? 30 : // 5 parapet + 20 box + 5 railing
    cap === "radio" ? 55 : // 5 parapet + 45 tower + 5 antenna
    cap === "watertower" ? 38 : // 5 parapet + 8 legs + 18 tank + 7 roof
    cap === "mansard" ? 28 : // 5 parapet + 18 steep slope + 5 flat top
    cap === "chimney" ? 24 : // 5 parapet + 16 brick chimneys + 3 cap
    30;
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
          
          {/* Cap material gradients */}
          <linearGradient id={`${id}-capFront`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.accent}/>
            <stop offset="100%" stopColor={palette.mid || palette.base}/>
          </linearGradient>
          <linearGradient id={`${id}-capSide`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.dark}/>
            <stop offset="100%" stopColor={palette.mid || palette.base}/>
          </linearGradient>
          <linearGradient id={`${id}-metal`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(215 20% 92%)"/>
            <stop offset="100%" stopColor="hsl(215 12% 70%)"/>
          </linearGradient>
          
          {/* Clipping path to keep windows within building bounds */}
          <clipPath id={`${id}-buildingClip`}>
            <rect x={faceX} y="0" width={faceW} height={H} rx={R} ry={R} />
          </clipPath>
          
          {/* Filters */}
          <filter id={`${id}-billboardShadow`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="g"/>
            <feMerge>
              <feMergeNode in="g"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* --- Dome materials / textures (using building palette) --- */}
          <linearGradient id={`${id}-domeBody`} x1="0%" y1="0%" x2="0%" y2="100%">
            {/* Uses building's palette for cohesive look */}
            <stop offset="0%"   stopColor={palette.accent}/>
            <stop offset="100%" stopColor={palette.mid}/>
          </linearGradient>

          <radialGradient id={`${id}-domeHL`} cx="85%" cy="20%" r="80%">
            {/* sun is to the right → bright there, fading across the dome */}
            <stop offset="0%"   stopColor="rgba(255,255,255,.55)"/>
            <stop offset="45%"  stopColor="rgba(255,255,255,.20)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>

          <linearGradient id={`${id}-rib`} x1="0%" y1="0%" x2="100%" y2="0%">
            {/* Ribs use palette dark to accent - brighter on the right */}
            <stop offset="0%"   stopColor={`${palette.dark}88`}/>
            <stop offset="70%"  stopColor={`${palette.mid}CC`}/>
            <stop offset="100%" stopColor={`${palette.accent}F2`}/>
          </linearGradient>

          <linearGradient id={`${id}-centerRib`} x1="0%" y1="0%" x2="0%" y2="100%">
            {/* vertical gradient for center rib - bright at top (apex), darker at base */}
            <stop offset="0%"   stopColor={`${palette.accent}FF`}/>
            <stop offset="30%"  stopColor={`${palette.base}F2`}/>
            <stop offset="100%" stopColor={`${palette.mid}D9`}/>
          </linearGradient>

          {/* subtle diamond tile (two diagonals) using palette colors */}
          <pattern id={`${id}-domeTileA`} patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)">
            <path d="M0 12 L12 0" stroke={`${palette.accent}48`} strokeWidth="1"/>
          </pattern>
          <pattern id={`${id}-domeTileB`} patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(-45)">
            <path d="M0 12 L12 0" stroke={`${palette.dark}38`} strokeWidth="1"/>
          </pattern>

          {/* curb/slab under the dome */}
          <linearGradient id={`${id}-concrete`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="hsl(220 8% 85%)"/>
            <stop offset="100%" stopColor="hsl(220 8% 70%)"/>
          </linearGradient>
          
          {/* Billboard background with sunlight gradient */}
          <linearGradient id={`${id}-billboardBg`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(235,235,240,1)"/>
            <stop offset="40%" stopColor="rgba(250,250,252,1)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,1)"/>
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

        {/* Logo billboard - flat against building */}
        {!!logoSrc && (() => {
          // Billboard geometry (re-use everywhere below)
          const bbW = 80, bbH = 58;
          const bbX = faceX + faceW/2 - bbW/2;
          const bbY = 32;
          const tooltipId = `tooltip-${id}`;

          return (
            <g className="logo-container">
              {/* Gradient for tooltip pill */}
              <defs>
                <linearGradient id={`${id}-tooltipGrad`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={palette.base}/>
                  <stop offset="50%" stopColor={palette.accent}/>
                  <stop offset="100%" stopColor={palette.mid}/>
                </linearGradient>
              </defs>

              {/* Outer frame border */}
              <rect 
                x={bbX - 2} 
                y={bbY - 2} 
                width={bbW + 4} 
                height={bbH + 4} 
                rx="2" 
                fill={palette.dark}
              />
              
              {/* Inner background with reactive sunlight */}
              <rect 
                x={bbX} 
                y={bbY} 
                width={bbW} 
                height={bbH} 
                rx="1" 
                fill={`url(#${id}-billboardBg)`}
                className="billboard-bg"
              />
              
              {/* Subtle left edge shadow for depth */}
              <rect 
                x={bbX} 
                y={bbY} 
                width="10" 
                height={bbH}
                fill="rgba(0,0,0,.03)"
              />
              
              {/* Subtle right edge sun highlight */}
              <rect 
                x={bbX + bbW - 16} 
                y={bbY} 
                width="16" 
                height={bbH}
                fill="rgba(255,255,255,.4)"
                style={{ mixBlendMode: 'overlay' }}
              />

              {/* Hover darken overlay - subtle grey */}
              <rect 
                x={bbX} 
                y={bbY} 
                width={bbW} 
                height={bbH} 
                rx="1"
                fill="rgba(40,40,40,0)"
                className="billboard-darken"
              />
              
              {/* Logo image */}
              <image 
                href={logoSrc} 
                x={bbX + bbW/2 - 32} 
                y={bbY + 6} 
                width="64" 
                height="46" 
                preserveAspectRatio="xMidYMid meet"
                style={{ cursor: 'pointer', pointerEvents: 'all' }}
              />

              {/* Tooltip - larger pill-shaped with themed gradient */}
              <g className="billboard-tooltip" opacity="0" style={{ pointerEvents: 'none' }}>
                {/* Tooltip shadow */}
                <ellipse
                  cx={faceX + faceW/2}
                  cy={bbY - 20}
                  rx={name.length * 4.2 + 10}
                  ry="12"
                  fill="rgba(0,0,0,.3)"
                  filter="blur(3px)"
                />
                
                {/* Tooltip pill background */}
                <rect
                  x={faceX + faceW/2 - (name.length * 4.2 + 8)}
                  y={bbY - 30}
                  width={name.length * 8.4 + 16}
                  height="20"
                  rx="10"
                  fill={`url(#${id}-tooltipGrad)`}
                  opacity="0.95"
                />
                
                {/* Tooltip border */}
                <rect
                  x={faceX + faceW/2 - (name.length * 4.2 + 8)}
                  y={bbY - 30}
                  width={name.length * 8.4 + 16}
                  height="20"
                  rx="10"
                  fill="none"
                  stroke="rgba(255,255,255,.5)"
                  strokeWidth="0.8"
                />
                
                {/* Subtle highlight on top of pill */}
                <rect
                  x={faceX + faceW/2 - (name.length * 4.2 + 6)}
                  y={bbY - 29}
                  width={name.length * 8.4 + 12}
                  height="8"
                  rx="8"
                  fill="rgba(255,255,255,.2)"
                  style={{ mixBlendMode: 'overlay' }}
                />
                
                {/* Tooltip text - larger */}
                <text
                  x={faceX + faceW/2}
                  y={bbY - 16}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="white"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  style={{ 
                    textShadow: '0 1px 2px rgba(0,0,0,.4)',
                    pointerEvents: 'none'
                  }}
                >
                  {name}
                </text>
              </g>
            </g>
          );
        })()}

        {/* Roof parapet (for all non-flat caps) */}
        {cap !== "flat" && (
          <>
            {/* Left side face of parapet for 3D depth */}
          <polygon
              points={`${faceX - SIDE + 2},-2 ${faceX},-5 ${faceX},0 ${faceX - SIDE + 2},6`}
              fill={`url(#${id}-capSide)`}
              opacity="0.9"
            />
            {/* Front face of parapet */}
            <rect x={faceX} y={-5} width={faceW} height="5" rx="2" fill={`url(#${id}-capFront)`}/>
            {/* Sun highlight on right edge */}
            <rect x={faceX + faceW - 6} y={-5} width="6" height="5"
                  fill={`url(#${id}-sunRimRight)`} style={{ mixBlendMode: 'screen' }}/>
          </>
        )}

        {/* Cap variants */}
        {cap === "spire" && (() => {
          // Empire State Building-style spire
          const tiers = 5;  // More tiers for smoother transition
          const stepH = Math.max(7, Math.round(H * 0.025));
          const stepSkew = Math.max(5, Math.round(faceW * 0.08));
          const inset0 = Math.max(4, Math.round(faceW * 0.08));
          const insetStep = Math.max(2, Math.round(faceW * 0.04));
          const mastH = Math.max(50, Math.round(H * 0.12));
          const mastW = Math.max(4, Math.round(faceW * 0.08));

          return (
            <g aria-label="spire">

              {/* Stepped penthouse tiers */}
              {Array.from({ length: tiers }).map((_, i) => {
                const inset = inset0 + i * insetStep;
                const yTop = -5 - (i + 1) * stepH;
                const wFront = Math.max(8, faceW - inset * 2);
                const xFront = faceX + inset;
                const sideDepth = Math.max(3, SIDE * 0.6); // Proportional to main building side

                // Add small windows to first 3 tiers
                const hasWindows = i < 3;
                const windowCount = Math.floor(wFront / 10);

                return (
                  <g key={i}>
                    {/* LEFT side face matching main building perspective */}
          <polygon
                      points={`
                        ${xFront - sideDepth + 1},${yTop + 2}
                        ${xFront},${yTop}
                        ${xFront},${yTop + stepH}
                        ${xFront - sideDepth + 1},${yTop + stepH - 1}
                      `}
                      fill={`url(#${id}-capSide)`}
                      opacity="0.9"
                    />
                    
                    {/* Main front face */}
                    <rect x={xFront} y={yTop} width={wFront} height={stepH} rx="1"
                          fill={`url(#${id}-capFront)`}/>
                    
                    {/* Edge shadow for depth */}
                    <rect x={xFront} y={yTop} width="2" height={stepH} 
                          fill="rgba(0,0,0,.15)" />
                    
                    {/* Small windows matching building style */}
                    {hasWindows && Array.from({ length: windowCount }).map((__, w) => {
                      // Deterministic "lit" windows
                      const winIdx = i * 10 + w;
                      const isLit = winIdx % 3 === 0;
                      
                      return (
                        <rect
                          key={`win-${i}-${w}`}
                          x={xFront + 3 + w * 10}
                          y={yTop + stepH / 2 - 1.5}
                          width="5"
                          height="3"
                          rx="0.5"
                          fill={isLit ? "rgba(255,230,150,.75)" : "rgba(35,50,70,.4)"}
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Smooth transition collar - centered */}
              <g>
                {/* Left side of collar for depth */}
                <polygon
                  points={`
                    ${faceX + faceW/2 - Math.max(6, mastW * 0.8) - 2},${-5 - tiers * stepH - 5.5}
                    ${faceX + faceW/2 - Math.max(6, mastW * 0.8)},${-5 - tiers * stepH - 6}
                    ${faceX + faceW/2 - Math.max(6, mastW * 0.8)},${-5 - tiers * stepH}
                    ${faceX + faceW/2 - Math.max(6, mastW * 0.8) - 2},${-5 - tiers * stepH - 0.5}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.9"
                />
                {/* Front face of collar */}
                <rect
                  x={faceX + faceW/2 - Math.max(6, mastW * 0.8)}
                  y={-5 - tiers * stepH - 6}
                  width={Math.max(12, mastW * 1.6)}
                  height="6"
                  rx="2"
                  fill={`url(#${id}-capFront)`}
                />
                {/* Edge shadow */}
                <rect
                  x={faceX + faceW/2 - Math.max(6, mastW * 0.8)}
                  y={-5 - tiers * stepH - 6}
                  width="1.5"
                  height="6"
                  fill="rgba(0,0,0,.15)"
                />
              </g>

              {/* Mast shaft - tapered with left side for depth */}
              <g>
                {/* Left side of mast */}
                <polygon
                  points={`
                    ${faceX + faceW/2 - mastW/2 - 1.5},${-5 - tiers * stepH - 6}
                    ${faceX + faceW/2 - mastW/2},${-5 - tiers * stepH - 6}
                    ${faceX + faceW/2 - 2},${-5 - tiers * stepH - 6 - mastH}
                    ${faceX + faceW/2 - 3},${-5 - tiers * stepH - 6 - mastH}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.85"
                />
                {/* Front face of mast */}
                <polygon
                  points={`
                    ${faceX + faceW/2 - mastW/2},${-5 - tiers * stepH - 6}
                    ${faceX + faceW/2 - 2},${-5 - tiers * stepH - 6 - mastH}
                    ${faceX + faceW/2 + 2},${-5 - tiers * stepH - 6 - mastH}
                    ${faceX + faceW/2 + mastW/2},${-5 - tiers * stepH - 6}
                  `}
                  fill={`url(#${id}-metal)`}
                />
              </g>
              
              {/* Sharp pointed needle - centered */}
              <polygon
                points={`
                  ${faceX + faceW/2 - 1.5},${-5 - tiers * stepH - 6 - mastH}
                  ${faceX + faceW/2},${-5 - tiers * stepH - 6 - mastH - 25}
                  ${faceX + faceW/2 + 1.5},${-5 - tiers * stepH - 6 - mastH}
                `}
                fill={`url(#${id}-metal)`}
              />
            </g>
          );
        })()}

        {cap === "crown" && (
          <g aria-label="crown">
            <rect x={faceX+4} y={-15} width={faceW-8} height={10} rx="2" fill={`url(#${id}-capFront)`}/>
            <rect x={faceX+10} y={-22} width={faceW-20} height={7} rx="2" fill={`url(#${id}-capFront)`}/>
            <rect x={faceX+16} y={-26} width={faceW-32} height={4} rx="2" fill={`url(#${id}-capFront)`}/>
          </g>
        )}

        {cap === "peak" && (() => {
          const h = 26;
          const inset = Math.max(6, Math.round(faceW * 0.12));
          return (
            <g aria-label="peak">
              {/* Front face */}
          <polygon
                points={`
                  ${faceX+inset},-4
                  ${faceX+faceW/2},${-h-5}
                  ${faceX+faceW-inset-8},-4
                `}
                fill={`url(#${id}-capFront)`}
              />
              {/* Right face */}
          <polygon
                points={`
                  ${faceX+faceW/2},${-h-5}
                  ${faceX+faceW-inset-8},-4
                  ${faceX+faceW-inset},-2
                `}
                fill={`url(#${id}-capSide)`}
              />
              {/* Beacon */}
              <circle cx={faceX+faceW/2} cy={-h-9} r="2" fill="#ffd66e" filter={`url(#${id}-glow)`}/>
            </g>
          );
        })()}

        {cap === "billboard" && (() => {
          const w = Math.max(56, faceW * 0.8);
          const h = 22;
          const x = faceX + (faceW - w) / 2;
          const y = -h - 11;
          return (
            <g aria-label="billboard">
              {/* Posts */}
              <rect x={x + 10} y={y + h} width="3" height="11" fill={`url(#${id}-metal)`}/>
              <rect x={x + w - 13} y={y + h} width="3" height="11" fill={`url(#${id}-metal)`}/>
              {/* Board */}
              <rect x={x} y={y} width={w} height={h} rx="3" 
                    fill="#fff" stroke="rgba(0,0,0,.15)" strokeWidth="1" />
            </g>
          );
        })()}

        {cap === "gable" && (() => {
          // Slanted triangular roof with depth and perspective
          const parapetH = 8;           // Height of base parapet
          const upperH = 14;            // Height of upper section before roof
          const roofH = 22;             // Height of triangular roof
          const inset = Math.max(6, Math.round(faceW * 0.15)); // Inset for upper section
          const sideDepth = Math.max(3, SIDE * 0.6); // Depth for perspective
          
          const upperW = faceW - inset * 2;
          const upperX = faceX + inset;
          const roofPeakY = -parapetH - upperH - roofH;
          const roofBaseY = -parapetH - upperH;
          
          return (
            <g aria-label="gable roof">
              {/* Base parapet section */}
              <g>
                {/* Left side of base parapet */}
                <polygon
                  points={`
                    ${faceX - sideDepth + 1},${-parapetH + 2}
                    ${faceX},${-parapetH}
                    ${faceX},${0}
                    ${faceX - sideDepth + 1},${-1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.9"
                />
                {/* Front face of base parapet */}
                <rect x={faceX} y={-parapetH} width={faceW} height={parapetH} rx="2" 
                      fill={`url(#${id}-capFront)`}/>
              </g>

              {/* Upper parapet section (inset) */}
              <g>
                {/* Left side of upper parapet */}
                <polygon
                  points={`
                    ${upperX - sideDepth + 1},${roofBaseY + 2}
                    ${upperX},${roofBaseY}
                    ${upperX},${-parapetH}
                    ${upperX - sideDepth + 1},${-parapetH + 1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.9"
                />
                {/* Front face of upper parapet */}
                <rect x={upperX} y={roofBaseY} width={upperW} height={upperH} rx="2" 
                      fill={`url(#${id}-capFront)`}/>
                {/* Edge shadow for depth */}
                <rect x={upperX} y={roofBaseY} width="2" height={upperH} 
                      fill="rgba(0,0,0,.15)"/>
                
                {/* Windows on upper parapet */}
                {(() => {
                  const winW = 4;
                  const winH = 6;
                  const winGap = 7;
                  const winCount = Math.floor((upperW - 8) / (winW + winGap));
                  const startX = upperX + (upperW - (winCount * (winW + winGap) - winGap)) / 2;
                  const winY = roofBaseY + (upperH - winH) / 2;
                  
                  return Array.from({ length: winCount }).map((_, i) => {
                    const isLit = i % 3 === 1; // Some windows are lit
                    return (
                      <rect
                        key={`upper-win-${i}`}
                        x={startX + i * (winW + winGap)}
                        y={winY}
                        width={winW}
                        height={winH}
                        rx="0.5"
                        fill={isLit ? "rgba(255,230,150,.8)" : "rgba(35,50,70,.45)"}
                      />
                    );
                  });
                })()}
              </g>

              {/* Triangular gable roof */}
              <g>
                {/* Solid fill for entire front triangle (prevents transparency) */}
                <polygon
                  points={`
                    ${upperX},${roofBaseY}
                    ${faceX + faceW/2},${roofPeakY}
                    ${upperX + upperW},${roofBaseY}
                  `}
                  fill={`url(#${id}-capFront)`}
                />
                
                {/* Left slanted face of roof (shadowed side for depth) */}
                <polygon
                  points={`
                    ${upperX - sideDepth},${roofBaseY + 1}
                    ${upperX},${roofBaseY}
                    ${faceX + faceW/2},${roofPeakY}
                    ${faceX + faceW/2 - sideDepth * 0.7},${roofPeakY + 1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.85"
                />
                
                {/* Left slanted roof overlay (slightly darker) */}
                <polygon
                  points={`
                    ${upperX},${roofBaseY}
                    ${faceX + faceW/2},${roofPeakY}
                    ${upperX + (upperW * 0.5)},${roofBaseY}
                  `}
                  fill="rgba(0,0,0,.08)"
                />
                
                {/* Sun highlight on right roof slope */}
                <polygon
                  points={`
                    ${faceX + faceW/2},${roofPeakY}
                    ${faceX + faceW/2 + upperW * 0.15},${roofPeakY + roofH * 0.25}
                    ${upperX + upperW},${roofBaseY}
                    ${upperX + upperW * 0.7},${roofBaseY}
                  `}
                  fill={`url(#${id}-sunRimRight)`}
                  style={{ mixBlendMode: 'screen' }}
                  opacity="0.5"
                />
                
                {/* Roof ridge cap */}
                <rect 
                  x={faceX + faceW/2 - 1.5} 
                  y={roofPeakY - 2} 
                  width="3" 
                  height="2" 
                  rx="1"
                  fill={`url(#${id}-metal)`}
                />
              </g>
            </g>
          );
        })()}

        {cap === "ac" && (() => {
          // Rooftop AC/HVAC units with perspective (scaled to 0.5)
          const curbH = 4;
          const unitH = 8;
          const sideDepth = Math.max(2, SIDE * 0.4);
          
          // Create 2-3 AC units depending on building width
          const unitCount = faceW > 100 ? 3 : 2;
          const unitW = Math.max(12, Math.round(faceW * 0.18));
          const spacing = Math.round((faceW - unitCount * unitW) / (unitCount + 1));
          
          return (
            <g aria-label="ac units">
              {/* Roof curb/platform */}
              <g>
                {/* Left side of curb */}
                <polygon
                  points={`
                    ${faceX - sideDepth + 1},${-curbH + 2}
                    ${faceX},${-curbH}
                    ${faceX},${0}
                    ${faceX - sideDepth + 1},${-1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.9"
                />
                {/* Front face of curb */}
                <rect x={faceX} y={-curbH} width={faceW} height={curbH} rx="1" 
                      fill={`url(#${id}-concrete)`}/>
              </g>

              {/* AC Units */}
              {Array.from({ length: unitCount }).map((_, i) => {
                const unitX = faceX + spacing + i * (unitW + spacing);
                const unitY = -curbH - unitH;
                
                return (
                  <g key={i}>
                    {/* Left side face of AC unit (depth) */}
                    <polygon
                      points={`
                        ${unitX - sideDepth + 1},${unitY + 2}
                        ${unitX},${unitY}
                        ${unitX},${-curbH}
                        ${unitX - sideDepth + 1},${-curbH + 1}
                      `}
                      fill={`url(#${id}-capSide)`}
                      opacity="0.85"
                    />
                    
                    {/* Main AC unit body */}
                    <rect 
                      x={unitX} 
                      y={unitY} 
                      width={unitW} 
                      height={unitH} 
                      rx="1.5"
                      fill={`url(#${id}-concrete)`}
                    />
                    
                    {/* Edge shadow for depth */}
                    <rect x={unitX} y={unitY} width="1" height={unitH} 
                          fill="rgba(0,0,0,.2)"/>
                    
                    {/* Louver vents (horizontal lines) - scaled down */}
                    {Array.from({ length: 3 }).map((__, v) => (
                      <rect
                        key={`vent-${v}`}
                        x={unitX + 2}
                        y={unitY + 2 + v * 2}
                        width={unitW - 4}
                        height="0.6"
                        rx="0.3"
                        fill="rgba(0,0,0,.25)"
                      />
                    ))}
                    
                    {/* Fan grille on side - smaller */}
                    <g>
                      <circle 
                        cx={unitX + unitW - 4} 
                        cy={unitY + unitH / 2} 
                        r="2.5" 
                        fill="rgba(0,0,0,.15)"
                        stroke="rgba(0,0,0,.3)"
                        strokeWidth="0.3"
                      />
                      {/* Fan blades */}
                      <path
                        d={`M ${unitX + unitW - 4},${unitY + unitH / 2 - 2} v4`}
                        stroke="rgba(0,0,0,.2)"
                        strokeWidth="0.5"
                      />
                      <path
                        d={`M ${unitX + unitW - 6},${unitY + unitH / 2} h4`}
                        stroke="rgba(0,0,0,.2)"
                        strokeWidth="0.5"
                      />
                    </g>
                    
                    {/* Sun highlight on right edge */}
                    <rect 
                      x={unitX + unitW - 2} 
                      y={unitY} 
                      width="2" 
                      height={unitH}
                      fill={`url(#${id}-sunRimRight)`}
                      style={{ mixBlendMode: 'screen' }}
                      opacity="0.4"
                    />
                  </g>
                );
              })}
            </g>
          );
        })()}

        {cap === "stairwell" && (() => {
          // Fire exit/stairwell structure with rooftop barrier
          const parapetH = 5;
          const boxH = 20;
          const railingH = 5;
          const sideDepth = Math.max(3, SIDE * 0.5);
          
          // Box positioned slightly off-center for visual interest
          const boxW = Math.max(24, Math.round(faceW * 0.35));
          const boxX = faceX + Math.round(faceW * 0.20);
          const boxTopY = -parapetH - boxH;
          
          return (
            <g aria-label="stairwell">
              {/* Base parapet section */}
              <g>
                {/* Left side of parapet */}
                <polygon
                  points={`
                    ${faceX - sideDepth + 1},${-parapetH + 2}
                    ${faceX},${-parapetH}
                    ${faceX},${0}
                    ${faceX - sideDepth + 1},${-1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.9"
                />
                {/* Front face of parapet */}
                <rect x={faceX} y={-parapetH} width={faceW} height={parapetH} rx="2" 
                      fill={`url(#${id}-capFront)`}/>
              </g>

              {/* Stairwell box structure */}
              <g>
                {/* Left side face (depth) */}
                <polygon
                  points={`
                    ${boxX - sideDepth + 1},${boxTopY + 2}
                    ${boxX},${boxTopY}
                    ${boxX},${-parapetH}
                    ${boxX - sideDepth + 1},${-parapetH + 1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.88"
                />
                
                {/* Main stairwell box */}
                <rect 
                  x={boxX} 
                  y={boxTopY} 
                  width={boxW} 
                  height={boxH} 
                  rx="2"
                  fill={`url(#${id}-capFront)`}
                />
                
                {/* Edge shadow for depth */}
                <rect x={boxX} y={boxTopY} width="2" height={boxH} 
                      fill="rgba(0,0,0,.18)"/>
                
                {/* Door to stairwell */}
                <rect
                  x={boxX + boxW / 2 - 6}
                  y={-parapetH - 12}
                  width="12"
                  height="11"
                  rx="1"
                  fill="rgba(40,50,60,.7)"
                />
                {/* Door frame */}
                <rect
                  x={boxX + boxW / 2 - 6}
                  y={-parapetH - 12}
                  width="12"
                  height="11"
                  rx="1"
                  fill="none"
                  stroke={`url(#${id}-metal)`}
                  strokeWidth="0.8"
                />
                
                {/* Small window on door */}
                <rect
                  x={boxX + boxW / 2 - 3}
                  y={-parapetH - 10}
                  width="6"
                  height="4"
                  rx="0.5"
                  fill="rgba(255,230,150,.6)"
                />
                
                {/* Sun highlight on right edge of box */}
                <rect 
                  x={boxX + boxW - 4} 
                  y={boxTopY} 
                  width="4" 
                  height={boxH}
                  fill={`url(#${id}-sunRimRight)`}
                  style={{ mixBlendMode: 'screen' }}
                  opacity="0.45"
                />
              </g>

              {/* Rooftop barrier/railing around perimeter */}
              <g>
                {/* Railing posts across roof edge */}
                {Array.from({ length: Math.floor(faceW / 12) }).map((_, i) => (
                  <rect
                    key={`rail-post-${i}`}
                    x={faceX + 6 + i * 12}
                    y={-parapetH - railingH}
                    width="1.2"
                    height={railingH}
                    fill={`url(#${id}-metal)`}
                  />
                ))}
                
                {/* Top rail */}
                <rect 
                  x={faceX + 6} 
                  y={-parapetH - railingH} 
                  width={faceW - 12} 
                  height="1" 
                  rx="0.5"
                  fill={`url(#${id}-metal)`}
                />
                
                {/* Middle rail */}
                <rect 
                  x={faceX + 6} 
                  y={-parapetH - railingH / 2} 
                  width={faceW - 12} 
                  height="0.8" 
                  rx="0.4"
                  fill={`url(#${id}-metal)`}
                  opacity="0.8"
                />
              </g>
            </g>
          );
        })()}

        {cap === "radio" && (() => {
          // Radio/Cell tower with lattice structure
          const parapetH = 5;
          const towerH = 45;
          const antennaH = 5;
          const sideDepth = Math.max(2, SIDE * 0.3);
          
          // Tower base and dimensions
          const towerBaseW = Math.max(16, Math.round(faceW * 0.20));
          const towerTopW = Math.max(8, Math.round(towerBaseW * 0.5));
          const towerX = faceX + (faceW - towerBaseW) / 2;
          const towerTopY = -parapetH - towerH;
          
          return (
            <g aria-label="radio tower">
              {/* Base parapet */}
              <g>
                <polygon
                  points={`
                    ${faceX - sideDepth + 1},${-parapetH + 2}
                    ${faceX},${-parapetH}
                    ${faceX},${0}
                    ${faceX - sideDepth + 1},${-1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.9"
                />
                <rect x={faceX} y={-parapetH} width={faceW} height={parapetH} rx="2" 
                      fill={`url(#${id}-capFront)`}/>
              </g>

              {/* Tower mounting base */}
              <rect
                x={towerX}
                y={-parapetH - 8}
                width={towerBaseW}
                height="8"
                rx="1"
                fill={`url(#${id}-concrete)`}
              />

              {/* Main lattice tower structure - tapered trapezoid */}
              <g>
                {/* Left side face (depth) */}
                <polygon
                  points={`
                    ${towerX + (towerBaseW - towerTopW) / 2 - sideDepth},${-parapetH - 6}
                    ${towerX + (towerBaseW - towerTopW) / 2},${-parapetH - 8}
                    ${towerX + (towerBaseW - towerTopW) / 2},${towerTopY}
                    ${towerX + (towerBaseW - towerTopW) / 2 - sideDepth + 1},${towerTopY + 1}
                  `}
                  fill={`url(#${id}-metal)`}
                  opacity="0.7"
                />
                
                {/* Front faces of tower legs */}
                {/* Left leg */}
                <polygon
                  points={`
                    ${towerX},${-parapetH - 8}
                    ${towerX + (towerBaseW - towerTopW) / 2},${towerTopY}
                    ${towerX + (towerBaseW - towerTopW) / 2 + 2},${towerTopY}
                    ${towerX + 2},${-parapetH - 8}
                  `}
                  fill={`url(#${id}-metal)`}
                />
                
                {/* Right leg */}
                <polygon
                  points={`
                    ${towerX + towerBaseW - 2},${-parapetH - 8}
                    ${towerX + (towerBaseW + towerTopW) / 2 - 2},${towerTopY}
                    ${towerX + (towerBaseW + towerTopW) / 2},${towerTopY}
                    ${towerX + towerBaseW},${-parapetH - 8}
                  `}
                  fill={`url(#${id}-metal)`}
                />
                
                {/* Lattice cross-bracing */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const yPos = -parapetH - 8 - (i * towerH / 6);
                  const widthAtY = towerBaseW - ((towerBaseW - towerTopW) * (i / 6));
                  const xLeft = towerX + (towerBaseW - widthAtY) / 2;
                  const xRight = xLeft + widthAtY;
                  
                  return (
                    <g key={`brace-${i}`}>
                      {/* Horizontal brace */}
                      <line
                        x1={xLeft}
                        y1={yPos}
                        x2={xRight}
                        y2={yPos}
                        stroke={`url(#${id}-metal)`}
                        strokeWidth="0.8"
                        opacity="0.6"
                      />
                      {/* Diagonal cross */}
                      {i < 5 && (
                        <>
                          <line
                            x1={xLeft}
                            y1={yPos}
                            x2={xRight - (widthAtY - (towerBaseW - ((towerBaseW - towerTopW) * ((i + 1) / 6))))}
                            y2={yPos - towerH / 6}
                            stroke={`url(#${id}-metal)`}
                            strokeWidth="0.6"
                            opacity="0.4"
                          />
                        </>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Antenna array at top */}
              <g>
                {/* Central mast */}
                <rect
                  x={faceX + faceW / 2 - 0.8}
                  y={towerTopY - antennaH - 10}
                  width="1.6"
                  height={antennaH + 10}
                  fill={`url(#${id}-metal)`}
                />
                
                {/* Antenna dishes/panels */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <rect
                    key={`antenna-${i}`}
                    x={faceX + faceW / 2 - 3}
                    y={towerTopY - antennaH + i * 2}
                    width="6"
                    height="1"
                    rx="0.5"
                    fill={`url(#${id}-metal)`}
                  />
                ))}
                
                {/* Top spike */}
                <polygon
                  points={`
                    ${faceX + faceW / 2 - 1},${towerTopY - antennaH - 10}
                    ${faceX + faceW / 2},${towerTopY - antennaH - 16}
                    ${faceX + faceW / 2 + 1},${towerTopY - antennaH - 10}
                  `}
                  fill={`url(#${id}-metal)`}
                />
              </g>

              {/* Warning lights (red) */}
              <g>
                {/* Top warning light */}
                <circle
                  cx={faceX + faceW / 2}
                  cy={towerTopY - 2}
                  r="1.5"
                  fill="#ff3333"
                  filter={`url(#${id}-glow)`}
                />
                
                {/* Mid-tower warning light */}
                <circle
                  cx={faceX + faceW / 2}
                  cy={-parapetH - towerH / 2}
                  r="1.2"
                  fill="#ff3333"
                  filter={`url(#${id}-glow)`}
                  opacity="0.8"
                />
              </g>
            </g>
          );
        })()}

        {cap === "watertower" && (() => {
          // Classic water tower with cylindrical tank - positioned off-center
          const parapetH = 5;
          const legH = 8;
          const tankH = 18;
          const roofH = 7;
          const sideDepth = Math.max(3, SIDE * 0.4);
          
          // Tank dimensions - positioned to the right side
          const tankW = Math.max(20, Math.round(faceW * 0.38));
          const tankX = faceX + Math.round(faceW * 0.55); // Position right of center
          const tankY = -parapetH - legH - tankH;
          
          // Cylindrical appearance radii
          const cylinderRx = tankW * 0.5;
          const cylinderRy = tankH * 0.15;
          
          return (
            <g aria-label="water tower">
              {/* Base parapet */}
              <g>
                <polygon
                  points={`
                    ${faceX - sideDepth + 1},${-parapetH + 2}
                    ${faceX},${-parapetH}
                    ${faceX},${0}
                    ${faceX - sideDepth + 1},${-1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.9"
                />
                <rect x={faceX} y={-parapetH} width={faceW} height={parapetH} rx="2" 
                      fill={`url(#${id}-capFront)`}/>
              </g>

              {/* Support legs structure */}
              <g>
                {/* Four support legs around tank perimeter */}
                {[0, 0.33, 0.67, 1].map((pos, i) => {
                  const legX = tankX + pos * (tankW - 2);
                  return (
                    <rect
                      key={`leg-${i}`}
                      x={legX}
                      y={-parapetH - legH}
                      width="2"
                      height={legH}
                      fill={`url(#${id}-concrete)`}
                      opacity={i === 0 || i === 3 ? 0.8 : 1}
                    />
                  );
                })}
                
                {/* Cross bracing */}
                <line
                  x1={tankX}
                  y1={-parapetH - legH * 0.3}
                  x2={tankX + tankW}
                  y2={-parapetH - legH * 0.7}
                  stroke={`url(#${id}-concrete)`}
                  strokeWidth="1"
                  opacity="0.6"
                />
              </g>

              {/* Cylindrical water tank */}
              <g>
                {/* Left curved side (shadowed depth) */}
                <ellipse
                  cx={tankX + cylinderRx * 0.35}
                  cy={tankY + tankH / 2}
                  rx={cylinderRx * 0.20}
                  ry={tankH * 0.46}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.75"
                />
                
                {/* Main cylindrical body */}
                <rect
                  x={tankX}
                  y={tankY}
                  width={tankW}
                  height={tankH}
                  rx="3"
                  fill={`url(#${id}-concrete)`}
                />
                
                {/* Top ellipse (cylinder cap) */}
                <ellipse
                  cx={tankX + cylinderRx}
                  cy={tankY}
                  rx={cylinderRx}
                  ry={cylinderRy}
                  fill={`url(#${id}-concrete)`}
                />
                {/* Top ellipse rim shadow */}
                <ellipse
                  cx={tankX + cylinderRx}
                  cy={tankY}
                  rx={cylinderRx * 0.85}
                  ry={cylinderRy * 0.8}
                  fill="rgba(0,0,0,.08)"
                />
                
                {/* Metal bands/hoops around tank */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <rect
                    key={`band-${i}`}
                    x={tankX}
                    y={tankY + 4 + i * 6}
                    width={tankW}
                    height="1.5"
                    fill={`url(#${id}-metal)`}
                    opacity="0.7"
                  />
                ))}
                
                {/* Vertical seam lines for cylindrical realism */}
                <line
                  x1={tankX + tankW * 0.3}
                  y1={tankY}
                  x2={tankX + tankW * 0.3}
                  y2={tankY + tankH}
                  stroke="rgba(0,0,0,.08)"
                  strokeWidth="1"
                />
                <line
                  x1={tankX + tankW * 0.7}
                  y1={tankY}
                  x2={tankX + tankW * 0.7}
                  y2={tankY + tankH}
                  stroke="rgba(0,0,0,.08)"
                  strokeWidth="1"
                />
                
                {/* Right curved highlight (sun facing) */}
                <ellipse
                  cx={tankX + tankW - cylinderRx * 0.25}
                  cy={tankY + tankH / 2}
                  rx={cylinderRx * 0.25}
                  ry={tankH * 0.42}
                  fill={`url(#${id}-sunRimRight)`}
                  style={{ mixBlendMode: 'screen' }}
                  opacity="0.55"
                />
              </g>

              {/* Conical roof */}
              <g>
                {/* Left side of cone (3D depth) */}
                <polygon
                  points={`
                    ${tankX - sideDepth * 0.6},${tankY + 1}
                    ${tankX},${tankY}
                    ${tankX + cylinderRx},${tankY - roofH}
                    ${tankX + cylinderRx - sideDepth * 0.5},${tankY - roofH + 1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.75"
                />
                
                {/* Front left slope (shadowed) */}
                <polygon
                  points={`
                    ${tankX},${tankY}
                    ${tankX + cylinderRx},${tankY - roofH}
                    ${tankX + tankW / 2},${tankY}
                  `}
                  fill={`url(#${id}-concrete)`}
                  opacity="0.88"
                />
                
                {/* Front right slope (sun facing) */}
                <polygon
                  points={`
                    ${tankX + cylinderRx},${tankY - roofH}
                    ${tankX + tankW},${tankY}
                    ${tankX + tankW / 2},${tankY}
                  `}
                  fill={`url(#${id}-concrete)`}
                />
                
                {/* Sun highlight on right slope */}
                <polygon
                  points={`
                    ${tankX + cylinderRx},${tankY - roofH}
                    ${tankX + cylinderRx + tankW * 0.12},${tankY - roofH * 0.5}
                    ${tankX + tankW},${tankY}
                    ${tankX + tankW * 0.7},${tankY}
                  `}
                  fill={`url(#${id}-sunRimRight)`}
                  style={{ mixBlendMode: 'screen' }}
                  opacity="0.65"
                />
                
                {/* Finial at peak */}
                <circle
                  cx={tankX + cylinderRx}
                  cy={tankY - roofH - 1.5}
                  r="1.8"
                  fill={`url(#${id}-metal)`}
                />
              </g>
            </g>
          );
        })()}

        {cap === "mansard" && (() => {
          // French mansard roof with steep slopes and dormers
          const parapetH = 5;
          const slopeH = 18;
          const flatTopH = 5;
          const sideDepth = Math.max(3, SIDE * 0.5);
          
          // Mansard dimensions - creates steep inward slope
          const baseW = faceW;
          const topInset = Math.max(8, Math.round(faceW * 0.25));
          const topW = faceW - topInset * 2;
          const topX = faceX + topInset;
          const slopeTopY = -parapetH - slopeH;
          
          return (
            <g aria-label="mansard roof">
              {/* Base parapet */}
              <g>
                <polygon
                  points={`
                    ${faceX - sideDepth + 1},${-parapetH + 2}
                    ${faceX},${-parapetH}
                    ${faceX},${0}
                    ${faceX - sideDepth + 1},${-1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.9"
                />
                <rect x={faceX} y={-parapetH} width={faceW} height={parapetH} rx="2" 
                      fill={`url(#${id}-capFront)`}/>
              </g>

              {/* Steep mansard slope */}
              <g>
                {/* Left side face (depth) */}
                <polygon
                  points={`
                    ${faceX - sideDepth + 1},${-parapetH + 1}
                    ${faceX},${-parapetH}
                    ${topX},${slopeTopY}
                    ${topX - sideDepth * 0.7 + 1},${slopeTopY + 1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.88"
                />
                
                {/* Main steep slope face */}
                <polygon
                  points={`
                    ${faceX},${-parapetH}
                    ${topX},${slopeTopY}
                    ${topX + topW},${slopeTopY}
                    ${faceX + faceW},${-parapetH}
                  `}
                  fill={`url(#${id}-capFront)`}
                />
                
                {/* Edge shadow for depth */}
                <polygon
                  points={`
                    ${faceX},${-parapetH}
                    ${topX},${slopeTopY}
                    ${topX + 2},${slopeTopY}
                    ${faceX + 2},${-parapetH}
                  `}
                  fill="rgba(0,0,0,.15)"
                />
                
                {/* Sun highlight on right portion */}
                <polygon
                  points={`
                    ${topX + topW * 0.6},${slopeTopY}
                    ${topX + topW},${slopeTopY}
                    ${faceX + faceW},${-parapetH}
                    ${faceX + faceW - topInset * 0.4},${-parapetH}
                  `}
                  fill={`url(#${id}-sunRimRight)`}
                  style={{ mixBlendMode: 'screen' }}
                  opacity="0.5"
                />
              </g>

              {/* Dormer windows on slope */}
              <g>
                {Array.from({ length: Math.floor(faceW / 35) }).map((_, i) => {
                  const dormerCount = Math.floor(faceW / 35);
                  const spacing = (faceW - dormerCount * 8) / (dormerCount + 1);
                  const dormerX = faceX + spacing + i * (8 + spacing);
                  
                  // Calculate Y position on the slope
                  const progressAcross = (dormerX - faceX) / faceW;
                  const dormerBaseY = -parapetH - slopeH * 0.4;
                  const dormerTopY = dormerBaseY - 6;
                  
                  return (
                    <g key={`dormer-${i}`}>
                      {/* Dormer window */}
                      <rect
                        x={dormerX}
                        y={dormerBaseY}
                        width="8"
                        height="5"
                        rx="0.8"
                        fill="rgba(40,50,65,.75)"
                      />
                      {/* Window pane */}
                      <rect
                        x={dormerX + 1.5}
                        y={dormerBaseY + 1}
                        width="5"
                        height="3"
                        rx="0.5"
                        fill="rgba(255,230,150,.65)"
                      />
                      {/* Dormer roof peak */}
                      <polygon
                        points={`
                          ${dormerX - 0.5},${dormerBaseY}
                          ${dormerX + 4},${dormerTopY}
                          ${dormerX + 8.5},${dormerBaseY}
                        `}
                        fill={`url(#${id}-capFront)`}
                      />
                    </g>
                  );
                })}
              </g>

              {/* Flat top section */}
              <g>
                {/* Left side of flat top (depth) */}
                <polygon
                  points={`
                    ${topX - sideDepth * 0.7 + 1},${slopeTopY + 1}
                    ${topX},${slopeTopY}
                    ${topX},${slopeTopY - flatTopH}
                    ${topX - sideDepth * 0.7 + 1},${slopeTopY - flatTopH + 1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.85"
                />
                
                {/* Flat top face */}
                <rect
                  x={topX}
                  y={slopeTopY - flatTopH}
                  width={topW}
                  height={flatTopH}
                  rx="1"
                  fill={`url(#${id}-capFront)`}
                />
                
                {/* Chimney or vent */}
                <rect
                  x={topX + topW / 2 - 2}
                  y={slopeTopY - flatTopH - 4}
                  width="4"
                  height="4"
                  rx="0.5"
                  fill={`url(#${id}-concrete)`}
                />
              </g>
            </g>
          );
        })()}

        {cap === "chimney" && (() => {
          // Two brick chimneys - classic NYC rooftop style
          const parapetH = 5;
          const chimneyH = 16;
          const capH = 3;
          const sideDepth = Math.max(3, SIDE * 0.45);
          
          // Two chimney positions - spaced apart
          const chimneyW = Math.max(8, Math.round(faceW * 0.15));
          const spacing = Math.round(faceW * 0.20);
          const chimney1X = faceX + spacing;
          const chimney2X = faceX + faceW - spacing - chimneyW;
          const chimneyTopY = -parapetH - chimneyH;
          
          // Brick pattern gradient (reddish-brown)
          const brickGradient = {
            base: "hsl(10, 45%, 42%)",
            dark: "hsl(10, 40%, 32%)",
            light: "hsl(10, 50%, 52%)"
          };
          
          return (
            <g aria-label="brick chimneys">
              {/* Base parapet */}
              <g>
                <polygon
                  points={`
                    ${faceX - sideDepth + 1},${-parapetH + 2}
                    ${faceX},${-parapetH}
                    ${faceX},${0}
                    ${faceX - sideDepth + 1},${-1}
                  `}
                  fill={`url(#${id}-capSide)`}
                  opacity="0.9"
                />
                <rect x={faceX} y={-parapetH} width={faceW} height={parapetH} rx="2" 
                      fill={`url(#${id}-capFront)`}/>
              </g>

              {/* Render both chimneys */}
              {[chimney1X, chimney2X].map((chimneyX, idx) => (
                <g key={`chimney-${idx}`}>
                  {/* Left side face (depth) - darkest for shadow */}
                  <polygon
                    points={`
                      ${chimneyX - sideDepth + 1},${-parapetH + 2}
                      ${chimneyX},${-parapetH}
                      ${chimneyX},${chimneyTopY}
                      ${chimneyX - sideDepth + 1},${chimneyTopY + 1}
                    `}
                    fill={brickGradient.dark}
                    opacity="0.85"
                  />
                  
                  {/* Solid brick background */}
                  <rect
                    x={chimneyX}
                    y={-parapetH - chimneyH}
                    width={chimneyW}
                    height={chimneyH}
                    fill={brickGradient.base}
                  />
                  
                  {/* Horizontal mortar lines */}
                  {Array.from({ length: 7 }).map((_, i) => {
                    const rowH = chimneyH / 8;
                    return (
                      <rect
                        key={`mortar-h-${i}`}
                        x={chimneyX}
                        y={-parapetH - chimneyH + (i + 1) * rowH}
                        width={chimneyW}
                        height="0.8"
                        fill="rgba(220, 210, 200, 0.6)"
                      />
                    );
                  })}
                  
                  {/* Vertical mortar seams - staggered running bond pattern */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const rowH = chimneyH / 8;
                    const rowY = -parapetH - chimneyH + i * rowH;
                    // Alternate rows: center seam vs. no seam (full brick)
                    if (i % 2 === 1) {
                      return (
                        <rect
                          key={`seam-v-${i}`}
                          x={chimneyX + chimneyW / 2 - 0.4}
                          y={rowY}
                          width="0.8"
                          height={rowH}
                          fill="rgba(220, 210, 200, 0.6)"
                        />
                      );
                    }
                    return null;
                  })}
                  
                  {/* Left edge shadow for depth */}
                  <rect
                    x={chimneyX}
                    y={-parapetH - chimneyH}
                    width="1.5"
                    height={chimneyH}
                    fill="rgba(0, 0, 0, 0.25)"
                  />
                  
                  {/* Right edge sun highlight */}
                  <rect
                    x={chimneyX + chimneyW - 3}
                    y={-parapetH - chimneyH}
                    width="3"
                    height={chimneyH}
                    fill={`url(#${id}-sunRimRight)`}
                    style={{ mixBlendMode: 'screen' }}
                    opacity="0.4"
                  />
                  
                  {/* Chimney cap (concrete) */}
                  <g>
                    {/* Left side of cap */}
                    <polygon
                      points={`
                        ${chimneyX - sideDepth * 0.6},${chimneyTopY + 1}
                        ${chimneyX - 1},${chimneyTopY}
                        ${chimneyX - 1},${chimneyTopY - capH}
                        ${chimneyX - sideDepth * 0.6},${chimneyTopY - capH + 1}
                      `}
                      fill={`url(#${id}-capSide)`}
                      opacity="0.85"
                    />
                    
                    {/* Cap face - slightly wider than chimney */}
                    <rect
                      x={chimneyX - 1}
                      y={chimneyTopY - capH}
                      width={chimneyW + 2}
                      height={capH}
                      rx="0.5"
                      fill={`url(#${id}-concrete)`}
                    />
                    
                    {/* Cap top edge */}
                    <rect
                      x={chimneyX - 1}
                      y={chimneyTopY - capH}
                      width={chimneyW + 2}
                      height="0.8"
                      fill="rgba(255, 255, 255, 0.2)"
                    />
                  </g>
                </g>
              ))}
            </g>
          );
        })()}

        {cap === "dome" && (() => {
          const baseY  = -5;                               // sits on your parapet line
          const domeW  = faceW * 0.95;                     // Wider - fits building better
          const domeH  = Math.max(18, Math.round(H * 0.08)); // Shorter dome
          const cx     = faceX + faceW/2;
          const left   = cx - domeW/2;
          const right  = cx + domeW/2;
          const apexY  = baseY - domeH;
          const clipId = `${id}-domeClip`;

          const ribCount = 5;                               // 6 ribs per side
          const ribSpacing = domeW / (ribCount * 2);        // Spread to edges

          // path for the upper half of an ellipse (closed to the base to allow fills)
          const domePath = `M ${left},${baseY} A ${domeW/2} ${domeH} 0 0 1 ${right},${baseY} L ${left},${baseY} Z`;

          return (
            <g aria-label="dome">
              

              {/* make a clip so textures & highlights stay inside */}
              <clipPath id={clipId}><path d={domePath}/></clipPath>

              {/* dome body */}
              <path d={domePath} fill={`url(#${id}-domeBody)`}/>

              {/* faint diamond tile (two passes) */}
              <rect x={left} y={apexY} width={domeW} height={domeH}
                    fill={`url(#${id}-domeTileA)`} clipPath={`url(#${clipId})`} opacity=".25"/>
              <rect x={left} y={apexY} width={domeW} height={domeH}
                    fill={`url(#${id}-domeTileB)`} clipPath={`url(#${clipId})`} opacity=".22"/>

              {/* meridian ribs → converge from base to center apex */}
              <g clipPath={`url(#${clipId})`}>
                {/* --- Curved center hero rib from finial tip to base --- */}
                {(() => {
                  // Tip of your finial (matches the triangle apex you use below)
                  const finialTopY = apexY;

                  // How much the rib bows to the right (increase for more curve)
                  const centerRibBow = domeW * 0.02;      // ~12% of width
                  const ctrlY        = apexY + domeH * 0.35; // control point ~1/3 down the dome

                  // A little shadow under the gold rib for volume
                  const ribCurve = `M ${cx},${finialTopY} Q ${cx + centerRibBow},${ctrlY} ${cx + 3},${baseY}`;
                  return (
                    <>
                      <path d={ribCurve}
                            stroke="rgba(120,90,30,.25)" strokeWidth="4"
                            strokeLinecap="round" fill="none" />
                      <path d={ribCurve}
                            stroke={`url(#${id}-centerRib)`} strokeWidth="2.6"
                            strokeLinecap="round" fill="none" />
                    </>
                  );
                })()}

                {/* Side ribs - all converge to center apex like meridians */}
                {Array.from({length: ribCount}).map((_, i) => {
                  const xOffset = (i + 2) * ribSpacing;
                  const xL = cx - xOffset;
                  const xR = cx + xOffset;
                  
                  const normalizedDist = xOffset / (domeW/2);
                  
                  // Control point creates the curved path toward apex
                  // Position it 2/3 up the dome and slightly toward center
                  const controlY = baseY - domeH * 0.65;
                  const controlXL = xL + (cx - xL) * 0.25; // 25% toward center
                  const controlXR = xR - (xR - cx) * 0.25;
                  
                  const w = Math.max(1.2, 2 - normalizedDist * 0.7);
                  const op = Math.max(.55, 1 - normalizedDist * 0.4);

                  return (
                    <g key={i}>
                      {/* Left rib - curves from base to center apex */}
                      <path 
                        d={`M ${xL},${baseY} Q ${controlXL},${controlY} ${cx},${apexY}`}
                        stroke={`url(#${id}-rib)`} 
                        strokeWidth={w} 
                        opacity={op}
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Right rib - curves from base to center apex */}
                      <path 
                        d={`M ${xR},${baseY} Q ${controlXR},${controlY} ${cx},${apexY}`}
                        stroke={`url(#${id}-rib)`} 
                        strokeWidth={w} 
                        opacity={op}
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  );
                })}
              </g>

              {/* sun highlight on the right hemisphere */}
              <ellipse cx={cx + domeW*0.15} cy={apexY + domeH*0.55} rx={domeW*0.45} ry={domeH*0.85}
                       fill={`url(#${id}-domeHL)`} clipPath={`url(#${clipId})`}
                       style={{ mixBlendMode: 'screen' }}/>

              {/* small finial/needle */}
              <g>
                <circle cx={cx} cy={apexY - 2} r="2.2" fill={`url(#${id}-metal)`}/>
                <rect x={cx-0.8} y={apexY-14} width="1.6" height="12" rx="0.8" fill={`url(#${id}-metal)`}/>
                <polygon points={`${cx-1},${apexY-14} ${cx},${apexY-24} ${cx+1},${apexY-14}`} fill={`url(#${id}-metal)`}/>
              </g>
            </g>
          );
        })()}

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

  /* Logo hover effect - darken background and show tooltip */
  @media (hover:hover) {
    .logo-container {
      isolation: isolate;
    }
    
    .billboard-darken {
      transition: fill .3s ease;
      will-change: fill;
    }
    
    .billboard-tooltip {
      transition: opacity .3s ease, transform .3s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform: translateY(0);
      will-change: opacity, transform;
    }
    
    .logo-container:hover .billboard-darken {
      fill: rgba(40,40,40,.12);
    }
    
    .logo-container:hover .billboard-tooltip {
      opacity: 1;
      transform: translateY(-4px);
    }
  }
`;

// utils
function clamp(min, max, v) {
  return Math.max(min, Math.min(max, v));
}