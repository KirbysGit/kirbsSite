// skylineConfig.js

// config for styling of skyline.


// brand-specific building palettes - subtle but recognizable.
export const buildingPalettes = {
  // react - muted cyan/light blue.
  react: { 
    base: "#5DB3D1", 
    mid: "#4A9BB8", 
    dark: "#3A7A93", 
    accent: "#7CC5DE" 
  },
  // python - muted blue with subtle yellow accent.
  python: { 
    base: "#5280A0", 
    mid: "#3E6A8C", 
    dark: "#2F5269", 
    accent: "#D4B842" 
  },
  // node.js - muted green.
  node: { 
    base: "#6B9B6A", 
    mid: "#588057", 
    dark: "#456844", 
    accent: "#8AB189" 
  },
  // postgres - muted deep blue.
  postgres: { 
    base: "#527EA3", 
    mid: "#3E6685", 
    dark: "#2E4D64", 
    accent: "#6D93B5" 
  },
  // javascript - toned down yellow with warmth.
  javascript: { 
    base: "#D4BB52", 
    mid: "#B5A047", 
    dark: "#8A7836", 
    accent: "#E5D079" 
  },
  // css3 - muted blue.
  css: { 
    base: "#4D87B0", 
    mid: "#3A6E94", 
    dark: "#2B5470", 
    accent: "#6EA0C3" 
  },
  // html5 - muted orange/red.
  html: { 
    base: "#C76E56", 
    mid: "#AD5B44", 
    dark: "#854534", 
    accent: "#D9886F" 
  },
  // mongodb - muted green.
  mongo: { 
    base: "#63A264", 
    mid: "#4F8750", 
    dark: "#3C673D", 
    accent: "#83B784" 
  },
  // django - muted dark green.
  django: { 
    base: "#3A6B5A", 
    mid: "#2D5446", 
    dark: "#1E3A2F", 
    accent: "#5B8873" 
  },
  // bootstrap - muted purple.
  bootstrap: { 
    base: "#7F6BB5", 
    mid: "#6A5899", 
    dark: "#524474", 
    accent: "#9987C8" 
  },
  // tailwind css - muted cyan.
  tailwind: { 
    base: "#4DB3C2", 
    mid: "#3B96A3", 
    dark: "#2C707C", 
    accent: "#73C7D4" 
  },
  // flutter - muted blue.
  flutter: { 
    base: "#4778A8", 
    mid: "#366089", 
    dark: "#284967", 
    accent: "#6B9BC3" 
  },
  // docker - muted blue.
  docker: { 
    base: "#5698C9", 
    mid: "#427DAD", 
    dark: "#325F84", 
    accent: "#79B0DB" 
  },
  // aws - muted orange with dark.
  aws: { 
    base: "#CC8833", 
    mid: "#B57529", 
    dark: "#3A4552", 
    accent: "#D9A05C" 
  },
  // vercel - black with subtle white accents.
  vercel: { 
    base: "#2A2A2A", 
    mid: "#1A1A1A", 
    dark: "#0A0A0A", 
    accent: "#E5E5E5" 
  },
  // java - muted blue.
  java: { 
    base: "#4A829E", 
    mid: "#386883", 
    dark: "#2A4E62", 
    accent: "#6C9FB3" 
  },
  // c++ - muted blue.
  cpp: { 
    base: "#4275A3", 
    mid: "#325E89", 
    dark: "#254767", 
    accent: "#6591B8" 
  },
  // fastapi - muted teal.
  fastapi: { 
    base: "#4B9088", 
    mid: "#3A756E", 
    dark: "#2B5954", 
    accent: "#6FA9A1" 
  },
  // google oauth - muted blue with yellow accent.
  google: { 
    base: "#5A84C2", 
    mid: "#456CA6", 
    dark: "#34527D", 
    accent: "#CFA740" 
  },
  // railway - muted purple.
  railway: { 
    base: "#7D69C9", 
    mid: "#6655AD", 
    dark: "#4E4185", 
    accent: "#9B89DB" 
  },
};

// map each skill/technology to its brand palette.
export const buildingMaterialMap = {
  "AWS": "aws",
  "PostgreSQL": "postgres",
  "React": "react",
  "Django": "django",
  "Python": "python",
  "FastAPI": "fastapi",
  "Docker": "docker",
  "JavaScript": "javascript",
  "Bootstrap": "bootstrap",
  "Tailwind CSS": "tailwind",
  "Vercel": "vercel",
  "Flutter": "flutter",
  "Node.js": "node",
  "CSS3": "css",
  "HTML5": "html",
  "MongoDB": "mongo",
  "Java": "java",
  "C++": "cpp",
  "Google OAuth": "google",
  "Railway": "railway",
};

// ============================================
// BUILDING CONFIGURATIONS
// ============================================
// Properties explained:
//   name:      technology/skill name (must match logoMap keys)
//   level:     building height (0.0 - 1.0, where 1.0 is tallest)
//   depth:     distance from viewer (0.0 = far/muted, 1.0 = close/bright) - THIS controls layering!
//   leftPos:   horizontal position (0-100, percentage from left)
//   w:         building width as percentage of container (8-25 recommended)
//   cap:       top decoration ("flat", "crown", "peak", or "billboard")

// all buildings in one array - organized by depth for readability
// low depth (0.3-0.5) = background, high depth (0.8-1.0) = foreground
export const buildings = [

	// ===== background buildings (depth 0.3-0.5) =====
	// aws.
	{ 
		name: "AWS", 
		level: 0.1,
		depth: 0.95,
		leftPos: 2,
		w: 20,
		cap: "watertower"
	},
	// react.
	{ 
		name: "React", 
		level: 0.9,
		depth: 0.1,
		leftPos: 7.5,
		w: 15,
		cap: "gable"
	},
	// django.
	{ 
		name: "Django", 
		level: 0.35,
		depth: 0.9,
		leftPos: 5,
		w: 17.5,
		cap: "ac"
	},
	// css3.
	{
		name: "CSS3",
		level: 0.75,
		depth: 0.4,
		leftPos: 52.5,
		w: 17.5,
		cap: "dome"
	},
	// postgres.
	{ 
		name: "PostgreSQL", 
		level: 0.5,
		depth: 0.4,
		leftPos: 27,
		w: 16.75,
		cap: "radio"
	},
	// node.js.
	{
		name: "Node.js",
		level: 0.825,
		depth: 0.3,
		leftPos: 22,
		w: 17.5,
		cap: "dome"
	},
	// python.
	{ 
		name: "Python", 
		level: 1,
		depth: 0.2,
		leftPos: 37.5,
		w: 16.75,
		cap: "spire"
	},
	// mongodb.
	{
		name: "MongoDB",
		level: 0.4,
		depth: 0.9,
		leftPos: 43,
		w: 17.5,
		cap: "chimney"
	},
	// html5.
	{
		name: "HTML5",
		level: 0.55,
		depth: 0.8,
		leftPos: 13,
		w: 17.5,
		cap: "mansard"
	},
	// javascript.
	{ 
		name: "JavaScript", 
		level: 0.925,
		depth: 0.3,
		leftPos: 67.5,
		w: 15,
		cap: "gable"
	},
	// flutter.
	{ 
		name: "Flutter", 
		level: 0.6,
		depth: 0.75,
		leftPos: 64,
		w: 15,
		cap: "ac"
	},
	// bootstrap.
	{ 
		name: "Bootstrap", 
		level: 0.25,
		depth: 0.92,
		leftPos: 70,
		w: 15,
		cap: "ac"
	},
	// tailwind css.
	{ 
		name: "Tailwind CSS", 
		level: 0.4,
		depth: 0.9,
		leftPos: 75,
		w: 17.5,
		cap: "stairwell"
	},
	// vercel.
	{
		name: "Vercel",
		level: 0.3,
		depth: 0.95,
		leftPos: 55,
		w: 17.5,
		cap: "watertower"
	},
	// railway.
	{
		name: "Railway",
		level: 0.3,
		depth: 0.95,
		leftPos: 32,
		w: 15,
		cap: "flat"
	},
	// fastapi.
	{
		name: "FastAPI",
		level: 0.6,
		depth: 0.7,
		leftPos: 42,
		w: 15,
		cap: "mansard"
	},
	// google oauth.
	{
		name: "Google OAuth",
		level: 0.25,
		depth: 0.9,
		leftPos: 20,
		w: 15,
		cap: "chimney"
	},
	// java.
	{
		name: "Java",
		level: 0.65,
		depth: 0.7,
		leftPos: 3,
		w: 15,
		cap: "stairwell"
	},
	// c++.
	{
		name: "C++",
		level: 0.675,
		depth: 0.5,
		leftPos: 74,
		w: 15,
		cap: "radio"
	},
	// docker.
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
// helper notes
// ============================================
/*
level (height): 
  - 0.1-0.3 	= 	short building (~110-216px)
  - 0.4-0.6 	= 	medium building (~268-372px)
  - 0.7-0.85 	= 	tall building (~424-502px)
  - 0.9-1.0 	= 	skyscraper (~528-580px, uses 96% of container!)

depth (distance from viewer) - this is what controls layering:
  - 0.3-0.5 	= 	background (muted colors, slight blur, smaller scale)
  - 0.5-0.7 	= 	middle ground (moderate colors, normal scale)
  - 0.8-1.0 	= 	foreground (bright, sharp, larger scale, higher z-index)


leftPos (horizontal position):
  - 0 		= 	far left edge
  - 50 		= 	center
  - 100 	= 	far right edge

WIDTH (w):
  - percentage width of container (responsive)
  - 8-10 	= 	narrow tower (~70-85px)
  - 11-14 	= 	medium building (~95-120px)
  - 15-18 	= 	wide building (~130-155px)
  - 19+ 	= 	extra wide building (160px+)

CAP (top decoration):
  - "flat" 			= no decoration (clean roof)
  - "crown" 		= stepped crown (art deco style)
  - "peak" 			= pyramidal peak with beacon
  - "billboard" 	= rectangular sign on posts
  - "spire" 		= empire state building-style spire (stepped penthouse + mast with beacon)
  - "dome" 			= textured dome with decorative spike finial (planetarium/observatory style)
  - "gable" 		= slanted triangular roof with dual parapets and 3d perspective depth
  - "ac" 			= rooftop ac/hvac units with vents, fans, and 3d perspective
  - "stairwell" 	= fire exit/stairwell box with door, window, and rooftop safety barrier
  - "radio" 		= radio/cell tower with tapered lattice structure, antenna array, and red warning lights
  - "watertower" 	= classic nyc water tower with cylindrical tank, support legs, conical roof, and metal bands
  - "mansard" 		= french mansard roof with steep slopes, dormer windows, flat top, and chimney
  - "chimney" 		= two brick chimneys with mortar lines, concrete caps, and nyc rooftop styling
*/

