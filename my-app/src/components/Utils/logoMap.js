// Technology & Service Logos Map
// Import all logos
import awsLogo from '@/images/logos/aws.png';
import celeryLogo from '@/images/logos/celery.png';
import djangoLogo from '@/images/logos/django.png';
import dockerLogo from '@/images/logos/docker.png';
import fastApiLogo from '@/images/logos/fastapi.png';
import googleOAuthLogo from '@/images/logos/googleoauth.png';
import gunicornLogo from '@/images/logos/gunicorn.png';
import javascriptLogo from '@/images/logos/javascript.png';
import jwtLogo from '@/images/logos/jwt.png';
import nginxLogo from '@/images/logos/nginx.png';
import plaidLogo from '@/images/logos/plaid.png';
import postgresqlLogo from '@/images/logos/postgresql.png';
import pythonLogo from '@/images/logos/python.png';
import railwayLogo from '@/images/logos/railway.png';
import reactLogo from '@/images/logos/react.png';
import vercelLogo from '@/images/logos/vercel.png';
import websocketsLogo from '@/images/logos/websockets.png';

// TODO: Add these SecureScape logos to @/images/logos/ folder:
// - esp32cam.png
// - arduino.png  
// - edgeimpulse.png
// - computervision.png
// - flutter.png
// - dart.png

// Project & Company Logos
import centiBanner from '@/images/projects/centi_banner.png';


const logoMap = {
    // Technologies - Web/Cloud
    'AWS': awsLogo,
    'Celery': celeryLogo,
    'Django': djangoLogo,
    'Docker': dockerLogo,
    'FastAPI': fastApiLogo,
    'Google OAuth': googleOAuthLogo,
    'Gunicorn': gunicornLogo,
    'JavaScript': javascriptLogo,
    'JWT': jwtLogo,
    'Nginx': nginxLogo,
    'Plaid': plaidLogo,
    'Plaid API': plaidLogo,
    'PostgreSQL': postgresqlLogo,
    'Python': pythonLogo,
    'Railway': railwayLogo,
    'React': reactLogo,
    'Vercel': vercelLogo,
    'WebSockets': websocketsLogo,
    
    // SecureScape Technologies (TODO: Add actual logos)
    'ESP32-CAM': reactLogo, // Placeholder - add esp32cam.png
    'Arduino': reactLogo, // Placeholder - add arduino.png
    'Edge Impulse': reactLogo, // Placeholder - add edgeimpulse.png
    'Computer Vision': reactLogo, // Placeholder - add computervision.png
    'Flutter': reactLogo, // Placeholder - add flutter.png
    'Dart': reactLogo, // Placeholder - add dart.png
};

// Helper function to get logo by name (case-insensitive)
export const getLogo = (name) => {
    if (!name) return null;
    
    // Try exact match first
    if (logoMap[name]) return logoMap[name];
    
    // Try case-insensitive match
    const key = Object.keys(logoMap).find(
        k => k.toLowerCase() === name.toLowerCase()
    );
    
    return key ? logoMap[key] : null;
};

// Export all logos as an array (for backwards compatibility)
export const logoArray = Object.entries(logoMap).map(([name, logo]) => ({
    name,
    logo
}));

export default logoMap;