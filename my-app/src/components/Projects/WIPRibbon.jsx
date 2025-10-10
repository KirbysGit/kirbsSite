import React from "react";
import styled from "styled-components";

const WIPRibbon = ({ text = "WORK IN PROGRESS" }) => (
  <CornerRibbon aria-label={text}>
    <RibbonStrip />
    <RibbonText>🚧 {text}</RibbonText>
    <CornerFold />
  </CornerRibbon>
);

export default WIPRibbon;

/* ================= Styles ================= */

const CornerRibbon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  pointer-events: none;
  z-index: 30;
  isolation: isolate;

  --ribbon-height: 28px;
  --stripe: 12px;
  --angle: 45deg;
  --yellow: #ffd400;
  --black: #0a0a0a;
  --text-offset: 26px;
`;

const RibbonStrip = styled.i`
  content: "";
  position: absolute;
  top: 24px;
  right: -64px;
  width: 260px;
  height: var(--ribbon-height);
  transform: rotate(var(--angle));
  border-radius: 4px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
  z-index: 0;

  background: repeating-linear-gradient(
    var(--angle),
    var(--yellow) 0 calc(var(--stripe) * 1),
    var(--yellow) calc(var(--stripe) * 1) calc(var(--stripe) * 1.4),
    var(--black)  calc(var(--stripe) * 1.4) calc(var(--stripe) * 2.4)
  );
`;

/* Tight pill only behind the text */
const RibbonText = styled.span`
  position: absolute;
  top: 24px;             /* align to strip */
  right: -5px;          /* align to strip */
  transform: rotate(var(--angle)) translateX(var(--text-offset));
  transform-origin: center;

  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;     /* pill padding */
  border-radius: 999px;  /* fully rounded pill */
  white-space: nowrap;
  z-index: 2;

  font: 900 12px/1 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  letter-spacing: 2.2px;
  text-transform: uppercase;
  color: #1a1a1a;

  /* tight yellow background behind text only */
  background: linear-gradient(180deg, #ffea6a 0%, #ffd400 70%);
  border: 1px solid rgba(0, 0, 0, 0.18);
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.28),
    inset 0 1px 2px rgba(255, 255, 255, 0.35);

  /* keep letters readable over stripes when pill is semi-transparent, if desired */
  /* -webkit-text-stroke: 0.4px rgba(255, 255, 255, 0.7); */
`;

const CornerFold = styled.i`
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-top: 40px solid rgba(0, 0, 0, 0.08);
  border-left: 40px solid transparent;
  filter: blur(.2px);
  z-index: 3;
`;
