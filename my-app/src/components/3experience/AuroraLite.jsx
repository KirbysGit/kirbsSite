// AuroraLite.jsx
// Lightweight aurora: one static wave silhouette with a sliding gradient.

import React from 'react';
import styled from 'styled-components';

// One static path for the ribbon silhouette
const WAVE_PATH = (() => {
  const width = 3200;
  const height = 120;
  const amplitude = 30;
  const frequency = 4;
  const phase = 0;
  const thickness = 42;

  const step = width / (frequency * 20);
  const top = [];
  const bottom = [];

  for (let x = 0; x <= width; x += step) {
    const y =
      height / 2 +
      Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude;
    top.push([x, y]);
  }

  for (let x = width; x >= 0; x -= step) {
    const y =
      height / 2 +
      Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude +
      thickness;
    bottom.push([x, y]);
  }

  let p = `M${top[0][0]},${top[0][1]}`;
  for (let i = 1; i < top.length; i++) {
    p += ` L${top[i][0]},${top[i][1]}`;
  }
  for (let i = 0; i < bottom.length; i++) {
    p += ` L${bottom[i][0]},${bottom[i][1]}`;
  }
  return p + ' Z';
})();

const AuroraLiteInner = () => (
  <Layer aria-hidden="true">
    {/* back wave - soft, lower opacity */}
    <Wave
      style={{
        ['--wave-path']: `path("${WAVE_PATH}")`,
        ['--top']: '22%',
        ['--opacity']: 0.35,
        ['--color-dur']: '22s',
        ['--drift-dur']: '26s',
        ['--delay']: '0s',
        ['--wave-gradient']:
          'linear-gradient(90deg, \
rgba(60, 220, 170, 0.00) 0%, \
rgba(60, 220, 170, 0.32) 18%, \
rgba(110, 190, 230, 0.34) 38%, \
rgba(140, 155, 255, 0.32) 55%, \
rgba(205, 150, 230, 0.33) 72%, \
rgba(230, 160, 220, 0.00) 100%)',
      }}
    />

    {/* mid wave - main ribbon */}
    <Wave
      style={{
        ['--wave-path']: `path("${WAVE_PATH}")`,
        ['--top']: '30%',
        ['--opacity']: 0.55,
        ['--color-dur']: '18s',
        ['--drift-dur']: '20s',
        ['--delay']: '2s',
        ['--wave-gradient']:
          'linear-gradient(90deg, \
rgba(70, 245, 180, 0.00) 0%, \
rgba(70, 245, 180, 0.50) 18%, \
rgba(130, 150, 255, 0.46) 40%, \
rgba(190, 135, 240, 0.46) 60%, \
rgba(255, 150, 210, 0.44) 80%, \
rgba(255, 150, 210, 0.00) 100%)',
      }}
    />

    {/* front wave - slightly lower, warmer tint */}
    <Wave
      style={{
        ['--wave-path']: `path("${WAVE_PATH}")`,
        ['--top']: '38%',
        ['--opacity']: 0.5,
        ['--color-dur']: '20s',
        ['--drift-dur']: '24s',
        ['--delay']: '4s',
        ['--wave-gradient']:
          'linear-gradient(90deg, \
rgba(110, 250, 210, 0.00) 0%, \
rgba(110, 250, 210, 0.46) 20%, \
rgba(170, 150, 255, 0.42) 45%, \
rgba(215, 155, 235, 0.42) 65%, \
rgba(255, 185, 190, 0.44) 85%, \
rgba(255, 185, 190, 0.00) 100%)',
      }}
    />
  </Layer>
);

const AuroraLite = React.memo(AuroraLiteInner);
AuroraLite.displayName = 'AuroraLite';

export default AuroraLite;

// Container
const Layer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  isolation: isolate;
  contain: layout style paint;
`;

// Single wave with a sliding gradient and a gentle drift
const Wave = styled.div`
  position: absolute;
  left: -10%;
  top: var(--top, 30%);
  width: 120%;
  height: 36vh;

  /* Static silhouette — no animated clip-path */
  clip-path: var(--wave-path);

  /* Cheap-to-animate gradient */
  background: var(
    --wave-gradient,
    linear-gradient(
      90deg,
      rgba(80, 255, 180, 0.55) 0%,
      rgba(150, 120, 255, 0.42) 50%,
      rgba(255, 150, 200, 0.45) 100%
    )
  );
  background-size: 200% 100%;
  opacity: var(--opacity, 0.55);

  /* Only two animations: background-position and transform */
  animation:
    colorFlow var(--color-dur, 16s) linear infinite,
    drift var(--drift-dur, 18s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  will-change: background-position, transform;
  transform: translateZ(0);
  backface-visibility: hidden;

  @keyframes colorFlow {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }

  @keyframes drift {
    0%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(-36px, -10px, 0);
    }
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;


