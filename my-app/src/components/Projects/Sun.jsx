import React from 'react';
import styled, { keyframes } from 'styled-components';

const Sun = () => {
    return (
        <SunContainer>
            <SunGlow />
            {/* <SunRays />         faint rotating flares outside the disc */}
            {/* <WaveRing />        soft shimmering ring */}
            {/* <SunFace>           face sits in the center */}
                {/* <Sunglasses> */}
                    {/* <Arm $side="left" /> */}
                    {/* <Lens /> */}
                    {/* <Bridge /> */}
                    {/* <Lens /> */}
                    {/* <Arm $side="right" /> */}
                {/* </Sunglasses> */}
                {/* <Smirk /> */}
            {/* </SunFace> */}
        </SunContainer>
    );
};

export default Sun;

/* ================= Sun Styles ================= */

// Main sun container
const SunContainer = styled.div`
    position: absolute;
    bottom: 10%;
    right: 15%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle at center,
        rgba(255, 250, 200, 1) 0%,
        rgba(255, 240, 150, 0.95) 20%,
        rgba(255, 230, 120, 0.9) 40%,
        rgba(255, 220, 100, 0.7) 60%,
        rgba(255, 210, 80, 0.4) 80%,
        transparent 100%);
    box-shadow: 
        0 0 40px rgba(255, 230, 120, 0.6),
        0 0 80px rgba(255, 220, 100, 0.4),
        0 0 120px rgba(255, 210, 80, 0.2);
    animation: sunPulse 8s ease-in-out infinite;
    
    @keyframes sunPulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.9;
        }
        50% {
            transform: scale(1.05);
            opacity: 1;
        }
    }
`;

// Sun glow layer
const SunGlow = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    border-radius: 50%;
    background: radial-gradient(circle at center,
        rgba(255, 240, 150, 0.3) 0%,
        rgba(255, 230, 120, 0.15) 30%,
        rgba(255, 220, 100, 0.05) 60%,
        transparent 100%);
    animation: glowPulse 6s ease-in-out infinite;
    
    @keyframes glowPulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.8;
        }
    }
`;

/* --- Face wrapper (keeps elements centered on the sun) --- */
/* const SunFace = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
`; */

/* --- Sunglasses --- */
/* const Sunglasses = styled.div`
  position: absolute;
  top: 44%;
  left: 50%;
  translate: -50% -50%;
  width: 62%;
  height: 34%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  rotate: -6deg;
  z-index: 2;
`; */

/* const Lens = styled.div`
  width: 44%;
  height: 68%;
  border-radius: 18px;
  border: 3px solid rgba(0, 0, 0, 0.65);
  background:
    radial-gradient(120% 100% at 30% 25%, rgba(255,255,255,.28), transparent 35%),
    linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.75));
  box-shadow:
    inset 0 -6px 14px rgba(0, 0, 0, 0.35),
    0 2px 3px rgba(0, 0, 0, 0.2);
`; */

/* const Bridge = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: 14%;
  height: 14%;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.75);
  box-shadow: 0 1px 1px rgba(0,0,0,.25);
`; */

/* const Arm = styled.div`
  position: absolute;
  top: 28%;
  width: 28%;
  height: 6%;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.75);
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.25));
  ${({ $side }) =>
    $side === "left"
      ? `left: -20%; rotate: -14deg; transform-origin: right center;`
      : `right: -20%; rotate: 14deg; transform-origin: left center;`}
`; */

/* --- Smirk --- */
/*
const Smirk = styled.div`
  position: absolute;
  left: 50%;
  top: 66%;
  width: 30%;
  height: 28%;
  translate: -50% 0;
  rotate: 8deg;
  border-bottom: 5px solid rgba(120, 70, 20, 0.7);
  border-radius: 0 0 120px 120px;
  box-shadow: inset 0 2px 0 rgba(255,255,255,.25);
  z-index: 2;

  // soften/taper the ends with tiny overlays
  &::before, &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    width: 12px; height: 12px;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%,
      rgba(255,240,150,0.9), rgba(255,210,80,0.9));
  }
  &::before { left: -6px; }
  &::after  { right: -6px; }
`;
*/

/* --- Subtle rotating flares just outside the sun --- */
/*
const SunRays = styled.div`
  position: absolute;
  inset: -18%;                // extends outside the disc
  border-radius: 50%;
  pointer-events: none;
  background:
    conic-gradient(
      from 0deg,
      rgba(255, 220, 120, 0)   0deg 8deg,
      rgba(255, 220, 120, .35) 8deg 12deg,
      rgba(255, 220, 120, 0)  12deg 20deg
    );
  // mask so only the outer ring shows
  -webkit-mask: radial-gradient(circle, transparent 58%, #000 59%);
          mask: radial-gradient(circle, transparent 58%, #000 59%);
  animation: raysSpin 40s linear infinite;
  filter: blur(1px);

  @keyframes raysSpin { to { transform: rotate(360deg); } }
`;
*/

/* --- Gentle "solar wave" shimmer --- */
/*
const WaveRing = styled.div`
  position: absolute;
  inset: -6%;
  border-radius: 50%;
  pointer-events: none;
  background:
    radial-gradient(closest-side,
      transparent 60%,
      rgba(255, 245, 180, .25) 62%,
      transparent 64%);
  animation: wave 7s ease-in-out infinite alternate;

  @keyframes wave {
    0%   { transform: scale(1) rotate(0deg);   opacity: .7; }
    100% { transform: scale(1.06) rotate(6deg); opacity: .9; }
  }
`;
*/
