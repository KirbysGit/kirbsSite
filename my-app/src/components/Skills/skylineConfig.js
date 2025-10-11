// ============================================
// SKYLINE CONFIGURATION
// Centralized building data and styling
// ============================================

// Realistic building material palettes
export const buildingPalettes = {
  // Modern glass tower (blue-tinted glass)
  glass_blue: { 
    base: "#8BA5B8", 
    mid: "#6B8599", 
    dark: "#4A5F6E", 
    accent: "#B5C9D8" 
  },
  // Sleek steel/aluminum (cool grays)
  steel: { 
    base: "#A0A8B0", 
    mid: "#7E868E", 
    dark: "#5C646C", 
    accent: "#C8D0D8" 
  },
  // Concrete high-rise (warm grays)
  concrete: { 
    base: "#B8B0A8", 
    mid: "#968E86", 
    dark: "#746C64", 
    accent: "#D8D0C8" 
  },
  // Modern glass tower (greenish tint)
  glass_green: { 
    base: "#9BB5A8", 
    mid: "#7B9588", 
    dark: "#5B7568", 
    accent: "#BBD5C8" 
  },
  // Sandstone/beige building
  sandstone: { 
    base: "#C8B8A0", 
    mid: "#A89880", 
    dark: "#887860", 
    accent: "#E8D8C0" 
  },
  // Brick building (reddish-brown)
  brick: { 
    base: "#B89888", 
    mid: "#987868", 
    dark: "#785848", 
    accent: "#D8B8A8" 
  },
  // Dark modern tower (charcoal)
  charcoal: { 
    base: "#888890", 
    mid: "#686870", 
    dark: "#484850", 
    accent: "#A8A8B0" 
  },
  // Limestone/tan building
  limestone: { 
    base: "#C0B0A0", 
    mid: "#A09080", 
    dark: "#807060", 
    accent: "#E0D0C0" 
  },
};

// Map each skill/technology to a building material
export const buildingMaterialMap = {
  "AWS": "charcoal",
  "PostgreSQL": "glass_blue",
  "React": "steel",
  "Django": "concrete",
  "Python": "glass_green",
  "FastAPI": "limestone",
  "Docker": "glass_blue",
  "JavaScript": "sandstone",
  "Bootstrap": "brick",
  "Figma": "steel",
  "UI / UX Design": "concrete",
  "Tailwind CSS": "glass_green",
  "Postman": "sandstone",
  "Vercel": "charcoal",
  "Flutter": "glass_blue",
  "Data Modeling": "limestone",
  "Machine Learning": "steel",
};

// ============================================
// BUILDING CONFIGURATIONS
// ============================================
// Properties explained:
//   name: Technology/skill name (must match logoMap keys)
//   level: Building height (0.0 - 1.0, where 1.0 is tallest)
//   depth: Distance from viewer (0.0 = far/muted, 1.0 = close/bright) - THIS controls layering!
//   leftPos: Horizontal position (0-100, percentage from left)
//   w: Building width as percentage of container (8-25 recommended)
//   cap: Top decoration ("flat", "crown", "peak", or "billboard")

// All buildings in one array - organized by depth for readability
// Low depth (0.3-0.5) = background, High depth (0.8-1.0) = foreground
export const buildings = [
  // ===== BACKGROUND BUILDINGS (depth 0.3-0.5) =====
  { 
    name: "AWS", 
    level: 0.1,      // Very tall (98% of max height)
    depth: 0.95,      // Far back (muted/blurred)
    leftPos: 2,       // 2% from left
    w: 20,            // 11% of container width
    cap: "crown"      // Crown decoration on top
  },
  { 
    name: "React", 
    level: 0.9,      // Very tall (98% of max height)
    depth: 0.1,      // Far back (muted/blurred)
    leftPos: 7.5,       // 2% from left
    w: 15,            // 11% of container width
    cap: "crown"      // Crown decoration on top
  },
  { 
    name: "Django", 
    level: 0.35,      // Very tall (98% of max height)
    depth: 0.9,      // Far back (muted/blurred)
    leftPos: 5,       // 2% from left
    w: 17.5,            // 11% of container width
    cap: "crown"      // Crown decoration on top
  },
  {
    name: "CSS3",
    level: 0.75,
    depth: 0.4,
    leftPos: 52.5,
    w: 17.5,
    cap: "flat"
  },
  { 
    name: "PostgreSQL", 
    level: 0.5,      // Very tall (98% of max height)
    depth: 0.4,      // Far back (muted/blurred)
    leftPos: 27,       // 2% from left
    w: 16.75,            // 11% of container width
    cap: "flat"      // Crown decoration on top
  },
  {
    name: "Node.js",
    level: 0.825,
    depth: 0.3,
    leftPos: 22,
    w: 17.5,
    cap: "flat"
  },
  { 
    name: "Python", 
    level: 1,      // Very tall (98% of max height)
    depth: 0.2,      // Far back (muted/blurred)
    leftPos: 37.5,       // 2% from left
    w: 16.75,            // 11% of container width
    cap: "crown"      // Crown decoration on top
  },
  {
    name: "MongoDB",
    level: 0.4,
    depth: 0.9,
    leftPos: 43,
    w: 17.5,
    cap: "flat"
  },
  {
    name: "HTML5",
    level: 0.55,
    depth: 0.8,
    leftPos: 13,
    w: 17.5,
    cap: "flat"
  },
  { 
    name: "JavaScript", 
    level: 0.925,      // Very tall (98% of max height)
    depth: 0.3,      // Far back (muted/blurred)
    leftPos: 67.5,       // 2% from left
    w: 15,            // 11% of container width
    cap: "crown"      // Crown decoration on top
  },
  { 
    name: "Flutter", 
    level: 0.6,      // Very tall (98% of max height)
    depth: 0.75,      // Far back (muted/blurred)
    leftPos: 64,       // 2% from left
    w: 15,            // 11% of container width
    cap: "crown"      // Crown decoration on top
  },
  { 
    name: "Bootstrap", 
    level: 0.25,      // Very tall (98% of max height)
    depth: 0.92,      // Far back (muted/blurred)
    leftPos: 70,       // 2% from left
    w: 15,            // 11% of container width
    cap: "crown"      // Crown decoration on top
  },
  { 
    name: "Tailwind CSS", 
    level: 0.4,      // Very tall (98% of max height)
    depth: 0.9,      // Far back (muted/blurred)
    leftPos: 75,       // 2% from left
    w: 17.5,            // 11% of container width
    cap: "crown"      // Crown decoration on top
  },
  {
    name: "Vercel",
    level: 0.3,
    depth: 0.95,
    leftPos: 55,
    w: 17.5,
    cap: "flat"
  },
  {
    name: "Railway",
    level: 0.3,
    depth: 0.95,
    leftPos: 32,
    w: 15,
    cap: "flat"
  },
  {
    name: "FastAPI",
    level: 0.55,
    depth: 0.7,
    leftPos: 42,
    w: 15,
    cap: "flat"
  },
  {
    name: "Google OAuth",
    level: 0.25,
    depth: 0.9,
    leftPos: 20,
    w: 15,
    cap: "flat"
  },
  {
    name: "Java",
    level: 0.65,
    depth: 0.7,
    leftPos: 3,
    w: 15,
    cap: "flat"
  },
  {
    name: "C++",
    level: 0.675,
    depth: 0.5,
    leftPos: 74,
    w: 15,
    cap: "flat"
  },
  {
    name: "Docker",
    level: 0.2,
    depth: 0.95,
    leftPos: 42,
    w: 15,
    cap: "flat"
  }
];

// ============================================
// HELPER NOTES
// ============================================
/*
LEVEL (height): 
  - 0.0 to 1.0 scale (creates DRAMATIC height differences!)
  - 0.1-0.3 = short building (~110-216px)
  - 0.4-0.6 = medium building (~268-372px)
  - 0.7-0.85 = tall building (~424-502px)
  - 0.9-1.0 = skyscraper (~528-580px, uses 96% of container!)

DEPTH (distance from viewer) - THIS IS WHAT CONTROLS LAYERING:
  - 0.0 to 1.0 scale
  - 0.3-0.5 = background (muted colors, slight blur, smaller scale)
  - 0.5-0.7 = middle ground (moderate colors, normal scale)
  - 0.8-1.0 = foreground (bright, sharp, larger scale, higher z-index)
  - Buildings automatically layer based on depth value
  - No need for separate layer arrays!

LEFTPOS (horizontal position):
  - 0 to 100 (percentage of container width)
  - 0 = far left edge
  - 50 = center
  - 100 = far right edge

WIDTH (w):
  - Percentage width of container (responsive)
  - 8-10 = narrow tower (~70-85px)
  - 11-14 = medium building (~95-120px)
  - 15-18 = wide building (~130-155px)
  - 19+ = extra wide building (160px+)

CAP (top decoration):
  - "flat" = no decoration
  - "crown" = pointed crown on top
  - "peak" = larger peak
  - "billboard" = rectangular sign on top
*/

