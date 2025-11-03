// cardsData.jsx

// card1.
import engineeringGuy from '@/images/2story/engineeringGuy.jpg';
import mySetUp from '@/images/2story/mySetUp.jpg';
import coding from '@/images/2story/coding.jpg';

// card2.
import sdGroup from '@/images/2story/sdGroup.jpg';
import secondHome from '@/images/2story/secondHome.jpg';
import gradDog from '@/images/2story/gradDog.jpg';

// card3.
import naturalAthlete from '@/images/2story/naturalAthlete.jpg';
import legos from '@/images/2story/legos.jpg';
import lilG from '@/images/2story/lilG.jpg';

export const CARDS = [
  // 1) SWE - full-stack + ML
  {
    images: [mySetUp, engineeringGuy, coding],
    imageBubbles: [
      // bubbles for top-left image (mySetUp)
      ['Where the magic happens ✨', 'Peep the VS Code already open 💻'],
      // bubbles for middle-right image (engineeringGuy)
      ['Big Engineering Guy 💻 #2EZ', '#ItWasActuallyWayTooHard'],
      // bubbles for bottom-left image (coding)
      ['DS&A was brutal 💀', 'Always Debugging 🔧'],
    ],
    role: 'Software Engineer',
    bubbles: [
      'This is where the magic happens ✨',
      'Building cool stuff, one line at a time 💻',
    ],
    oneLiner: (
      <>
        Full-stack engineer with a growing focus in <strong>machine learning</strong>. I love
        shipping end-to-end. The 0 → 1 process is my favorite: taking an idea, designing it,
        building it, and watching it come to life. 
        Whether it's crafting front-end experiences, designing APIs, or automating daily workflows,
        I'm driven by curiosity and the feeling of momentum when something new finally <strong>clicks</strong>.
      </>
    ),
    sectionTitle: "What I'm Up To Right Now...",
    bullets: [
      'Polishing this portfolio to reflect my work and story 😅',
      'Keeping my skills sharp with daily LeetCode and algorithm practices 🧠',
      'Building personal projects to explore new tools and push my ideas into real apps 🚀',
      'Experimenting with ML integrations and data-driven features for future products 🤖',
    ],
    closer: (
      <>
        I’m looking for a <strong>growth-minded team</strong> where I can contribute from day one,
        keep learning, and help ship high-impact features that make a difference.
      </>
    ),
  },
  

  // 2) UCF CompEng Grad - my path into software
  {
    images: [secondHome, sdGroup, gradDog],
    imageBubbles: [
      // bubbles for top-left image (secondHome)
      ['My second home 😍', 'Too many long nights here 😴'],
      // bubbles for middle-right image (sdGroup)
      ['The Senior Design Group 👨‍💻', 'Business Casual 🤵'],
      // bubbles for bottom-left image (gradDog)
      ['Graduation Day! 🎓', 'Celebrating with my lil bro 🐕'],
    ],
    role: 'UCF Computer Engineering Grad',
    bubbles: [
      'My college years at UCF 🎓',
      'Learned a lot about building things from scratch 🛠️',
    ],
    oneLiner: (
      <>
        Started out in <strong>Mechanical Engineering</strong>, but hated Statics, found some enjoyment in an 
        <strong> Intro to Python</strong> course, and switched to <strong>Computer Engineering </strong>
        to blend hardware fundamentals with modern software. College pushed my limits but taught
        me how to pick up things quick, stay consistent, and enjoy the process.
      </>
    ),
    sectionTitle: "What My Education Looked Like...",
    bullets: [
      'Struggled through the weed out classes, no failed classes though! Eventually found I really loved the working on SW / ML projects',
      'Learned by doing, starting with early C and embedded work turned into full-stack web apps, data pipelines, and ML projects by senior year',
      'Balancing school, projects, part-time jobs, and the gym taught me structure, consistency, and how to keep improving even when it’s hectic',
    ],
    closer: (
      <>
         That journey wired me for <strong>high-pressure creativity</strong>. I found I work best when I’m learning fast,
         balancing a lot at once, and building something completely new.
      </>
    ),
  },

  // 3) Professional Beginner - curious typa guy
  {
    images: [naturalAthlete, lilG, legos],
    imageBubbles: [
      // bubbles for top-left image (naturalAthlete)
      ['Natural athlete 💯', 'Yes... That was a home run ⚾'],
      // bubbles for middle-right image (lilG)
      ['Unrelated but heres my dog 🐕', 'His name is Guinness 🍺'],
      // bubbles for bottom-left image (legos)
      ['Always building something new 🧱', '#LegosToEngineeringPipeline'],
    ],
    role: 'Professional Beginner',
    bubbles: [
      'Always learning something new 🎸',
      "Whether it's coding, guitar, or skateboarding 📈",
    ],
    oneLiner: (
      <>
        I've always loved learning new things, whether through just doing, reading, or just
        hearing about how things work. Lately it's been <strong>skateboarding</strong> and
        <strong> golf</strong>, but over the past few years I've gotten hooked on
        <strong> guitar</strong> and <strong> piano</strong>. 
        There's something addictive about starting from zero, putting in the reps, and watching
        yourself get better.
      </>
    ),
    sectionTitle: "How Curiosity Shapes My Work...",
    bullets: [
      'Treating learning like training → deliberate, iterative, and fun',
      'Diving into new frameworks just to see what they do differently',
      'Applying lessons from hobbies like rhythm, flow, or repetition, into how I code and design',
      'Embrace the “beginner mindset” as a way to stay adaptable and creative',
    ],
    closer: (
      <>
        Whether it’s a hobby or a new stack, I thrive on <strong>the process of improvement</strong>.
        Curiosity keeps me building, breaking, and experimenting every day, it’s the through-line
        between all the things I love doing.
      </>
    ),
  },  
];

// longest role character count (for spacing of role text).
export const LONGEST_ROLE_CH = Math.max(...CARDS.map(c => c.role.length));

