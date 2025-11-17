// experienceCards.js

// tech and service experience cards for experience carousel.

export const EXPERIENCE_CARDS = [
  {
    id: 'bitgo',
    type: 'tech',
    name: 'BitGo',
    dateRange: 'May 2024 - June 2025',
    jobTitle: 'Software Engineering Intern',
    description:
      	"Built an automation portal to make BitGo's IT team's life easier, turning manual work into one-click operations.",
    themeColorRgb: '13, 173, 220',
    skills: {
		frontend: ['React', 'JavaScript', 'WebSockets'],
		backend: ['Python', 'Django', 'Celery', 'PostgreSQL'],
		devops: ['Docker', 'Nginx', 'Gunicorn'],
		cloud: ['AWS EC2', 'OAuth SSO']
    },
    achievements: [
      	'Automated 20+ IT workflows with OAuth SSO and role-based access',
      	'Saved ~150 staff hours annually with real-time monitoring dashboards',
      	'Cut script debugging time from hours to minutes with real-time WebSocket dashboards'
    ]
  },
  {
    id: 'barlouie',
    type: 'service',
    name: 'Bar Louie',
    dateRange: 'Oct 2022 - Present',
    theme: 'barlouie',
    themeColorRgb: '203, 192, 196',
    jobTitle: 'Server',
    description:
      	'Progressed from barback to server in a high-volume environment, consistently delivering exceptional service while managing $1250+ in sales per shift.',
    achievements: [
      	'Adapting to high-pressure situations and thriving under stress',
      	'Effective communication with guests, kitchen, and bar teams',
      	'Working seamlessly in fast-paced collaborative environments'
    ],
    techConnectionTitle: 'How This Maps To Software',
    techConnectionText:
      	"Code reviews are stressful, but no sort of stress can ever top someone who's hungry and asking where their food is."
  },
  {
    id: 'hawkers',
    type: 'service',
    name: 'Hawkers',
    dateRange: 'May 2022 - Aug 2022',
    theme: 'hawkers',
    themeColorRgb: '245, 148, 40',
    jobTitle: 'Host / HTO',
    description:
      	"Managed guest relations and takeout operations that contributed to ~35% of the store's total sales.",
    achievements: [
      	'Attention to detail in every order for consistent quality',
      	'Clear communication with customers, kitchen, and delivery teams',
      	'Direct impact on business revenue - managing ~35% of store sales'
    ],
    techConnectionTitle: 'Service → Tech Connection',
    techConnectionText:
      	"Production deploys feel tense, but they are nothing compared to telling a family their reservation still is not ready."
  }
];


