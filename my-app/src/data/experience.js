export default [
  {
    heading: "Software Engineering Intern",
    company: "BitGo",
    location: "Palo Alto, California, USA",
    address: "2443 Ash Street, Palo Alto, California, United States",
    locationCoords: [37.426443, -122.144116],
    summary: "Built a secure full-stack system using Django, React, and AWS for script management.",
    logoUrl: "src/images/bitgoSmall.jpg",
    duration: {
      start: "2024-05-14",
      end: "Present"
    },
    type: "Full-Time",
    color: "#6C63FF",
    logo: "bitgo",
    theme: {
      primary: "rgb(13, 173, 220)",                 // rgb(13, 173, 220)
      background: "rgb(44, 49, 81)",              // rgb(44, 49, 81)
      text: "rgb(254, 254, 254)",                    // rgb(254, 254, 254)
      accent: "rgb(122, 122, 134)",       // border color
      soft: "rgb(132, 159, 241)",         // light blue accent
      mutedBackground: "rgb(48, 55, 90)", // alternative sectioning
      highlight: "rgb(18, 223, 245)",    // flashy blue glow for animations
      card: "rgb(17, 21, 75)"
    },
    responsibilities: [
      {
        title: "Full-Stack Development",
        description: "Built a periodic script management system using Django and React, integrating Google OAuth for secure user authentication and managing real-time updates with WebSockets.",
        impact: "Secure Authentication System"
      },
      {
        title: "Backend Optimization",
        description: "Utilized Celery for asynchronous task processing, ensuring efficient execution of background tasks.",
        impact: "Improved System Performance"
      },
      {
        title: "Database & Security Implementation",
        description: "Configured PostgreSQL as the backend database, optimized static file handling with WhiteNoise to enhance performance and efficiency, and implemented SSL to secure all connections.",
        impact: "Enhanced Security & Performance"
      },
      {
        title: "DevOps & Deployment",
        description: "Deployed the application on AWS EC2, utilizing Docker for containerization, Gunicorn as the application server, and Nginx as the reverse proxy, configuring each component to ensure efficient handling of user requests.",
        impact: "Robust Production Environment"
      }
    ],
    skills: {
      technical: [
        "Python",
        "Django",
        "React",
        "PostgreSQL",
        "Docker",
        "Celery",
        "AWS EC2",
        "Gunicorn",
        "Nginx",
        "Git",
        "WebSockets",
        "Google OAuth",
        "SSL Implementation"
      ],
      soft: [
        "Problem Solving",
        "Technical Documentation",
        "System Architecture",
        "Performance Optimization",
        "Security Implementation"
      ]
    }
  },
  {
    heading: "Server",
    company: "Bar Louie",
    location: "Orlando, FL",
    address: "4100 N Alafaya Trl Suite 167 & 173, Orlando, FL 32826",
    locationCoords: [28.598249, -81.208343],
    summary: "Progressed from barback to server, managing high-volume service and consistently achieving $2500 in sales per shift.",
    logoUrl: "src/images/blSmall.png",
    duration: {
      start: "2022-10-26",
      end: "Present"
    },
    type: "Full-Time",
    color: "#FF6B6B",
    logo: "barlouie",
    theme: {
      primary: "rgb(134, 33, 49)",                  // rgb(134, 33, 49)
      background: "rgb(0, 0, 0)",               // rgb(0, 0, 0)
      text: "rgb(254, 255, 255)",                     // rgb(254, 255, 255)
      accent: "rgb(203, 192, 196)",                   // border/pill
      soft: "rgb(175, 96, 108)",           // soft rose red (primary-tint)
      mutedBackground: "rgb(30, 20, 20)",  // warm black base
      highlight: "rgb(232, 70, 90)",        // glow pop
      card: "rgb(151, 45, 45)"
    },
    responsibilities: [
      {
        title: "Barback Role",
        description: "Assisted bartenders by maintaining bar cleanliness, restocking liquors, kegs, glasses, and ingredients for signature beverages.",
        impact: "Ensured smooth bar operations"
      },
      {
        title: "Server Role",
        description: "Handled high-stress situations during peak hours, consistently achieving $2500 in sales while delivering exceptional dining experiences to hundreds of guests per shift.",
        impact: "Excellence in Customer Service"
      }
    ],
    skills: {
      technical: [
        "Inventory Management",
        "POS Systems",
        "Cash Handling"
      ],
      soft: [
        "Customer Service",
        "Time Management",
        "Stress Management",
        "Team Collaboration",
        "Communication"
      ]
    }
  },
  {
    heading: "Host / HTO",
    company: "Hawkers Asian Street Fare",
    location: "Windermere, FL",
    address: "9100 Conroy Windermere Rd Suite 110, Windermere, FL 34786",
    locationCoords: [28.493264, -81.508917],
    summary: "Managed guest relations and takeout operations contributing to 40% of store's total sales.",
    logoUrl: "src/images/hawkersSmall.png",
    duration: {
      start: "2022-05-12",
      end: "2022-08-19"
    },
    type: "Part-Time",
    color: "#4ECDC4",
    logo: "hawkers",
    theme: {
      primary: "rgb(253, 86, 5)",                   // rgb(253, 86, 5)
      background: "rgb(40, 118, 97)",                // rgb(40, 118, 97)
      text: "rgb(222, 212, 193)",                      // rgb(222, 212, 193)
      accent: "rgb(245, 148, 40)",                    // bold orange
      soft: "rgb(255, 163, 97)",            // light warm orange
      mutedBackground: "rgb(38, 96, 82)",   // softer green
      highlight: "rgb(255, 107, 58)",        // highlight/glow
      card: "rgb(96, 202, 167)"
    },
    responsibilities: [
      {
        title: "Host Role",
        description: "Greeted guests and managed seating arrangements. Effectively handled reservation requests and waitlist in a high-volume environment with waits exceeding 4 hours.",
        impact: "Efficient Guest Management"
      },
      {
        title: "HTO (Take Out) Role",
        description: "Managed all takeout orders, comprising 40% of store's total sales. Prepared and packaged orders while maintaining food presentation. Handled cash, credit card, and digital payment transactions.",
        impact: "Revenue Generation"
      }
    ],
    skills: {
      technical: [
        "Reservation Systems",
        "Payment Processing",
        "Order Management"
      ],
      soft: [
        "Customer Service",
        "Organization",
        "Attention to Detail",
        "Problem Solving",
        "Multitasking"
      ]
    }
  }
];