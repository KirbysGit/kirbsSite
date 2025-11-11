// brandColors.js

// Returns brand-consistent gradient/border/shadow colors for skill pills
export const getBrandColors = (name) => {
  const colorMap = {
    'React': {
      gradient: 'linear-gradient(135deg, rgba(97, 218, 251, 0.35) 0%, rgba(97, 218, 251, 0.22) 50%, rgba(97, 218, 251, 0.18) 100%)',
      border: 'rgba(97, 218, 251, 0.5)',
      shadow: 'rgba(97, 218, 251, 0.15)',
      hoverShadow: 'rgba(97, 218, 251, 0.28)',
      hoverGlow: 'rgba(97, 218, 251, 0.15)',
      hoverBorder: 'rgba(97, 218, 251, 0.75)'
    },
    'JavaScript': {
      gradient: 'linear-gradient(135deg, rgba(247, 223, 30, 0.35) 0%, rgba(247, 223, 30, 0.22) 50%, rgba(247, 223, 30, 0.18) 100%)',
      border: 'rgba(247, 223, 30, 0.5)',
      shadow: 'rgba(247, 223, 30, 0.15)',
      hoverShadow: 'rgba(247, 223, 30, 0.28)',
      hoverGlow: 'rgba(247, 223, 30, 0.15)',
      hoverBorder: 'rgba(247, 223, 30, 0.75)'
    },
    'WebSockets': {
      gradient: 'linear-gradient(135deg, rgba(138, 43, 226, 0.35) 0%, rgba(138, 43, 226, 0.22) 50%, rgba(138, 43, 226, 0.18) 100%)',
      border: 'rgba(138, 43, 226, 0.5)',
      shadow: 'rgba(138, 43, 226, 0.15)',
      hoverShadow: 'rgba(138, 43, 226, 0.28)',
      hoverGlow: 'rgba(138, 43, 226, 0.15)',
      hoverBorder: 'rgba(138, 43, 226, 0.75)'
    },
    'Python': {
      gradient: 'linear-gradient(135deg, rgba(67, 120, 200, 0.35) 0%, rgba(67, 120, 200, 0.22) 50%, rgba(67, 120, 200, 0.18) 100%)',
      border: 'rgba(67, 120, 200, 0.5)',
      shadow: 'rgba(67, 120, 200, 0.15)',
      hoverShadow: 'rgba(67, 120, 200, 0.28)',
      hoverGlow: 'rgba(67, 120, 200, 0.15)',
      hoverBorder: 'rgba(67, 120, 200, 0.75)'
    },
    'Django': {
      gradient: 'linear-gradient(135deg, rgba(9, 45, 32, 0.35) 0%, rgba(9, 45, 32, 0.22) 50%, rgba(9, 45, 32, 0.18) 100%)',
      border: 'rgba(9, 45, 32, 0.5)',
      shadow: 'rgba(9, 45, 32, 0.15)',
      hoverShadow: 'rgba(9, 45, 32, 0.28)',
      hoverGlow: 'rgba(9, 45, 32, 0.15)',
      hoverBorder: 'rgba(9, 45, 32, 0.75)'
    },
    'Celery': {
      gradient: 'linear-gradient(135deg, rgba(169, 209, 142, 0.35) 0%, rgba(169, 209, 142, 0.22) 50%, rgba(169, 209, 142, 0.18) 100%)',
      border: 'rgba(169, 209, 142, 0.5)',
      shadow: 'rgba(169, 209, 142, 0.15)',
      hoverShadow: 'rgba(169, 209, 142, 0.28)',
      hoverGlow: 'rgba(169, 209, 142, 0.15)',
      hoverBorder: 'rgba(169, 209, 142, 0.75)'
    },
    'PostgreSQL': {
      gradient: 'linear-gradient(135deg, rgba(68, 137, 217, 0.35) 0%, rgba(68, 137, 217, 0.22) 50%, rgba(68, 137, 217, 0.18) 100%)',
      border: 'rgba(68, 137, 217, 0.5)',
      shadow: 'rgba(68, 137, 217, 0.15)',
      hoverShadow: 'rgba(68, 137, 217, 0.28)',
      hoverGlow: 'rgba(68, 137, 217, 0.15)',
      hoverBorder: 'rgba(68, 137, 217, 0.75)'
    },
    'Docker': {
      gradient: 'linear-gradient(135deg, rgba(13, 110, 253, 0.35) 0%, rgba(13, 110, 253, 0.22) 50%, rgba(13, 110, 253, 0.18) 100%)',
      border: 'rgba(13, 110, 253, 0.5)',
      shadow: 'rgba(13, 110, 253, 0.15)',
      hoverShadow: 'rgba(13, 110, 253, 0.28)',
      hoverGlow: 'rgba(13, 110, 253, 0.15)',
      hoverBorder: 'rgba(13, 110, 253, 0.75)'
    },
    'Nginx': {
      gradient: 'linear-gradient(135deg, rgba(46, 125, 50, 0.35) 0%, rgba(46, 125, 50, 0.22) 50%, rgba(46, 125, 50, 0.18) 100%)',
      border: 'rgba(46, 125, 50, 0.5)',
      shadow: 'rgba(46, 125, 50, 0.15)',
      hoverShadow: 'rgba(46, 125, 50, 0.28)',
      hoverGlow: 'rgba(46, 125, 50, 0.15)',
      hoverBorder: 'rgba(46, 125, 50, 0.75)'
    },
    'Gunicorn': {
      gradient: 'linear-gradient(135deg, rgba(19, 78, 74, 0.35) 0%, rgba(19, 78, 74, 0.22) 50%, rgba(19, 78, 74, 0.18) 100%)',
      border: 'rgba(19, 78, 74, 0.5)',
      shadow: 'rgba(19, 78, 74, 0.15)',
      hoverShadow: 'rgba(19, 78, 74, 0.28)',
      hoverGlow: 'rgba(19, 78, 74, 0.15)',
      hoverBorder: 'rgba(19, 78, 74, 0.75)'
    },
    'AWS EC2': {
      gradient: 'linear-gradient(135deg, rgba(255, 153, 0, 0.35) 0%, rgba(255, 153, 0, 0.22) 50%, rgba(255, 153, 0, 0.18) 100%)',
      border: 'rgba(255, 153, 0, 0.5)',
      shadow: 'rgba(255, 153, 0, 0.15)',
      hoverShadow: 'rgba(255, 153, 0, 0.28)',
      hoverGlow: 'rgba(255, 153, 0, 0.15)',
      hoverBorder: 'rgba(255, 153, 0, 0.75)'
    },
    'OAuth SSO': {
      gradient: 'linear-gradient(135deg, rgba(255, 82, 82, 0.35) 0%, rgba(255, 82, 82, 0.22) 50%, rgba(255, 82, 82, 0.18) 100%)',
      border: 'rgba(255, 82, 82, 0.5)',
      shadow: 'rgba(255, 82, 82, 0.15)',
      hoverShadow: 'rgba(255, 82, 82, 0.28)',
      hoverGlow: 'rgba(255, 82, 82, 0.15)',
      hoverBorder: 'rgba(255, 82, 82, 0.75)'
    }
  };
  return colorMap[name] || colorMap['React'];
};

export default getBrandColors;


