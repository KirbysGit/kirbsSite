import React, { useId } from "react";
import styled, { keyframes } from "styled-components";

/* ---------- helpers ---------- */
const sizePx = (s) =>
  typeof s === "number"
    ? s
    : s === "large"
    ? 140
    : s === "small"
    ? 80
    : 110; // default medium

/* ---------- SVG Balloon Envelope ---------- */
// Centered-ellipse stack that creates alternating bowed stripes
function BalloonSVG({ w, palette }) {
  const id = useId();
  const H = Math.round(w * 1.06);

  // Outer balloon silhouette - bulbous top, narrower bottom (lightbulb shape)
  const outer =
    "M50 4 C72 4 90 20 94 50 C94 72 86 88 70 98 C62 102 56 104 50 104 C44 104 38 102 30 98 C14 88 6 72 6 50 C6 20 18 4 50 4 Z";

  // Knobs for the ellipse stack
  const KNOBS = {
    cx: 50,         // all ellipses share the same center x
    cy: 55,         // vertical center
    ry: 62,         // tall so caps remain round before clipping
    rxMax: 44,      // width of the widest ellipse near the equator
    rxMin: 6,       // width of the narrowest ellipse at the core
    spreadExp: 0.9, // distribution from outer to inner (1 is linear, <1 packs toward center)
    edgeShade: 0.12,    // per-ellipse side darkening
    centerShine: 0.20,  // per-ellipse center brightening
    rimLeft: 0.24,      // global darker on left
    rimRight: 0.16,     // global brighter on right
  };

  // We will draw largest to smallest so earlier ellipses show at the sides.
  const bands = Math.max(3, palette.length);

  // Outer to inner radius helper
  const rxAt = (i) => {
    // i = 0 is outermost, i = bands - 1 is innermost
    const t = i / (bands - 1); // 0..1
    const s = Math.pow(1 - t, KNOBS.spreadExp);
    return KNOBS.rxMin + (KNOBS.rxMax - KNOBS.rxMin) * s;
  };

  return (
    <SvgWrap width={w} height={H} viewBox="0 0 100 110" aria-label="balloon">
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={outer} />
        </clipPath>

        {/* global left to right rim for volume */}
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={`rgba(0,0,0,${KNOBS.rimLeft})`} />
          <stop offset="0.5" stopColor="rgba(255,255,255,.06)" />
          <stop offset="1" stopColor={`rgba(255,255,255,${KNOBS.rimRight})`} />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        {/* Largest ellipse first, then progressively smaller.
            Each new ellipse covers the middle and leaves the previous color visible at the sides. */}
        {Array.from({ length: bands }, (_, i) => {
          const rx = rxAt(i);
          const fillColor = palette[i % palette.length];
          const shadeId = `${id}-shade-${i}`;

          return (
            <g key={i}>
              {/* Per-ellipse lateral shading so each oval reads rounded */}
              <defs>
                <linearGradient
                  id={shadeId}
                  gradientUnits="userSpaceOnUse"
                  x1={KNOBS.cx - rx}
                  y1="0"
                  x2={KNOBS.cx + rx}
                  y2="0"
                >
                  <stop offset="0" stopColor={`rgba(0,0,0,${KNOBS.edgeShade})`} />
                  <stop offset="0.5" stopColor={`rgba(255,255,255,${KNOBS.centerShine})`} />
                  <stop offset="1" stopColor={`rgba(0,0,0,${KNOBS.edgeShade})`} />
                </linearGradient>
              </defs>

              {/* Base ellipse for this band */}
              <ellipse
                cx={KNOBS.cx}
                cy={KNOBS.cy}
                rx={rx}
                ry={KNOBS.ry}
                fill={fillColor}
              />

              {/* Shading overlay on the same ellipse */}
              <ellipse
                cx={KNOBS.cx}
                cy={KNOBS.cy}
                rx={rx}
                ry={KNOBS.ry}
                fill={`url(#${shadeId})`}
                opacity="0.9"
              />
            </g>
          );
        })}

        {/* Global rim light over everything */}
        <rect x="0" y="0" width="100" height="110" fill={`url(#${id}-rim)`} pointerEvents="none" />
      </g>
    </SvgWrap>
  );
}

/* ---------- component ---------- */
const HotAirBalloon = ({
  top = "10%",
  left = "10%",
  size = "medium",
  palette = ["#E07856", "#FFFFFF", "#E07856", "#FFFFFF", "#E07856", "#FFFFFF"],
  floatMs = 6500,
  delay = "0s",
  logo = null, // Logo image source
  name = "", // Name for tooltip
  tooltipColor = "#1a1a1a", // Brand color for tooltip
}) => {
  const px = sizePx(size);
  
  // Geometry
  const geom = {
    envH: Math.round(px * 1.0),
    ringW: Math.round(px * 0.24),
    ringY: Math.round(px * 0.98),
    basketW: Math.round(px * 0.22),
    basketTop: Math.round(px * 1.28),
    basketH: Math.round(px * 0.18),
    cx: px / 2
  };
  
  return (
    <Wrap style={{ top, left, width: px }} $floatMs={floatMs} $delay={delay} title={name}>
      {/* SVG Balloon Envelope */}
      <BalloonSVG w={px} palette={palette} />

      {/* Logo on balloon */}
      {logo && (
        <LogoOverlay $w={px}>
          <LogoImage src={logo} alt={name} />
        </LogoOverlay>
      )}

      {/* Tooltip */}
      {name && <Tooltip $color={tooltipColor} $w={px}>{name}</Tooltip>}

      {/* Metal attachment ring */}
      <AttachmentRing $w={px} />

      {/* Straight rigging lines */}
      <RiggingSvg
        style={{ left: 0, top: geom.ringY + 2 }}
        viewBox={`0 0 ${px} ${geom.basketTop - geom.ringY}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`cable-${floatMs}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d3632" />
            <stop offset="100%" stopColor="#221f1d" />
          </linearGradient>
        </defs>
        <g stroke={`url(#cable-${floatMs})`} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.9">
          {/* Four straight cables from ring to basket corners */}
          <line x1={geom.cx - geom.ringW / 2 + 2} y1="0" x2={geom.cx - geom.basketW / 2 + 2} y2={geom.basketTop - geom.ringY - 2} />
          <line x1={geom.cx + geom.ringW / 2 - 2} y1="0" x2={geom.cx + geom.basketW / 2 - 2} y2={geom.basketTop - geom.ringY - 2} />
          <line x1={geom.cx - 4} y1="0" x2={geom.cx - 3} y2={geom.basketTop - geom.ringY - 2} />
          <line x1={geom.cx + 4} y1="0" x2={geom.cx + 3} y2={geom.basketTop - geom.ringY - 2} />
        </g>
      </RiggingSvg>

      

      {/* Basket with lip */}
      <Basket $w={px}>
        <BasketLip />
      </Basket>
    </Wrap>
  );
};

export default HotAirBalloon;

/* ---------- styles ---------- */

const float = (ms) => keyframes`
  0%, 100% { transform: translateY(0); }
  25%      { transform: translateY(-8px); }
  50%      { transform: translateY(-4px); }
  75%      { transform: translateY(-10px); }
`;

const Wrap = styled.div`
  position: absolute;
  height: auto;
  z-index: 3;
  opacity: 0.92; /* Atmospheric perspective for distance */
  cursor: pointer;
  will-change: transform;
  
  /* Scale down balloons at 1600px */
  @media (max-width: 1600px) {
    transform: scale(0.88);
  }
  
  /* Animation after scale to preserve both transforms */
  animation: ${({ $floatMs }) => float($floatMs)} ease-in-out infinite;
  animation-duration: ${({ $floatMs }) => `${$floatMs}ms`};
  animation-delay: ${({ $delay }) => $delay};
  
  &:hover {
    opacity: 1;
    z-index: 10;
  }
`;

/* Tooltip fade-in animation */
const tooltipFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(8px) scale(0.9);
  }
  60% {
    transform: translateX(-50%) translateY(0) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
`;

/* Tooltip that appears on hover - positioned below basket */
const Tooltip = styled.div`
  position: absolute;
  top: ${({ $w }) => Math.round($w * 1.46 + 5)}px; /* Below basket */
  left: 50%;
  transform: translateX(-50%);
  background: ${({ $color }) => $color || '#1a1a1a'};
  color: white;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  z-index: 100;
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.3),
    0 0 0 2px rgba(255, 255, 255, 0.1);
  
  ${Wrap}:hover & {
    animation: ${tooltipFadeIn} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }
  
  /* Arrow pointer (pointing up to basket) */
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 7px solid ${({ $color }) => $color || '#1a1a1a'};
    filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.1));
  }
  
  /* Subtle shine effect */
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    height: 40%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), transparent);
    border-radius: 10px 10px 0 0;
    pointer-events: none;
  }
`;

/* SVG Balloon wrapper */
const SvgWrap = styled.svg`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  overflow: visible;
  z-index: 3;
`;

/* Logo overlay on balloon */
const LogoOverlay = styled.div`
  position: absolute;
  left: 50%;
  top: ${({ $w }) => Math.round($w * 0.45)}px;
  transform: translate(-50%, -50%);
  width: ${({ $w }) => Math.round($w * 0.65)}px;
  height: ${({ $w }) => Math.round($w * 0.65)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  pointer-events: none;
`;

const LogoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
`;

/* Metal attachment ring */
const AttachmentRing = styled.div`
  position: absolute;
  left: 50%;
  top: ${({ $w }) => Math.round($w * 0.98)}px;
  transform: translateX(-50%);
  width: ${({ $w }) => Math.round($w * 0.24)}px;
  height: ${({ $w }) => Math.round($w * 0.08)}px;
  background: linear-gradient(180deg, #8b7355, #6b5643, #4a3d2f);
  border: 2px solid rgba(30, 25, 20, 0.6);
  border-radius: 50% / 45%;
  box-shadow: 
    0 3px 6px rgba(0, 0, 0, 0.4),
    inset 0 2px 3px rgba(255, 255, 255, 0.2),
    inset 0 -2px 3px rgba(0, 0, 0, 0.3);
  z-index: 4;
  
  /* Ring texture detail */
  &::before {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50% / 45%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

/* SVG rigging container */
const RiggingSvg = styled.svg`
  position: absolute;
  width: 100%;
  height: auto;
  pointer-events: none;
  z-index: 1;
`;

/* Burner flame animation */
const flicker = keyframes`
  0%, 100% { 
    transform: translateX(-50%) scaleY(0.94) scaleX(0.98);
    opacity: 0.96;
  }
  40% { 
    transform: translateX(-50%) scaleY(1.08) scaleX(1.02);
    opacity: 1;
  }
  70% { 
    transform: translateX(-50%) scaleY(1.0) scaleX(1.0);
    opacity: 0.98;
  }
`;

/* Burner cage with 3D depth */
const BurnerCage = styled.div`
  position: absolute;
  left: 50%;
  top: ${({ $w }) => Math.round($w * 1.20)}px;
  transform: translateX(-50%);
  width: ${({ $w }) => Math.round($w * 0.16)}px;
  height: ${({ $w }) => Math.round($w * 0.12)}px;
  background: linear-gradient(180deg, #9ca5af, #6b747e);
  border: 1.5px solid rgba(30, 30, 35, 0.6);
  border-radius: 2px;
  box-shadow:
    0 3px 8px rgba(0, 0, 0, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3);
  z-index: 3;
  overflow: visible;

  /* Grill pattern */
  &::before {
    content: '';
    position: absolute;
    left: 3px;
    right: 3px;
    top: 3px;
    bottom: 3px;
    background: 
      repeating-linear-gradient(0deg,
        rgba(30, 30, 35, 0.4) 0px,
        rgba(30, 30, 35, 0.4) 1px,
        transparent 1px,
        transparent 4px
      );
  }
`;

/* Cage depth - side panels */
const CageDepth = styled.div`
  /* Left side panel */
  &::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(90deg, #4a5259, #6b747e);
    border-left: 1px solid rgba(30, 30, 35, 0.6);
  }
  
  /* Right side panel */
  &::after {
    content: '';
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(90deg, #6b747e, #4a5259);
    border-right: 1px solid rgba(30, 30, 35, 0.6);
  }
`;

/* Flame inside burner */
const FlameCore = styled.div`
  position: absolute;
  left: 50%;
  top: -2px;
  transform: translateX(-50%);
  width: 70%;
  height: 120%;
  background:
    radial-gradient(ellipse 50% 65% at 50% 30%, 
      #ffffff 0%, 
      #ffeb99 18%,
      #ffc44d 38%, 
      #ff9920 62%, 
      #ff6600 88%,
      #cc4400 100%
    );
  border-radius: 50% 50% 48% 48% / 55% 55% 45% 45%;
  box-shadow: 
    0 0 16px rgba(255, 140, 30, 0.8),
    0 0 8px rgba(255, 200, 100, 0.6);
  animation: ${flicker} 360ms ease-in-out infinite;
  filter: blur(0.3px);
`;

/* Wicker basket with depth */
const Basket = styled.div`
  position: absolute;
  left: 50%;
  top: ${({ $w }) => Math.round($w * 1.28)}px;
  transform: translateX(-50%);
  width: ${({ $w }) => Math.round($w * 0.22)}px;
  height: ${({ $w }) => Math.round($w * 0.18)}px;
  background: linear-gradient(180deg, 
    #8b5e3c 0%,
    #6d4a2e 60%,
    #5a3d25 100%
  );
  border: 1.5px solid rgba(35, 25, 20, 0.7);
  border-radius: 2px;
  box-shadow:
    inset 0 4px 6px rgba(255, 255, 255, 0.08),
    inset 0 -6px 10px rgba(0, 0, 0, 0.4),
    0 6px 14px rgba(0, 0, 0, 0.4);
  z-index: 2;
  overflow: visible;

  /* Wicker weave texture */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(90deg, 
        rgba(25, 18, 12, 0.35) 0px, 
        rgba(25, 18, 12, 0.35) 1px, 
        transparent 1px, 
        transparent 5px
      ),
      repeating-linear-gradient(0deg, 
        rgba(25, 18, 12, 0.3) 0px, 
        rgba(25, 18, 12, 0.3) 1px, 
        transparent 1px, 
        transparent 5px
      );
    opacity: 0.9;
  }
  
  /* Side depth */
  &::after {
    content: '';
    position: absolute;
    left: -2px;
    top: 2px;
    bottom: 2px;
    width: 3px;
    background: linear-gradient(180deg, #5a3d25, #3d2818);
    border-left: 1px solid rgba(25, 18, 12, 0.8);
  }
`;

/* Basket rim/lip */
const BasketLip = styled.div`
  position: absolute;
  left: -4px;
  right: -4px;
  top: -5px;
  height: 6px;
  background: linear-gradient(180deg, #a67448, #8b5e3c, #6d4a2e);
  border: 1.5px solid rgba(35, 25, 20, 0.7);
  border-bottom: none;
  border-radius: 3px 3px 0 0;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.3),
    inset 0 -1px 2px rgba(0, 0, 0, 0.3);
  
  /* Rim detail */
  &::before {
    content: '';
    position: absolute;
    left: 2px;
    right: 2px;
    top: 1px;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
`;
