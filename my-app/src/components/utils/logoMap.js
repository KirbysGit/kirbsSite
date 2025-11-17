// technology & service logos map

// import all logos
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

// securescape technologies
import esp32Logo from '@/images/logos/esp32.png';
import arduinoLogo from '@/images/logos/arduino.png';
import edgeImpulseLogo from '@/images/logos/edgeimpulse.png';
import flutterLogo from '@/images/logos/flutter.png';
import dartLogo from '@/images/logos/dart.png';

// sentimenttrader technologies (ml/data science)
import pytorchLogo from '@/images/logos/pytorch.png';
import scikitLearnLogo from '@/images/logos/scikitlearn.png';
import xgboostLogo from '@/images/logos/xgboost.png';
import pandasLogo from '@/images/logos/pandas.png';
import numpyLogo from '@/images/logos/numpy.png';

// shelfvision technologies (computer vision)
import opencvLogo from '@/images/logos/opencv.png';
import matplotlibLogo from '@/images/logos/matplotlib.png';

// ucf club manager technologies (mern stack)
import mongodbLogo from '@/images/logos/mongoDB.png';
import expressLogo from '@/images/logos/express.png';
import nodeLogo from '@/images/logos/node.png';
import tailwindLogo from '@/images/logos/tailwind.png';
import herokuLogo from '@/images/logos/heroku.png';
import swaggerLogo from '@/images/logos/swaggerhub.png';
import jestLogo from '@/images/logos/jest.png';

// ocean-life technologies (lamp stack)
import html5Logo from '@/images/logos/html.png';
import css3Logo from '@/images/logos/css.png';
import phpLogo from '@/images/logos/php.png';
import mysqlLogo from '@/images/logos/mysql.png';
import apacheLogo from '@/images/logos/apache.png';
import linuxLogo from '@/images/logos/linux.png';
import bootstrapLogo from '@/images/logos/bootstrap.png';
import postmanLogo from '@/images/logos/postman.png';

// social media logos
import githubLogo from '@/images/logos/github.png';
import linkedinLogo from '@/images/logos/linkedin.png';
import instagramLogo from '@/images/logos/instagram.png';

// design & productivity tools
import gitLogo from '@/images/logos/git.png';
import canvaLogo from '@/images/logos/canva.png';
import figmaLogo from '@/images/logos/figma.png';
import msofficeLogo from '@/images/logos/msoffice.png';


const logoMap = {
    // technologies - web/cloud
    'AWS': awsLogo,
    'AWS EC2': awsLogo,
    'Celery': celeryLogo,
    'Django': djangoLogo,
    'Docker': dockerLogo,
    'FastAPI': fastApiLogo,
    'Google OAuth': googleOAuthLogo,
    'OAuth SSO': googleOAuthLogo,
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
    
    // securescape technologies
    'ESP32-CAM': esp32Logo,
    'Arduino': arduinoLogo,
    'Edge Impulse': edgeImpulseLogo,
    'Flutter': flutterLogo,
    'Dart': dartLogo,
    
    // sentimenttrader technologies (ml/data science)
    'PyTorch': pytorchLogo,
    'scikit-learn': scikitLearnLogo,
    'XGBoost': xgboostLogo,
    'pandas': pandasLogo,
    'NumPy': numpyLogo,
    
    // shelfvision technologies (computer vision)
    'OpenCV': opencvLogo, 
    'Matplotlib': matplotlibLogo,
    
    // ucf club manager technologies (mern stack)
    'MongoDB': mongodbLogo,
    'Express.js': expressLogo,
    'Node.js': nodeLogo,
    'Tailwind CSS': tailwindLogo,
    'Heroku': herokuLogo,
    'SwaggerHub': swaggerLogo,
    'Jest': jestLogo,
    
    // ocean-life technologies (lamp stack)
    'HTML5': html5Logo,
    'CSS3': css3Logo,
    'PHP': phpLogo,
    'MySQL': mysqlLogo,
    'Apache': apacheLogo,
    'Linux': linuxLogo,
    'Bootstrap': bootstrapLogo,
    'Postman': postmanLogo,
    
    // social media
    'GitHub': githubLogo,
    'LinkedIn': linkedinLogo,
    'Instagram': instagramLogo,
    
    // design & productivity tools
    'Git': gitLogo,
    'Canva': canvaLogo,
    'Figma': figmaLogo,
    'MS Office': msofficeLogo

};

// helper function to get logo by name (case-insensitive)
export const getLogo = (name) => {
    if (!name) return null;
    
    // try exact match first
    if (logoMap[name]) return logoMap[name];
    
    // try case-insensitive match
    const key = Object.keys(logoMap).find(
        k => k.toLowerCase() === name.toLowerCase()
    );
    
    return key ? logoMap[key] : null;
};

// export all logos as an array (for backwards compatibility)
export const logoArray = Object.entries(logoMap).map(([name, logo]) => ({
    name,
    logo
}));

export default logoMap;