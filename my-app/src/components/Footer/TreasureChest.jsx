import React, { useId } from "react";
import styled from "styled-components";

export default function TreasureChest({
  width = 150,
  height = 110,
  burialDepth = 0.35,
  tilt = 0,
}) {
  const id = useId();

  const W = width;
  const H = height;
  const DEPTH = W * 0.5;  // Side depth for 3D effect
  
  // Proportions
  const bodyH = H * 0.6;   // Lower box
  const lidH = H * 0.4;    // Upper barrel lid
  
  // For barrel cylinder effect
  const barrelRadius = lidH * 0.8;  // How curved the barrel is

  return (
    <ChestWrap $tilt={tilt} $burialDepth={burialDepth}>
      <svg
        width={W + DEPTH}
        height={H}
        viewBox={`0 0 ${W + DEPTH} ${H}`}
        role="img"
        aria-label="Treasure chest"
      >
        <defs>
          {/* Simple wood gradient */}
          <linearGradient id={`${id}-wood`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9b7a52" />
            <stop offset="100%" stopColor="#6b5436" />
          </linearGradient>
          
          {/* Darker wood for side */}
          <linearGradient id={`${id}-woodSide`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4a3520" />
            <stop offset="100%" stopColor="#6b5436" />
          </linearGradient>
        </defs>

        {/* ===== BARREL LID ===== */}
        
        {/* Left side of barrel (depth) */}
        <path
          d={`
            M 0,${bodyH + DEPTH}
            L ${DEPTH * 0.4},${bodyH}
            L ${DEPTH * 0.4},${bodyH}
            Q ${DEPTH * 0.2},${bodyH - barrelRadius} 0,${bodyH - barrelRadius * 0.8 + DEPTH * 0.5}
            Z
          `}
          fill={`url(#${id}-woodSide)`}
        />
        
        {/* BARREL LID TOP - HARDCODED - EDIT THESE NUMBERS! */}
        <path
          d={`
            M 15, 70
            Q 30, 72.5 30, 100
            L 192.5, 100
            Q 192.5, 80 170, 70
            Z
          `}
          fill={`url(#${id}-wood)`}
        />

        {/* ===== BODY ===== */}
        
        {/* Left side of body */}
        <polygon
          points={`
            0,${H}
            ${DEPTH * 0.4},${H}
            ${DEPTH * 0.4},${bodyH}
            0,${bodyH}
          `}
          fill={`url(#${id}-woodSide)`}
        />
        
        {/* Front of body - with curved top matching the barrel */}
        <path
          d={`
            M ${DEPTH * 0.4},${bodyH}
            L ${DEPTH * 0.4 + W},${bodyH}
            L ${DEPTH * 0.4 + W},${H}
            L ${DEPTH * 0.4},${H}
            Z
          `}
          fill={`url(#${id}-wood)`}
        />

      </svg>
    </ChestWrap>
  );
}

const ChestWrap = styled.div`
  position: absolute;
  left: 8%;
  top: ${({ $burialDepth }) => 10 + $burialDepth * 30}%;
  transform: rotate(${({ $tilt }) => $tilt}deg);
  z-index: 5;
`;
