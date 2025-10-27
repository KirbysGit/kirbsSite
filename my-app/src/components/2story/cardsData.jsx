// Cards data for WhoIAm component
// images (swap these to your actual assets)
import engineeringGuy from '@/images/story/engineeringGuy.jpg';
import ucfCampus from '@/images/story/ucf4.jpg';          // placeholder
import creativeDesk from '@/images/story/mySetUp.jpg';    // placeholder

export const CARDS = [
  // 1) SWE — full-stack + ML
  {
    image: engineeringGuy,
    imageAlt: 'Full-stack software engineer at desk',
    role: 'Software Engineer',
    oneLiner: (
      <>
        Full-stack engineer with a growing focus in <strong>machine learning</strong>—I like
        shipping end-to-end: <strong>frontend UX</strong>, <strong>backend APIs</strong>,
        data plumbing, and lightweight <strong>ML integrations</strong>.
      </>
    ),
    bullets: [
      'Build UI with React + styled-systems; care about polish & performance',
      'Design REST/GraphQL APIs; SQL/noSQL basics; auth & caching patterns',
      'Prototype ML features (classification/embeddings) and wire to product',
    ],
    closer: (
      <>
        I'm happiest owning a slice <em>end-to-end</em>: talk to users, design, build, test, and iterate.
      </>
    ),
  },

  // 2) UCF CompEng Grad — your path into software
  {
    image: ucfCampus,
    imageAlt: 'University of Central Florida—engineering building',
    role: 'UCF Computer Engineering Grad',
    oneLiner: (
      <>
        Started in <strong>Mechanical Engineering</strong>, found momentum in an
        <strong> Intro to Python</strong> course, and switched to <strong>Computer Engineering</strong>
        to blend hardware fundamentals with modern software.
      </>
    ),
    bullets: [
      'Strong STEM base → systems thinking, signals, and problem decomposition',
      'Projects moved from C/embedded to full-stack web and data work',
      'Learned to manage load: classes, projects, work, and the gym',
    ],
    closer: (
      <>
        That path taught me <strong>discipline</strong>, <strong>adaptability</strong>, and how to learn fast—
        the same way I approach new stacks at work.
      </>
    ),
  },

  // 3) Creative — design & making things
  {
    image: creativeDesk,
    imageAlt: 'Creative workspace with sketchbook, guitar, and laptop',
    role: 'Creative Builder',
    oneLiner: (
      <>
        I've always been making things—<strong>drawing</strong>, <strong>doodling</strong>,
        <strong> guitar/piano</strong>, even light <strong>production</strong>. That hands-on creative loop
        shapes how I design software.
      </>
    ),
    bullets: [
      'Translate rough sketches → interactive prototypes quickly',
      'Balance aesthetics with clarity, accessibility, and speed',
      'Treat features like tracks: iterate, mix, and ship the best cut',
    ],
    closer: (
      <>
        I bring a <strong>product mindset</strong>: user empathy, fast iteration, and taste for the final 10% polish.
      </>
    ),
  },
];

export const LONGEST_ROLE_CH = Math.max(...CARDS.map(c => c.role.length));

