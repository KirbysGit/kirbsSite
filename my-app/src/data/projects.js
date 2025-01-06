export default [
  {
    heading: "UCF Club & Event Manager",
    shortDescription: "Full-stack web and mobile application",
    thumbnail: "/images/ucf-club.png",
    stack: {
      frontend: ["React.js", "Flutter", "Material-UI", "TailwindCSS"],
      backend: ["Node.js", "Express", "MongoDB"],
      deployment: ["AWS", "Docker", "CI/CD"]
    },
    links: {
      github: "https://github.com/yourusername/ucf-club-manager",
      demo: "https://ucf-club-manager.demo.com",
    },
    timeline: "Jan 2024 - Present",
    role: "Technical Lead",
    keyFeatures: [
      {
        title: "User Authentication",
        description: "Implemented JWT-based auth with role-based access control",
        tech: ["JWT", "OAuth 2.0"]
      },
      {
        title: "Real-time Updates",
        description: "Live event updates and notifications using WebSocket",
        tech: ["Socket.io", "Redis"]
      },
      {
        title: "Cross-platform Support",
        description: "Unified experience across web and mobile platforms",
        tech: ["Flutter", "React Native"]
      }
    ],
    challenges: [
      {
        problem: "Scale and Performance",
        solution: "Implemented caching and database optimization",
        impact: "Reduced load times by 60%"
      }
    ],
    metrics: [
      "500+ active users",
      "30+ clubs onboarded",
      "99.9% uptime"
    ]
  },
  {
    heading: "Personal Contact Manager",
    shortDescription: "Modern contact management system",
    thumbnail: "/images/contact-manager.png",
    stack: {
      frontend: ["PHP", "Bootstrap", "jQuery"],
      backend: ["MySQL", "Apache"],
      testing: ["PHPUnit", "Postman"]
    },
    links: {
      github: "https://github.com/yourusername/contact-manager",
      demo: "https://contact-manager.demo.com"
    },
    timeline: "Sep 2023 - Dec 2023",
    role: "Lead Developer",
    keyFeatures: [
      {
        title: "Contact Organization",
        description: "Smart categorization and tagging system",
        tech: ["MySQL", "PHP"]
      },
      {
        title: "Search & Filter",
        description: "Advanced search with multiple filter options",
        tech: ["AJAX", "jQuery"]
      }
    ],
    challenges: [
      {
        problem: "Data Security",
        solution: "Implemented encryption and secure authentication",
        impact: "Zero security incidents"
      }
    ],
    metrics: [
      "1000+ contacts managed",
      "50ms average query time",
      "98% test coverage"
    ]
  },
  {
    heading: "Sonic Range Finder",
    shortDescription: "High-precision embedded measurement system",
    thumbnail: "/images/rangefinder.png",
    stack: {
      hardware: ["MSP430G2553", "Eagle CAD", "Ultrasonic Sensors"],
      firmware: ["C", "Assembly"],
      tools: ["Logic Analyzer", "Oscilloscope"]
    },
    timeline: "Jun 2023 - Aug 2023",
    role: "Hardware Engineer",
    keyFeatures: [
      {
        title: "Precision Measurement",
        description: "Sub-millimeter accuracy up to 5 meters",
        tech: ["Ultrasonic", "Signal Processing"]
      },
      {
        title: "Power Management",
        description: "Dual voltage regulation system",
        tech: ["Linear Regulators", "Power Design"]
      }
    ],
    technical: {
      pcbSpecs: {
        layers: 2,
        size: "50x75mm",
        components: "Through-hole and SMD"
      },
      performance: {
        accuracy: "±0.5mm",
        range: "5m",
        updateRate: "20Hz"
      }
    },
    challenges: [
      {
        problem: "Signal Noise",
        solution: "Implemented digital filtering algorithm",
        impact: "Improved accuracy by 300%"
      }
    ]
  }
];