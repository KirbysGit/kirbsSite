import React from "react";
import styled, { keyframes, css } from "styled-components";

/* ---------- helpers ---------- */
const sizePx = (s) =>
  typeof s === "number"
    ? s
    : s === "large"
    ? 140
    : s === "small"
    ? 80
    : 110; // default medium

const stripeGradient = (colors = ["#69d2e7", "#ffd54f"], count = 12, startDeg = -90) => {
  const seg = 360 / Math.max(count, 1);
  const stops = new Array(count).fill(0).map((_, i) => {
    const c = colors[i % colors.length];
    const a = startDeg + seg * i;
    const b = a + seg;
    return `${c} ${a}deg ${b}deg`;
  });
  return `conic-gradient(from ${startDeg}deg at 50% 62%, ${stops.join(",")})`;
};

/* ---------- component ---------- */
const HotAirBalloon = ({
  top = "10%",
  left = "10%",
  size = "medium",
  stripeCount = 12,
  palette = ["#7dd3fc", "#38bdf8", "#0ea5e9", "#60a5fa"],
  // logo
  logoSrc,
  logoText,
  logoSize = 0.42, // relative to envelope width
  logoBg = "rgba(255,255,255,0.85)",
  blend = "multiply",
  // motion
  floatMs = 6500,
  delay = "0s",
  // label
  skill,
}) => {
  const px = sizePx(size);
  return (
    <Wrap style={{ top, left, width: px }} $floatMs={floatMs} $delay={delay}>
      <Envelope
        $w={px}
        $bg={stripeGradient(palette, stripeCount)}
        aria-label="balloon"
      >
        {/* depth overlays */}
        <Specular />
        <Shading />
        {/* logo */}
        {(logoSrc || logoText) && (
          <Logo $size={logoSize} $bg={logoBg} $blend={blend}>
            {logoSrc ? <img src={logoSrc} alt="" /> : <span>{logoText}</span>}
          </Logo>
        )}
        <Neck />
      </Envelope>

      <Rigging $w={px}>
        <Cord style={{ left: "18%" }} />
        <Cord style={{ left: "50%" }} />
        <Cord style={{ left: "82%" }} />
      </Rigging>

      <Flame $w={px} />
      <Basket $w={px} />
      {skill && <Label $w={px}>{skill}</Label>}
    </Wrap>
  );
};

export default HotAirBalloon;

/* ---------- styles ---------- */

const float = (ms) => keyframes`
  0%,100% { transform: translateY(0) rotate(0deg); }
  25%     { transform: translateY(-8px) rotate(0.6deg); }
  50%     { transform: translateY(-4px) rotate(0deg); }
  75%     { transform: translateY(-12px) rotate(-0.7deg); }
`;

const Wrap = styled.div`
  position: absolute;
  height: auto;
  z-index: 3;
  cursor: pointer;
  animation: ${({ $floatMs }) => float($floatMs)} linear infinite;
  animation-duration: ${({ $floatMs }) => `${$floatMs}ms`};
  animation-delay: ${({ $delay }) => $delay};
  will-change: transform;

  &:hover {
    transform: translateY(-14px) scale(1.06);
    filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.35));
  }
`;

/* The envelope is slightly taller than wide; lower center (like real balloons) */
const Envelope = styled.div`
  position: relative;
  width: 100%;
  height: ${({ $w }) => Math.round($w * 0.78)}px;
  border-radius: 50% / 62% 62% 45% 45%;
  background: ${({ $bg }) => $bg};
  border: 3px solid rgba(20, 35, 70, 0.5);
  box-shadow:
    inset 0 -18px 28px rgba(0, 0, 0, 0.18),
    inset 0 10px 20px rgba(255, 255, 255, 0.18),
    0 6px 14px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

/* glossy highlight on the upper-left */
const Specular = styled.i`
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 85% at 28% 28%, rgba(255,255,255,0.35), transparent 50%),
    radial-gradient(100% 80% at 70% 75%, rgba(255,255,255,0.15), transparent 60%);
  pointer-events: none;
`;

/* gentle vertical shading + rim darken at the base */
const Shading = styled.i`
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.06), transparent 45%, rgba(0,0,0,0.18) 85%),
    radial-gradient(100% 90% at 50% 85%, rgba(0,0,0,0.2), transparent 60%);
  mix-blend-mode: multiply;
  pointer-events: none;
`;

/* the little fabric neck under the envelope */
const Neck = styled.i`
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6px;
  translate: -50% 0;
  width: 40%;
  height: 12px;
  border-radius: 0 0 8px 8px;
  background: linear-gradient(180deg, #f4e4bc, #dec99d);
  border: 2px solid rgba(20, 35, 70, 0.5);
  border-top: none;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.4);
`;

/* center logo; supports image or text */
const Logo = styled.div`
  position: absolute;
  left: 50%;
  top: 46%;
  translate: -50% -50%;
  width: ${({ $size }) => `${$size * 100}%`};
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  border-radius: 16px;
  padding: 6%;
  background: ${({ $bg }) => $bg};
  box-shadow:
    0 2px 8px rgba(0,0,0,0.25),
    inset 0 1px 2px rgba(255,255,255,0.35);
  mix-blend-mode: ${({ $blend }) => $blend};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));
  }

  span {
    font: 800 clamp(10px, 3.2vw, 18px)/1.1 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    letter-spacing: 0.5px;
    color: #111;
    text-align: center;
  }
`;

/* cords that connect to the basket */
const Rigging = styled.div`
  position: relative;
  width: 100%;
  height: ${({ $w }) => Math.round($w * 0.22)}px;
  margin-top: -4px;
`;

const Cord = styled.i`
  content: "";
  position: absolute;
  top: 0;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(180deg, #3b2f2f, #1f1a19);
  box-shadow: 0 0 1px rgba(0,0,0,0.3);
  transform: skewX(-2deg);
`;

/* lively burner flame */
const flicker = keyframes`
  0%, 100% { transform: translateX(-50%) scaleY(0.9); filter: brightness(1); }
  40%      { transform: translateX(-50%) scaleY(1.15); filter: brightness(1.15); }
  70%      { transform: translateX(-50%) scaleY(1.0); filter: brightness(0.95); }
`;

const Flame = styled.div`
  position: absolute;
  left: 50%;
  top: ${({ $w }) => Math.round($w * 0.86)}px;
  translate: -50% 0;
  width: ${({ $w }) => Math.round($w * 0.10)}px;
  height: ${({ $w }) => Math.round($w * 0.18)}px;
  background: radial-gradient(60% 80% at 50% 15%, #fff 0%, #ffd54f 35%, #ff8a00 65%, #ff3d00 100%);
  border: 1px solid rgba(20, 35, 70, 0.5);
  border-radius: 50% 50% 55% 55% / 70% 70% 40% 40%;
  box-shadow: 0 0 10px rgba(255, 136, 0, 0.65);
  animation: ${flicker} 420ms ease-in-out infinite;
`;

/* basket with wicker texture + rim */
const Basket = styled.div`
  position: absolute;
  left: 50%;
  top: ${({ $w }) => Math.round($w * 1.02)}px;
  translate: -50% 0;
  width: ${({ $w }) => Math.round($w * 0.52)}px;
  height: ${({ $w }) => Math.round($w * 0.2)}px;
  background: linear-gradient(180deg, #8b5a2b, #6b3f1d);
  border: 2px solid rgba(20, 35, 70, 0.5);
  border-radius: 6px;
  box-shadow:
    inset 0 8px 10px rgba(255,255,255,0.08),
    inset 0 -10px 12px rgba(0,0,0,0.25),
    0 4px 10px rgba(0,0,0,0.25);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(90deg, rgba(20,10,0,0.25) 1px, transparent 1px),
      linear-gradient(0deg,  rgba(20,10,0,0.25) 1px, transparent 1px);
    background-size: 8px 8px;
    opacity: 0.7;
  }

  &::after {
    content: "";
    position: absolute;
    left: -2px; right: -2px; top: -6px; height: 8px;
    background: linear-gradient(180deg, #a06b3a, #8a542a);
    border: 2px solid rgba(20, 35, 70, 0.5);
    border-bottom: none;
    border-radius: 8px 8px 0 0;
  }
`;

const Label = styled.div`
  position: absolute;
  left: 50%;
  top: ${({ $w }) => Math.round($w * 1.26)}px;
  translate: -50% 0;
  padding: 4px 10px;
  font: 700 0.8rem/1.1 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  color: rgba(255,255,255,0.95);
  background: rgba(0,0,0,0.35);
  border-radius: 12px;
  white-space: nowrap;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
`;
