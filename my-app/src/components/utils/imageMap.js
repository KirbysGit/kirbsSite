/**
 * Centralized Image Map
 * Organizes all site images by section and priority for easy preloading
 */

// ========== HERO SECTION (Critical - LCP) ==========
import astronautImg from '@/images/1hero/astronaut.png';
import ufoImg from '@/images/1hero/ufo.png';
import cloud1Img from '@/images/3experience/clouds/cloud1.png';
import cloud2Img from '@/images/3experience/clouds/cloud2.png';
import cloud3Img from '@/images/3experience/clouds/cloud3.png';
import cloud4Img from '@/images/3experience/clouds/cloud4.png';
import cloud5Img from '@/images/3experience/clouds/cloud5.png';

// ========== ABOUT SECTION ==========
// Profile & logos
import meImage from '@/images/5about/me.jpg';
import shpeLogo from '@/images/5about/shpe.png';
import knightHacksLogo from '@/images/5about/knightshacks.png';
import aiUcfLogo from '@/images/5about/aiucf.png';
import acmLogo from '@/images/5about/acm.png';

import shellphone from '@/images/5about/shellphone.png';
import messageBottle from '@/images/5about/messagebottle.png';

// ========== PROJECTS SECTION ==========
// Sentiment Trader
import sentimentTraderLogo from '@/images/4projects/sentiment_trader/sentimenttrader.png';
import sentimentTraderLightningTalk from '@/images/4projects/sentiment_trader/LT_preview.png';
import sentimentTraderPaper from '@/images/4projects/sentiment_trader/ST_preview.png';

// Shelf Vision
import shelfVisionLogo from '@/images/4projects/shelf_vision/shelfvision.png';
import shelfVisionPaper from '@/images/4projects/shelf_vision/SV_paper.png';
import shelfVisionPresentation from '@/images/4projects/shelf_vision/SV_pres.png';

// UCF Club Manager
import ucfClubManagerLogo from '@/images/4projects/ucf_manager/ucflogo.png';
import ucfClubManagerPresentation from '@/images/4projects/ucf_manager/ucf_preview.png';
import ucfClubManagerFigma from '@/images/4projects/ucf_manager/figmapreview.png';

// SecureScape
import secureScapeLogo from '@/images/4projects/secure_scape/securescape.png';
import secureScapePreview from '@/images/4projects/secure_scape/ss_preview.png';

// Ocean Life
import oceanLifeLogo from '@/images/4projects/ocean_life/oceanlife.png';
import oceanLifePreview from '@/images/4projects/ocean_life/OLpreview.png';

// Centi
import centiBanner from '@/images/4projects/centi/centi_banner.png';
import centiPreview from '@/images/4projects/centi/centiPreview.png';

// ========== EXPERIENCE SECTION ==========
import curiousImg from '@/images/3experience/curious.jpg';
import bitgoLogo from '@/images/3experience/bitgoSmall.jpg';
import barLouieLogo from '@/images/3experience/blSmall.png';
import hawkersLogo from '@/images/3experience/hawkersSmall.png';

// ========== WHO I AM / STORY SECTION ==========
import spaceStation from '@/images/2story/spacestation.png';
import satellite1 from '@/images/2story/satellite1.png';
import satellite2 from '@/images/2story/satellite2.png';
import lilG from '@/images/2story/lilG.jpg';
import mySetUp from '@/images/2story/mySetUp.jpg';
import secondHome from '@/images/2story/secondHome.jpg';
import naturalAthlete from '@/images/2story/naturalAthlete.jpg';
import engineeringGuy from '@/images/2story/engineeringGuy.jpg';
import coding from '@/images/2story/coding.jpg';
import sdGroup from '@/images/2story/sdGroup.jpg';
import gradDog from '@/images/2story/gradDog.jpg';
import legos from '@/images/2story/legos.jpg';

// ========== SKILLS SECTION ==========
import gitLogo from '@/images/logos/git.png';
import canvaLogo from '@/images/logos/canva.png';
import figmaLogo from '@/images/logos/figma.png';
import msofficeLogo from '@/images/logos/msoffice.png';

/**
 * Image Map organized by section and priority
 * 
 * Priority levels:
 * - critical: Above the fold, must load first (affects LCP)
 * - important: Visible early, should preload
 * - lazy: Below the fold, can lazy load
 */
export const imageMap = {
  hero: {
    critical: [astronautImg, ufoImg],
    important: [cloud1Img, cloud2Img, cloud3Img],
    lazy: [cloud4Img, cloud5Img],
    all: [astronautImg, ufoImg, cloud1Img, cloud2Img, cloud3Img, cloud4Img, cloud5Img],
  },
  about: {
    important: [meImage, shpeLogo, knightHacksLogo, aiUcfLogo, acmLogo],
    lazy: [shellphone, messageBottle],
    all: [
      meImage,
      shpeLogo,
      knightHacksLogo,
      aiUcfLogo,
      acmLogo,
      shellphone,
      messageBottle,
    ],
  },
  projects: {
    important: [
      sentimentTraderLogo,
      shelfVisionLogo,
      ucfClubManagerLogo,
      secureScapeLogo,
      oceanLifeLogo,
      centiBanner,
    ],
    lazy: [
      sentimentTraderLightningTalk,
      sentimentTraderPaper,
      shelfVisionPaper,
      shelfVisionPresentation,
      ucfClubManagerPresentation,
      ucfClubManagerFigma,
      secureScapePreview,
      oceanLifePreview,
      centiPreview,
    ],
    all: [
      sentimentTraderLogo,
      sentimentTraderLightningTalk,
      sentimentTraderPaper,
      shelfVisionLogo,
      shelfVisionPaper,
      shelfVisionPresentation,
      ucfClubManagerLogo,
      ucfClubManagerPresentation,
      ucfClubManagerFigma,
      secureScapeLogo,
      secureScapePreview,
      oceanLifeLogo,
      oceanLifePreview,
      centiBanner,
      centiPreview,
    ],
  },
  experience: {
    important: [curiousImg, bitgoLogo, barLouieLogo, hawkersLogo],
    lazy: [],
    all: [curiousImg, bitgoLogo, barLouieLogo, hawkersLogo],
  },
  whoIAm: {
    important: [spaceStation, satellite1, satellite2],
    lazy: [
      lilG,
      mySetUp,
      secondHome,
      naturalAthlete,
      engineeringGuy,
      coding,
      sdGroup,
      gradDog,
      legos,
    ],
    all: [
      spaceStation,
      satellite1,
      satellite2,
      lilG,
      mySetUp,
      secondHome,
      naturalAthlete,
      engineeringGuy,
      coding,
      sdGroup,
      gradDog,
      legos,
    ],
  },
  skills: {
    important: [gitLogo, canvaLogo, figmaLogo, msofficeLogo],
    lazy: [],
    all: [gitLogo, canvaLogo, figmaLogo, msofficeLogo],
  },
};

/**
 * Get all critical images (above the fold, affects LCP)
 */
export const getCriticalImages = () => {
  return imageMap.hero.critical;
};

/**
 * Get all important images (visible early, should preload)
 */
export const getImportantImages = () => {
  return [
    ...imageMap.hero.important,
    ...imageMap.about.important,
    ...imageMap.projects.important,
    ...imageMap.experience.important,
    ...imageMap.whoIAm.important,
    ...imageMap.skills.important,
  ];
};

/**
 * Get all lazy images (below the fold)
 */
export const getLazyImages = () => {
  return [
    ...imageMap.hero.lazy,
    ...imageMap.about.lazy,
    ...imageMap.projects.lazy,
    ...imageMap.experience.lazy,
    ...imageMap.whoIAm.lazy,
    ...imageMap.skills.lazy,
  ];
};

/**
 * Get all images by section
 * @param {string} section - Section name (e.g., 'about', 'hero')
 * @param {string} priority - Optional: 'critical', 'important', 'lazy', or 'all' (default)
 */
export const getImagesBySection = (section, priority = 'all') => {
  if (!imageMap[section]) return [];
  if (priority === 'all') {
    return imageMap[section].all || [];
  }
  return imageMap[section][priority] || [];
};

/**
 * Get images by priority across all sections
 */
export const getImagesByPriority = (priority) => {
  const sections = Object.keys(imageMap);
  return sections.reduce((acc, section) => {
    const sectionImages = imageMap[section][priority] || [];
    return [...acc, ...sectionImages];
  }, []);
};

/**
 * Get all images (for comprehensive preloading)
 */
export const getAllImages = () => {
  return Object.values(imageMap).reduce((acc, section) => {
    return [...acc, ...section.all];
  }, []);
};

// Export individual images for backward compatibility
export {
  // Hero
  astronautImg,
  ufoImg,
  cloud1Img,
  cloud2Img,
  cloud3Img,
  cloud4Img,
  cloud5Img,
  // About
  meImage,
  shpeLogo,
  knightHacksLogo,
  aiUcfLogo,
  acmLogo,
  // Projects
  sentimentTraderLogo,
  sentimentTraderLightningTalk,
  sentimentTraderPaper,
  shelfVisionLogo,
  shelfVisionPaper,
  shelfVisionPresentation,
  ucfClubManagerLogo,
  ucfClubManagerPresentation,
  ucfClubManagerFigma,
  secureScapeLogo,
  secureScapePreview,
  oceanLifeLogo,
  oceanLifePreview,
  centiBanner,
  centiPreview,
  // Experience
  curiousImg,
  bitgoLogo,
  barLouieLogo,
  hawkersLogo,
  // WhoIAm
  spaceStation,
  satellite1,
  satellite2,
  lilG,
  mySetUp,
  secondHome,
  naturalAthlete,
  engineeringGuy,
  coding,
  sdGroup,
  gradDog,
  legos,
  // Skills
  gitLogo,
  canvaLogo,
  figmaLogo,
  msofficeLogo,
  shellphone,
  messageBottle,
};

