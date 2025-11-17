// Aurora.jsx

// lightweight aurora because the other was ruining the site's performance
// so we just made it one static wave silhouette with a sliding gradient.

// imports.
import React from 'react';
import styled from 'styled-components';

/* ================== main component ================== */

const WAVE_PATH = (() => {
    const width = 3200;								// width of the wave.
    const height = 120;								// height of the wave.
    const amplitude = 30;							// amplitude of the wave.
    const frequency = 4;							// frequency of the wave.
    const phase = 0;								// phase of the wave.
    const thickness = 42;							// thickness of the wave.

    const step = width / (frequency * 20);		// step size for the wave.
    const top = [];								// top points of the wave.
    const bottom = [];							// bottom points of the wave.

	// generate top wave from left to right.
    for (let x = 0; x <= width; x += step) {
      	const y = height / 2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude;
      	top.push([x, y]);
    }

	// generate bottom wave from right to left.
    for (let x = width; x >= 0; x -= step) {
      	const y = height / 2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude + thickness;
      	bottom.push([x, y]);
    }

	// build the path, trace all of our points (around top then back to bottom)
    let p = `M${top[0][0]},${top[0][1]}`;
	
	// draw the top wave.
    for (let i = 1; i < top.length; i++) {
      	p += ` L${top[i][0]},${top[i][1]}`;
    }

	// draw the bottom wave.
    for (let i = 0; i < bottom.length; i++) {
      	p += ` L${bottom[i][0]},${bottom[i][1]}`;
    }

	// close path.
    return p + ' Z';
  })();

  const AuroraInner = () => (
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

      {/* front wave - slightly lower */}
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

const Aurora = React.memo(AuroraInner);
Aurora.displayName = 'Aurora';

export default Aurora;

/* ====================== styled ====================== */

// container for aurora.
const Layer = styled.div`
	/* layout */
	inset: 0;
	overflow: hidden;
	position: absolute;
	isolation: isolate;
	pointer-events: none;
	contain: layout style paint;
`;

// single wave with sliding gradient and drift.
const Wave = styled.div`
	/* layout */
	left: -10%;
	position: absolute;
	top: var(--top, 30%);
	
	/* spacing */
	width: 120%;
	height: 36vh;
	
	/* styles */
	transform: translateZ(0);
	background-size: 200% 100%;
	backface-visibility: hidden;
	clip-path: var(--wave-path);
	opacity: var(--opacity, 0.55);
	animation-delay: var(--delay, 0s);
	will-change: background-position, transform;
	animation:
		colorFlow var(--color-dur, 16s) linear infinite,
		drift var(--drift-dur, 18s) ease-in-out infinite;
	background: var(
		--wave-gradient,
		linear-gradient(
		90deg,
		rgba(80, 255, 180, 0.55) 0%,
		rgba(150, 120, 255, 0.42) 50%,
		rgba(255, 150, 200, 0.45) 100%
		)
	);
	
	/* keyframes */
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
	
	/* media queries */
	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
`;


