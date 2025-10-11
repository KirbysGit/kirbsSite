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
import javaLogo from '@/images/logos/java.png';
import cPlusPlusLogo from '@/images/logos/c++.png';
import vercelLogo from '@/images/logos/vercel.png';
import websocketsLogo from '@/images/logos/websockets.png';

// SecureScape Technologies
import esp32Logo from '@/images/logos/esp32.png';
import arduinoLogo from '@/images/logos/arduino.png';
import edgeImpulseLogo from '@/images/logos/edgeimpulse.png';
import flutterLogo from '@/images/logos/flutter.png';
import dartLogo from '@/images/logos/dart.png';

// SentimentTrader Technologies (ML/Data Science)
import pytorchLogo from '@/images/logos/pytorch.png';
import scikitLearnLogo from '@/images/logos/scikitlearn.png';
import xgboostLogo from '@/images/logos/xgboost.png';
import pandasLogo from '@/images/logos/pandas.png';
import numpyLogo from '@/images/logos/numpy.png';

// ShelfVision Technologies (Computer Vision)
import opencvLogo from '@/images/logos/opencv.png';
import matplotlibLogo from '@/images/logos/matplotlib.png';

// UCF Club Manager Technologies (MERN Stack)
import mongodbLogo from '@/images/logos/mongoDB.png';
import expressLogo from '@/images/logos/express.png';
import nodeLogo from '@/images/logos/node.png';
import tailwindLogo from '@/images/logos/tailwind.png';
import herokuLogo from '@/images/logos/heroku.png';
import swaggerLogo from '@/images/logos/swaggerhub.png';
import jestLogo from '@/images/logos/jest.png';

// Ocean-Life Technologies (LAMP Stack)
import html5Logo from '@/images/logos/html.png';
import css3Logo from '@/images/logos/css.png';
import phpLogo from '@/images/logos/php.png';
import mysqlLogo from '@/images/logos/mysql.png';
import apacheLogo from '@/images/logos/apache.png';
import linuxLogo from '@/images/logos/linux.png';
import bootstrapLogo from '@/images/logos/bootstrap.png';
import postmanLogo from '@/images/logos/postman.png';

// Social Media Logos
import githubLogo from '@/images/logos/github.png';
import linkedinLogo from '@/images/logos/linkedin.png';
import instagramLogo from '@/images/logos/instagram.png';


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
    'Java': javaLogo,
    'C++': cPlusPlusLogo,
    
    // SecureScape Technologies
    'ESP32-CAM': esp32Logo,
    'Arduino': arduinoLogo,
    'Edge Impulse': edgeImpulseLogo,
    'Flutter': flutterLogo,
    'Dart': dartLogo,
    
    // SentimentTrader Technologies (ML/Data Science)
    'PyTorch': pytorchLogo,
    'scikit-learn': scikitLearnLogo,
    'XGBoost': xgboostLogo,
    'pandas': pandasLogo,
    'NumPy': numpyLogo,
    
    // ShelfVision Technologies (Computer Vision)
    'OpenCV': opencvLogo, 
    'Matplotlib': matplotlibLogo,
    
    // UCF Club Manager Technologies (MERN Stack)
    'MongoDB': mongodbLogo,
    'Express.js': expressLogo,
    'Node.js': nodeLogo,
    'Tailwind CSS': tailwindLogo,
    'Heroku': herokuLogo,
    'SwaggerHub': swaggerLogo,
    'Jest': jestLogo,
    
    // Ocean-Life Technologies (LAMP Stack)
    'HTML5': html5Logo,
    'CSS3': css3Logo,
    'PHP': phpLogo,
    'MySQL': mysqlLogo,
    'Apache': apacheLogo,
    'Linux': linuxLogo,
    'Bootstrap': bootstrapLogo,
    'Postman': postmanLogo,
    
    // Social Media
    'GitHub': githubLogo,
    'LinkedIn': linkedinLogo,
    'Instagram': instagramLogo

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