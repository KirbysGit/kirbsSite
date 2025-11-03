// hotairballoon.jsx

// this took so long, was trying to find a workaround 
// imports.
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
    : 110;

/* ---------- svg balloon envelope ---------- */

// centered-ellipse stack that creates alternating bowed stripes.
function BalloonSVG({ w, palette }) {
  const id = useId();
  const H = Math.round(w * 1.06);

  // outer balloon silhouette - bulbous top, narrower bottom (lightbulb shape).
  const outer =
    "M50 4 C72 4 90 20 94 50 C94 72 86 88 70 98 C62 102 56 104 50 104 C44 104 38 102 30 98 C14 88 6 72 6 50 C6 20 18 4 50 4 Z";

  // knobs for the ellipse stack.
  const KNOBS = {
    cx: 50,             // all ellipses share the same center x
    cy: 55,             // vertical center
    ry: 62,         	// tall so caps remain round before clipping
    rxMax: 44,      	// width of the widest ellipse near the equator
    rxMin: 6,       	// width of the narrowest ellipse at the core
    spreadExp: 0.9, 	// distribution from outer to inner (1 is linear, <1 packs toward center)
    edgeShade: 0.12,    // per-ellipse side darkening
    centerShine: 0.20,  // per-ellipse center brightening
    rimLeft: 0.24,      // global darker on left
    rimRight: 0.16,     // global brighter on right
  };

  // draw largest to smallest so earlier ellipses show on the sides.
  const bands = Math.max(3, palette.length);

  // outer to inner radius helper.
  const rxAt = (i) => {
    // i = 0 is outermost, i = bands - 1 is innermost
    const t = i / (bands - 1); // 0..1
    const s = Math.pow(1 - t, KNOBS.spreadExp);
    return KNOBS.rxMin + (KNOBS.rxMax - KNOBS.rxMin) * s;
  };

  return (
    <SvgWrap width={w} height={H} viewBox="0 0 100 110" aria-label="balloon">
      {/* global left to right rim for volume */}
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={outer} />
        </clipPath>

        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={`rgba(0,0,0,${KNOBS.rimLeft})`} />
          <stop offset="0.5" stopColor="rgba(255,255,255,.06)" />
          <stop offset="1" stopColor={`rgba(255,255,255,${KNOBS.rimRight})`} />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        {/* largest ellipse first, then progressively smaller.
            each new ellipse covers the middle and leaves the previous color visible on the sides. */}
        {Array.from({ length: bands }, (_, i) => {
          const rx = rxAt(i);
          const fillColor = palette[i % palette.length];
          const shadeId = `${id}-shade-${i}`;

          return (
            <g key={i}>
              {/* per-ellipse lateral shading so each oval reads rounded. */}
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

              {/* base ellipse for this band. */}
              <ellipse
                cx={KNOBS.cx}
                cy={KNOBS.cy}
                rx={rx}
                ry={KNOBS.ry}
                fill={fillColor}
              />

              {/* shading overlay on the same ellipse. */}
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

        {/* global rim light over everything. */}
        <rect x="0" y="0" width="100" height="110" fill={`url(#${id}-rim)`} pointerEvents="none" />
      </g>
    </SvgWrap>
  );
}

/* ---------- hot air balloon component ---------- */
const HotAirBalloon = ({
  top = "10%",
  left = "10%",
  size = "medium",
  palette = ["#E07856", "#FFFFFF", "#E07856", "#FFFFFF", "#E07856", "#FFFFFF"],
  floatMs = 6500,
  delay = "0s",
  logo = null, // logo image source.
  name = "", // name for tooltip.
  tooltipColor = "#1a1a1a", // brand color for tooltip.
}) => {
  const px = sizePx(size);
  
  // geometry.
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
		{/* svg balloon envelope */}
		<BalloonSVG w={px} palette={palette} />

		{/* logo on balloon */}
		{logo && (
			<LogoOverlay $w={px}>
			<LogoImage src={logo} alt={name} />
			</LogoOverlay>
		)}

		{/* tooltip */}
		{name && <Tooltip $color={tooltipColor} $w={px}>{name}</Tooltip>}

		{/* metal attachment ring */}
		<AttachmentRing $w={px} />

		{/* straight rigging lines */}
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
			{/* four straight cables from ring to basket corners */}
			<line x1={geom.cx - geom.ringW / 2 + 2} y1="0" x2={geom.cx - geom.basketW / 2 + 2} y2={geom.basketTop - geom.ringY - 2} />
			<line x1={geom.cx + geom.ringW / 2 - 2} y1="0" x2={geom.cx + geom.basketW / 2 - 2} y2={geom.basketTop - geom.ringY - 2} />
			<line x1={geom.cx - 4} y1="0" x2={geom.cx - 3} y2={geom.basketTop - geom.ringY - 2} />
			<line x1={geom.cx + 4} y1="0" x2={geom.cx + 3} y2={geom.basketTop - geom.ringY - 2} />
			</g>
		</RiggingSvg>

      	{/* basket with lip */}
      	<Basket $w={px}>
        	<BasketLip />
      	</Basket>
    </Wrap>
  );
};

// export component.
export default HotAirBalloon;

/* ================= styles ================= */

const float = (ms) => keyframes`
  0%, 100% { transform: translateY(0); }
  25%      { transform: translateY(-8px); }
  50%      { transform: translateY(-4px); }
  75%      { transform: translateY(-10px); }
`;

const Wrap = styled.div`
    /* layout */
    position: absolute;
    z-index: 3;
    will-change: transform;
    
    /* spacing */
    height: auto;
    
    /* styles */
    opacity: 0.92; /* Atmospheric perspective for distance */
    cursor: pointer;
    animation: ${({ $floatMs }) => float($floatMs)} ease-in-out infinite;
    animation-duration: ${({ $floatMs }) => `${$floatMs}ms`};
    animation-delay: ${({ $delay }) => $delay};
    
    /* hover effects */
    &:hover {
        opacity: 1;
        z-index: 10;
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        transform: scale(0.88);
    }
`;

/* tooltip fade-in animation */
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

/* tooltip that appears on hover - positioned below basket */
const Tooltip = styled.div`
    /* layout */
    position: absolute;
    top: ${({ $w }) => Math.round($w * 1.46 + 5)}px; /* Below basket */
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    pointer-events: none;
    
    /* spacing */
    padding: 10px 18px;
    
    /* styles */
    opacity: 0;
    color: white;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    white-space: nowrap;
    background: ${({ $color }) => $color || '#1a1a1a'};
    box-shadow: 
        0 8px 20px rgba(0, 0, 0, 0.3),
        0 0 0 2px rgba(255, 255, 255, 0.1);
    
    /* hover effects */
    ${Wrap}:hover & {
        animation: ${tooltipFadeIn} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }
    
    /* arrow pointer */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        
        /* spacing */
        width: 0;
        height: 0;
        
        /* styles */
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 7px solid ${({ $color }) => $color || '#1a1a1a'};
        filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.1));
    }
    
    /* shine effect */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        right: 2px;
        
        /* spacing */
        height: 40%;
        
        /* styles */
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), transparent);
        border-radius: 10px 10px 0 0;
        pointer-events: none;
    }
`;

/* svg balloon wrapper */
const SvgWrap = styled.svg`
    /* layout */
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    overflow: visible;
    z-index: 3;
`;

/* logo overlay on balloon */
const LogoOverlay = styled.div`
    /* layout */
    position: absolute;
    left: 50%;
    top: ${({ $w }) => Math.round($w * 0.45)}px;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    pointer-events: none;
    
    /* spacing */
    width: ${({ $w }) => Math.round($w * 0.65)}px;
    height: ${({ $w }) => Math.round($w * 0.65)}px;
`;

const LogoImage = styled.img`
    /* spacing */
    max-width: 100%;
    max-height: 100%;
    
    /* styles */
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
`;

/* metal attachment ring */
const AttachmentRing = styled.div`
    /* layout */
    position: absolute;
    left: 50%;
    top: ${({ $w }) => Math.round($w * 0.98)}px;
    transform: translateX(-50%);
    z-index: 4;
    
    /* spacing */
    width: ${({ $w }) => Math.round($w * 0.24)}px;
    height: ${({ $w }) => Math.round($w * 0.08)}px;
    
    /* styles */
    border: 2px solid rgba(30, 25, 20, 0.6);
    border-radius: 50% / 45%;
    background: linear-gradient(180deg, #8b7355, #6b5643, #4a3d2f);
    box-shadow: 
        0 3px 6px rgba(0, 0, 0, 0.4),
        inset 0 2px 3px rgba(255, 255, 255, 0.2),
        inset 0 -2px 3px rgba(0, 0, 0, 0.3);
    
    /* ring texture */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        inset: 3px;
        
        /* styles */
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 50% / 45%;
    }
`;

/* svg rigging container */
const RiggingSvg = styled.svg`
    /* layout */
    position: absolute;
    pointer-events: none;
    z-index: 1;
    
    /* spacing */
    width: 100%;
    height: auto;
`;

/* wicker basket with depth */
const Basket = styled.div`
    /* layout */
    position: absolute;
    left: 50%;
    top: ${({ $w }) => Math.round($w * 1.28)}px;
    transform: translateX(-50%);
    overflow: visible;
    z-index: 2;
    
    /* spacing */
    width: ${({ $w }) => Math.round($w * 0.22)}px;
    height: ${({ $w }) => Math.round($w * 0.18)}px;
    
    /* styles */
    border: 1.5px solid rgba(35, 25, 20, 0.7);
    border-radius: 2px;
    background: linear-gradient(180deg, 
        #8b5e3c 0%,
        #6d4a2e 60%,
        #5a3d25 100%
    );
    box-shadow:
        inset 0 4px 6px rgba(255, 255, 255, 0.08),
        inset 0 -6px 10px rgba(0, 0, 0, 0.4),
        0 6px 14px rgba(0, 0, 0, 0.4);
    
    /* wicker weave texture */
    &::before {
        /* layout */
        content: "";
        position: absolute;
        inset: 0;
        
        /* styles */
        opacity: 0.9;
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
    }
    
    /* side depth */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        left: -2px;
        top: 2px;
        bottom: 2px;
        
        /* spacing */
        width: 3px;
        
        /* styles */
        border-left: 1px solid rgba(25, 18, 12, 0.8);
        background: linear-gradient(180deg, #5a3d25, #3d2818);
    }
`;

/* basket rim/lip */
const BasketLip = styled.div`
    /* layout */
    position: absolute;
    left: -4px;
    right: -4px;
    top: -5px;
    
    /* spacing */
    height: 6px;
    
    /* styles */
    border: 1.5px solid rgba(35, 25, 20, 0.7);
    border-bottom: none;
    border-radius: 3px 3px 0 0;
    background: linear-gradient(180deg, #a67448, #8b5e3c, #6d4a2e);
    box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.4),
        inset 0 1px 2px rgba(255, 255, 255, 0.3),
        inset 0 -1px 2px rgba(0, 0, 0, 0.3);
    
    /* rim detail */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        left: 2px;
        right: 2px;
        top: 1px;
        
        /* spacing */
        height: 1px;
        
        /* styles */
        background: rgba(255, 255, 255, 0.2);
    }
`;
