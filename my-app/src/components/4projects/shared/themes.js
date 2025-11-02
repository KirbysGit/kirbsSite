// Theme configurations for different project cards
export const themes = {

  // secure scape theme.
  secure: {
    name: 'secure',
    colors: {
      background: `linear-gradient(135deg,
        rgba(10, 26, 20, 0.96) 0%,
        rgba(16, 43, 33, 0.94) 28%,
        rgba(23, 67, 49, 0.92) 56%,
        rgba(33, 98, 71, 0.90) 100%
      )`,
      hoverBackground: `linear-gradient(135deg,
        rgba(10, 26, 20, 0.98) 0%,
        rgba(16, 43, 33, 0.96) 28%,
        rgba(23, 67, 49, 0.94) 56%,
        rgba(33, 98, 71, 0.92) 100%
      )`,
      
      border: 'rgba(0, 168, 107, 0.5)',
      hoverBorder: 'rgba(0, 168, 107, 0.65)',
      
      boxShadow: `
        0 8px 32px rgba(0, 0, 0, 0.35),
        inset 0 1px 2px rgba(64, 145, 108, 0.28),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 44px rgba(0, 168, 107, 0.25)
      `,
      hoverBoxShadow: `
        0 12px 48px rgba(0, 0, 0, 0.45),
        inset 0 2px 3px rgba(64, 145, 108, 0.36),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 64px rgba(0, 168, 107, 0.45)
      `,
      
      nameGradient: 'linear-gradient(90deg, #C9FFE8, #86F3C1)',
      labelGradient: 'linear-gradient(90deg, #C9FFE8, #86F3C1)',
      dividerGradient: 'linear-gradient(90deg, #C9FFE8, #86F3C1)',
      dividerShadow: '0 0 10px rgba(0,168,107,0.45)',
      
      pillBackground: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(235, 255, 246, 0.98) 50%, rgba(225, 250, 242, 0.96) 100%)',
      pillBorder: 'rgba(0,168,107,0.6)',
      pillShadow: '0 2px 8px rgba(0,168,107,0.28), inset 0 1px 2px rgba(255,255,255,0.9)',
      pillHoverBorder: 'rgba(0,168,107,0.9)',
      pillHoverShadow: '0 8px 20px rgba(0,168,107,0.5), inset 0 1px 3px rgba(255,255,255,1)',
      
      tooltipBackground: 'linear-gradient(135deg, rgba(0,168,107,0.95), rgba(64,145,108,0.95))',
      tooltipShadow: '0 4px 12px rgba(0,168,107,0.4), 0 0 0 1px rgba(201,255,232,0.4)',
      tooltipArrow: 'rgba(0,168,107,0.95)',
      
      highlightBackground: 'linear-gradient(90deg, rgba(0,168,107,0.08) 0%, rgba(64,145,108,0.06) 100%)',
      highlightHoverBackground: 'linear-gradient(90deg, rgba(0,168,107,0.15) 0%, rgba(64,145,108,0.12) 100%)',
      highlightBorderImage: 'linear-gradient(180deg, rgb(0, 168, 107) 0%, rgb(64, 255, 210) 100%)',
      highlightHoverShadow: '0 4px 16px rgba(0,168,107,0.25)',
      
      previewBackground: 'linear-gradient(90deg, rgba(0,168,107,0.15) 0%, rgba(64,145,108,0.12) 100%)',
      previewBorder: 'rgba(0,168,107,0.4)',
      previewHoverBackground: 'linear-gradient(90deg, rgba(0,168,107,0.25) 0%, rgba(64,145,108,0.20) 100%)',
      previewHoverBorder: 'rgba(0,168,107,0.6)',
      previewHoverShadow: '0 8px 24px rgba(0,168,107,0.35)',
    }
  },
  
  // sentiment trader theme.
  sentiment: {
    name: 'sentiment',
    colors: {
      background: `linear-gradient(135deg,
        rgba(96, 1, 210, 0.90) 0%,
        rgba(126, 87, 194, 0.88) 25%,
        rgba(156, 39, 176, 0.86) 50%,
        rgba(255, 109, 0, 0.88) 75%,
        rgba(255, 69, 0, 0.90) 100%
      )`,
      hoverBackground: `linear-gradient(135deg,
        rgba(96, 1, 210, 0.95) 0%,
        rgba(126, 87, 194, 0.93) 25%,
        rgba(156, 39, 176, 0.91) 50%,
        rgba(255, 109, 0, 0.93) 75%,
        rgba(255, 69, 0, 0.95) 100%
      )`,
      
      border: 'rgba(156, 39, 176, 0.5)',
      hoverBorder: 'rgba(186, 104, 200, 0.7)',
      
      boxShadow: `
        0 8px 32px rgba(0, 0, 0, 0.35),
        inset 0 1px 2px rgba(186, 104, 200, 0.28),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 44px rgba(156, 39, 176, 0.25)
      `,
      hoverBoxShadow: `
        0 12px 48px rgba(0, 0, 0, 0.45),
        inset 0 2px 3px rgba(186, 104, 200, 0.36),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 64px rgba(156, 39, 176, 0.4),
        0 0 32px rgba(255, 109, 0, 0.3)
      `,
      
      nameGradient: 'linear-gradient(90deg, #E1BEE7, #FFAB91)',
      labelGradient: 'linear-gradient(90deg, #E1BEE7, #FFAB91)',
      dividerGradient: 'linear-gradient(90deg, #BA68C8, #FF6D00)',
      dividerShadow: '0 0 10px rgba(156, 39, 176, 0.45)',
      
      pillBackground: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(243, 229, 245, 0.98) 50%, rgba(255, 243, 224, 0.96) 100%)',
      pillBorder: 'rgba(156, 39, 176, 0.6)',
      pillShadow: '0 2px 8px rgba(156, 39, 176, 0.28), inset 0 1px 2px rgba(255,255,255,0.9)',
      pillHoverBorder: 'rgba(186, 104, 200, 0.9)',
      pillHoverShadow: '0 8px 20px rgba(156, 39, 176, 0.5), inset 0 1px 3px rgba(255,255,255,1)',
      
      tooltipBackground: 'linear-gradient(135deg, rgba(156, 39, 176, 0.95), rgba(255, 109, 0, 0.95))',
      tooltipShadow: '0 4px 12px rgba(156, 39, 176, 0.4), 0 0 0 1px rgba(225, 190, 231, 0.4)',
      tooltipArrow: 'rgba(156, 39, 176, 0.95)',
      
      highlightBackground: 'linear-gradient(90deg, rgba(156, 39, 176, 0.08) 0%, rgba(255, 109, 0, 0.06) 100%)',
      highlightHoverBackground: 'linear-gradient(90deg, rgba(156, 39, 176, 0.15) 0%, rgba(255, 109, 0, 0.12) 100%)',
      highlightBorderImage: 'linear-gradient(180deg, rgb(156, 39, 176) 0%, rgb(255, 109, 0) 100%)',
      highlightHoverShadow: '0 4px 16px rgba(156, 39, 176, 0.25)',
      
      previewBackground: 'rgba(156, 39, 176, 0.12)',
      previewBorder: 'rgba(156, 39, 176, 0.35)',
      previewHoverBackground: 'rgba(156, 39, 176, 0.18)',
      previewHoverBorder: 'rgba(186, 104, 200, 0.6)',
      previewHoverShadow: '0 6px 20px rgba(156, 39, 176, 0.3)',
    }
  },
  
  // ck dev site theme.
  cosmic: {
    name: 'cosmic',
    colors: {
      // Background gradients
      background: `
        radial-gradient(ellipse at top, rgba(30, 20, 60, 0.95) 0%, rgba(15, 10, 35, 0.98) 50%, rgba(5, 5, 20, 1) 100%),
        linear-gradient(135deg, rgba(80, 50, 150, 0.15) 0%, rgba(40, 20, 80, 0.2) 100%)
      `,
      hoverBackground: `
        radial-gradient(ellipse at top, rgba(30, 20, 60, 0.97) 0%, rgba(15, 10, 35, 0.99) 50%, rgba(5, 5, 20, 1) 100%),
        linear-gradient(135deg, rgba(80, 50, 150, 0.18) 0%, rgba(40, 20, 80, 0.25) 100%)
      `,
      
      // Borders
      border: 'rgba(150, 100, 255, 0.4)',
      hoverBorder: 'rgba(150, 100, 255, 0.7)',
      
      // Box shadows
      boxShadow: `
        0 10px 40px rgba(0, 0, 0, 0.5),
        inset 0 1px 2px rgba(150, 100, 255, 0.15),
        0 0 60px rgba(100, 50, 200, 0.3)
      `,
      hoverBoxShadow: `
        0 20px 60px rgba(0, 0, 0, 0.6),
        0 0 100px rgba(100, 50, 200, 0.5)
      `,
      
      // Text gradients
      nameGradient: 'linear-gradient(135deg, #ffffff 0%, #d4b3ff 30%, #9d6fff 60%, #7c3aed 100%)',
      labelGradient: 'linear-gradient(90deg, #d4b3ff, #9d6fff)',
      dividerGradient: 'linear-gradient(90deg, rgba(150, 100, 255, 1), rgba(100, 50, 200, 1))',
      dividerShadow: '0 0 10px rgba(150, 100, 255, 0.45)',
      
      // Tech stack styling
      pillBackground: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(220, 200, 255, 0.9) 100%)',
      pillBorder: 'rgba(150, 100, 255, 0.6)',
      pillShadow: '0 2px 8px rgba(150, 100, 255, 0.27), inset 0 1px 2px rgba(255,255,255,0.95)',
      pillHoverBorder: 'rgba(150, 100, 255, 0.9)',
      pillHoverShadow: '0 8px 20px rgba(150, 100, 255, 0.45), inset 0 1px 3px rgba(255,255,255,1)',
      
      // Tooltip styling
      tooltipBackground: 'linear-gradient(135deg, rgba(100, 50, 200, 0.98), rgba(80, 30, 150, 0.98))',
      tooltipShadow: '0 4px 12px rgba(100, 50, 200, 0.35), 0 0 0 1px rgba(150, 100, 255, 0.4)',
      tooltipArrow: 'rgba(100, 50, 200, 0.98)',
      
      // Highlight styling
      highlightBackground: 'linear-gradient(90deg, rgba(150, 100, 255, 0.08), rgba(100, 50, 200, 0.06))',
      highlightHoverBackground: 'linear-gradient(90deg, rgba(150, 100, 255, 0.15), rgba(100, 50, 200, 0.12))',
      highlightBorderImage: 'linear-gradient(180deg, rgb(150, 100, 255) 0%, rgb(180, 130, 255) 100%)',
      highlightHoverShadow: '0 4px 16px rgba(100, 50, 200, 0.3)',
    }
  },
  
  // centi theme,
  centi: {
    name: 'centi',
    colors: {
      background: `linear-gradient(135deg,
        rgba(8, 70, 160, 0.95) 0%,
        rgba(10, 90, 140, 0.93) 20%,
        rgba(13, 110, 130, 0.91) 35%,
        rgba(15, 120, 115, 0.89) 50%,
        rgba(18, 128, 100, 0.87) 65%,
        rgba(22, 132, 90, 0.86) 80%,
        rgba(25, 135, 84, 0.85) 100%
      )`,
      hoverBackground: `linear-gradient(135deg,
        rgba(8, 70, 160, 0.97) 0%,
        rgba(10, 90, 140, 0.95) 20%,
        rgba(13, 110, 130, 0.93) 35%,
        rgba(15, 120, 115, 0.91) 50%,
        rgba(18, 128, 100, 0.89) 65%,
        rgba(22, 132, 90, 0.88) 80%,
        rgba(25, 135, 84, 0.87) 100%
      )`,
      
      border: 'rgba(13, 110, 253, 0.5)',
      hoverBorder: 'rgba(182, 224, 254, 0.6)',
      
      boxShadow: `
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 2px rgba(182, 224, 254, 0.3),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 40px rgba(13, 110, 253, 0.3)
      `,
      hoverBoxShadow: `
        0 12px 48px rgba(0, 0, 0, 0.4),
        inset 0 2px 3px rgba(182, 224, 254, 0.4),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 60px rgba(13, 110, 253, 0.5)
      `,
      
      nameGradient: 'linear-gradient(90deg, rgb(182, 224, 254), rgb(167, 255, 235))',
      labelGradient: 'linear-gradient(90deg, rgb(182, 224, 254), rgb(167, 255, 235))',
      dividerGradient: 'linear-gradient(90deg, rgb(182, 224, 254), rgb(167, 255, 235))',
      dividerShadow: '0 0 10px rgba(182, 224, 254, 0.5)',
      
      pillBackground: 'linear-gradient(90deg, rgb(182, 224, 254), rgb(167, 255, 235))',
      pillBorder: 'rgba(182, 224, 254, 0.6)',
      pillShadow: '0 2px 8px rgba(182, 224, 254, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
      pillHoverBorder: 'rgba(182, 224, 254, 0.9)',
      pillHoverShadow: '0 8px 20px rgba(182, 224, 254, 0.5), inset 0 1px 3px rgba(255, 255, 255, 1)',
      
      tooltipBackground: 'linear-gradient(135deg, rgba(13, 110, 253, 0.95) 0%, rgba(25, 135, 200, 0.95) 100%)',
      tooltipShadow: '0 4px 12px rgba(13, 110, 253, 0.4), 0 0 0 1px rgba(182, 224, 254, 0.5)',
      tooltipArrow: 'rgba(13, 110, 253, 0.95)',
      
      highlightBackground: 'linear-gradient(90deg, rgba(182, 224, 254, 0.08) 0%, rgba(167, 255, 235, 0.06) 100%)',
      highlightHoverBackground: 'linear-gradient(90deg, rgba(182, 224, 254, 0.15) 0%, rgba(167, 255, 235, 0.12) 100%)',
      highlightBorderImage: 'linear-gradient(180deg, rgb(13, 110, 253) 0%, rgb(0, 200, 180) 100%)',
      highlightHoverShadow: '0 4px 16px rgba(182, 224, 254, 0.25)',
      
      previewBackground: 'linear-gradient(90deg, rgba(182, 224, 254, 0.15) 0%, rgba(167, 255, 235, 0.12) 100%)',
      previewBorder: 'rgba(182, 224, 254, 0.4)',
      previewHoverBackground: 'linear-gradient(90deg, rgba(182, 224, 254, 0.25) 0%, rgba(167, 255, 235, 0.20) 100%)',
      previewHoverBorder: 'rgba(182, 224, 254, 0.6)',
      previewHoverShadow: '0 8px 24px rgba(182, 224, 254, 0.4)',
    }
  },
  
  // shelf vision theme.
  shelf: {
    name: 'shelf',
    colors: {
      background: `
        radial-gradient(120% 120% at 100% 0%, rgba(18,24,38,0.92) 0%, rgba(10,13,22,0.95) 40%, rgba(6,10,18,0.98) 100%),
        linear-gradient(135deg, rgba(34,211,238,0.08), rgba(167,243,208,0.04))
      `,
      hoverBackground: `
        radial-gradient(120% 120% at 100% 0%, rgba(18,24,38,0.94) 0%, rgba(10,13,22,0.97) 40%, rgba(6,10,18,0.99) 100%),
        linear-gradient(135deg, rgba(34,211,238,0.12), rgba(167,243,208,0.08))
      `,
      
      border: 'rgba(34,211,238,0.35)',
      hoverBorder: 'rgba(34,211,238,0.55)',
      
      boxShadow: `
        0 10px 30px rgba(0,0,0,0.45),
        inset 0 1px 2px rgba(255,255,255,0.06),
        0 0 48px rgba(34,211,238,0.18)
      `,
      hoverBoxShadow: `
        0 16px 48px rgba(0,0,0,0.55),
        0 0 72px rgba(34,211,238,0.28)
      `,
      
      nameGradient: 'linear-gradient(90deg, rgb(186,230,253), rgb(34,211,238), rgb(167,243,208))',
      labelGradient: 'linear-gradient(90deg, rgb(186,230,253), rgb(34,211,238), rgb(167,243,208))',
      dividerGradient: 'linear-gradient(90deg, rgba(34,211,238,1), rgba(167,243,208,1))',
      dividerShadow: '0 0 12px rgba(34,211,238,0.45)',
      
      pillBackground: 'linear-gradient(135deg, rgba(250,250,255,1), rgba(236,254,255,0.98))',
      pillBorder: 'rgba(34,211,238,0.55)',
      pillShadow: '0 2px 8px rgba(34,211,238,0.22), inset 0 1px 2px rgba(255,255,255,.9)',
      pillHoverBorder: 'rgba(34,211,238,0.85)',
      pillHoverShadow: '0 10px 22px rgba(34,211,238,0.4), inset 0 1px 3px rgba(255,255,255,1)',
      
      tooltipBackground: 'linear-gradient(135deg, rgba(34,211,238,0.95), rgba(8,145,178,0.95))',
      tooltipShadow: '0 4px 12px rgba(34,211,238,0.4), 0 0 0 1px rgba(186,230,253,0.5)',
      tooltipArrow: 'rgba(34,211,238,0.95)',
      
      highlightBackground: 'linear-gradient(90deg, rgba(34,211,238,0.08) 0%, rgba(167,243,208,0.06) 100%)',
      highlightHoverBackground: 'linear-gradient(90deg, rgba(34,211,238,0.15) 0%, rgba(167,243,208,0.12) 100%)',
      highlightBorderImage: 'linear-gradient(180deg, rgb(34, 211, 238) 0%, rgb(167, 243, 208) 100%)',
      highlightHoverShadow: '0 4px 16px rgba(34,211,238,0.25)',
      
      resourceBackground: 'rgba(34,211,238,0.12)',
      resourceBorder: 'rgba(34,211,238,0.35)',
      resourceHoverBackground: 'rgba(34,211,238,0.18)',
      resourceHoverBorder: 'rgba(34,211,238,0.6)',
      resourceHoverShadow: '0 6px 20px rgba(34,211,238,0.3)',
    }
  },
  
  // ucf club manager theme.
  ucf: {
    name: 'ucf',
    colors: {
      background: `
        radial-gradient(ellipse at top, rgba(20, 20, 25, 0.95) 0%, rgba(35, 35, 45, 0.92) 30%, rgba(25, 25, 35, 0.95) 70%, rgba(15, 15, 20, 0.98) 100%),
        linear-gradient(135deg, rgba(200, 200, 210, 0.15) 0%, rgba(150, 150, 160, 0.08) 25%, rgba(100, 100, 110, 0.05) 50%, rgba(50, 50, 60, 0.03) 75%, rgba(20, 20, 25, 0.02) 100%),
        linear-gradient(45deg, rgba(255, 201, 4, 0.12) 0%, rgba(200, 200, 210, 0.06) 50%, rgba(255, 201, 4, 0.08) 100%)
      `,
      hoverBackground: `
        radial-gradient(ellipse at top, rgba(20, 20, 25, 0.97) 0%, rgba(35, 35, 45, 0.94) 30%, rgba(25, 25, 35, 0.97) 70%, rgba(15, 15, 20, 0.99) 100%),
        linear-gradient(135deg, rgba(200, 200, 210, 0.18) 0%, rgba(150, 150, 160, 0.12) 25%, rgba(100, 100, 110, 0.08) 50%, rgba(50, 50, 60, 0.06) 75%, rgba(20, 20, 25, 0.04) 100%),
        linear-gradient(45deg, rgba(255, 201, 4, 0.15) 0%, rgba(200, 200, 210, 0.08) 50%, rgba(255, 201, 4, 0.12) 100%)
      `,
      
      border: 'rgba(255, 201, 4, 0.4)',
      hoverBorder: 'rgba(255, 201, 4, 0.65)',
      
      boxShadow: `
        0 10px 30px rgba(0,0,0,0.5),
        inset 0 1px 2px rgba(255, 201, 4, 0.1),
        0 0 48px rgba(255, 201, 4, 0.2)
      `,
      hoverBoxShadow: `
        0 16px 48px rgba(0,0,0,0.6),
        0 0 72px rgba(255, 201, 4, 0.35)
      `,
      
      nameGradient: 'linear-gradient(100deg, #FFC904 0%, #FFD966 50%, #FFC904 100%)',
      labelGradient: 'linear-gradient(100deg, #FFC904 0%, #FFD966 50%, #FFC904 100%)',
      dividerGradient: 'linear-gradient(100deg, #FFC904 0%, #1F2937 100%)',
      dividerShadow: '0 0 12px rgba(255, 201, 4, 0.4)',
      
      pillBackground: 'linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 250, 252, 0.92) 100%)',
      pillBorder: 'rgba(255, 201, 4, 0.5)',
      pillShadow: '0 2px 8px rgba(255, 201, 4, 0.25), inset 0 1px 2px rgba(255,255,255,0.9)',
      pillHoverBorder: 'rgba(255, 201, 4, 0.85)',
      pillHoverShadow: '0 8px 20px rgba(255, 201, 4, 0.45), inset 0 1px 3px rgba(255,255,255,1)',
      
      tooltipBackground: 'linear-gradient(135deg, rgba(255, 201, 4, 0.98), rgba(255, 217, 102, 0.98))',
      tooltipShadow: '0 4px 12px rgba(255, 201, 4, 0.4), 0 0 0 1px rgba(0,0,0,0.1)',
      tooltipArrow: 'rgba(255, 201, 4, 0.98)',
      
      highlightBackground: 'linear-gradient(90deg, rgba(255, 201, 4, 0.08) 0%, rgba(31, 41, 55, 0.06) 100%)',
      highlightHoverBackground: 'linear-gradient(90deg, rgba(255, 201, 4, 0.15) 0%, rgba(31, 41, 55, 0.12) 100%)',
      highlightBorderImage: 'linear-gradient(180deg, rgb(255, 201, 4) 0%, rgb(255, 217, 102) 100%)',
      highlightHoverShadow: '0 4px 16px rgba(255, 201, 4, 0.25)',
      
      resourceBackground: 'rgba(255, 201, 4, 0.12)',
      resourceBorder: 'rgba(255, 201, 4, 0.35)',
      resourceHoverBackground: 'rgba(255, 201, 4, 0.18)',
      resourceHoverBorder: 'rgba(255, 201, 4, 0.6)',
      resourceHoverShadow: '0 6px 20px rgba(255, 201, 4, 0.3)',
    }
  },
  
  // ocean life contact manager theme.
  ocean: {
    name: 'ocean',
    colors: {
      background: `
        linear-gradient(180deg,
          rgba(0, 30, 60, 0.95) 0%,
          rgba(0, 50, 100, 0.92) 15%,
          rgba(0, 80, 140, 0.88) 35%,
          rgba(0, 100, 160, 0.85) 55%,
          rgba(0, 120, 180, 0.82) 75%,
          rgba(0, 140, 200, 0.80) 100%
        ),
        radial-gradient(ellipse at center,
          rgba(0, 150, 220, 0.15) 0%,
          rgba(0, 100, 160, 0.08) 50%,
          rgba(0, 50, 100, 0.05) 100%
        )
      `,
      hoverBackground: `
        linear-gradient(180deg,
          rgba(0, 30, 60, 0.97) 0%,
          rgba(0, 50, 100, 0.94) 15%,
          rgba(0, 80, 140, 0.90) 35%,
          rgba(0, 100, 160, 0.87) 55%,
          rgba(0, 120, 180, 0.84) 75%,
          rgba(0, 140, 200, 0.82) 100%
        ),
        radial-gradient(ellipse at center,
          rgba(0, 150, 220, 0.18) 0%,
          rgba(0, 100, 160, 0.12) 50%,
          rgba(0, 50, 100, 0.08) 100%
        )
      `,
      
      border: 'rgba(2, 136, 209, 0.45)',
      hoverBorder: 'rgba(224, 247, 250, 0.65)',
      
      boxShadow: `
        0 8px 32px rgba(0, 0, 0, 0.35),
        inset 0 1px 2px rgba(224, 247, 250, 0.25),
        0 0 40px rgba(2, 119, 189, 0.35)
      `,
      hoverBoxShadow: `
        0 12px 48px rgba(0, 0, 0, 0.45),
        inset 0 2px 3px rgba(224, 247, 250, 0.35),
        0 0 60px rgba(2, 119, 189, 0.55)
      `,
      
      nameGradient: 'linear-gradient(100deg, #e0f7fa 0%, #a5e9ff 50%, #9be7f7 100%)',
      labelGradient: 'linear-gradient(100deg, #e0f7fa 0%, #a5e9ff 50%, #9be7f7 100%)',
      dividerGradient: 'linear-gradient(90deg, #e0f7fa, #6ec6ff, #0288d1)',
      dividerShadow: '0 0 10px rgba(110, 198, 255, 0.45)',
      
      pillBackground: 'linear-gradient(135deg, #ffffff 0%, #f2fbff 50%, #e8f7ff 100%)',
      pillBorder: 'rgba(110,198,255,0.6)',
      pillShadow: '0 2px 8px rgba(110,198,255,0.27), inset 0 1px 2px rgba(255,255,255,0.95)',
      pillHoverBorder: 'rgba(224,247,250,0.9)',
      pillHoverShadow: '0 8px 20px rgba(110,198,255,0.45), inset 0 1px 3px rgba(255,255,255,1)',
      
      tooltipBackground: 'linear-gradient(135deg, rgba(2,136,209,0.96), rgba(1,79,121,0.96))',
      tooltipShadow: '0 4px 12px rgba(2,136,209,0.35), 0 0 0 1px rgba(224,247,250,0.4)',
      tooltipArrow: 'rgba(2,136,209,0.96)',
      
      highlightBackground: 'linear-gradient(90deg, rgba(224,247,250,0.08) 0%, rgba(110,198,255,0.06) 100%)',
      highlightHoverBackground: 'linear-gradient(90deg, rgba(224,247,250,0.15) 0%, rgba(110,198,255,0.12) 100%)',
      highlightBorderImage: 'linear-gradient(180deg, rgb(224, 247, 250) 0%, rgb(110, 198, 255) 100%)',
      highlightHoverShadow: '0 4px 16px rgba(224,247,250,0.25)',
      
      resourceBackground: 'rgba(224,247,250,0.12)',
      resourceBorder: 'rgba(224,247,250,0.35)',
      resourceHoverBackground: 'rgba(224,247,250,0.18)',
      resourceHoverBorder: 'rgba(224,247,250,0.6)',
      resourceHoverShadow: '0 6px 20px rgba(224,247,250,0.3)',
    }
  }
};

export default themes;
