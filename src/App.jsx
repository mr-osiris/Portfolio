import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

// Inline SVG Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="w-4 h-4">
    <path d="M575.8 255.5c0 18-15 32.1-32.1 32.1h-32.6c-18 0-32.1-15-32.1-32.1v-12.7L290.4 20.3c-14-12.5-34-12.5-48 0L0 242.8V256c0 18-15 32-32 32H0c-18 0-32-14-32-32v-12.7L242.4 20.3c14-12.5 34-12.5 48 0L575.8 242.8V255.5zM224 472c0 22.1 17.9 40 40 40h80c22.1 0 40-17.9 40-40V352h-160V472z"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 172.7L.8 485.6C-2.7 489.5 1.5 496 7.6 496H440.4c6.1 0 10.3-6.5 6.8-10.4L269.7 428.7c-7.9-9.2-20.5-12.1-32.2-6.8l-1.3 .7c-11.7 5.3-24.4 2.4-32.2-6.8z"/>
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="w-4 h-4">
    <path d="M288 0H109.5C85.4 0 64 21.4 64 45.5v421C64 489.6 85.4 512 109.5 512h165C300.6 512 320 490.6 320 466.5V128L288 0zM256 160V32H109.5C92.7 32 80 44.7 80 61.5v389c0 16.7 12.7 29.5 29.5 29.5h165c16.7 0 29.5-12.7 29.5-29.5V160h-32z"/>
  </svg>
);

const CodeBranchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-4 h-4">
    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h32V96c0 17.7 14.3 32 32 32s32-14.3 32-32V64h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zM224 256c-17.7 0-32 14.3-32 32s14.3 32 32 32h32V384c0 17.7 14.3 32 32 32s32-14.3 32-32V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H224zM0 160c0-17.7 14.3-32 32-32H192c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 192c0-17.7 14.3-32 32-32H192c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 160c0-17.7 14.3-32 32-32H608c17.7 0 32 14.3 32 32s-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm0 192c0-17.7 14.3-32 32-32H608c17.7 0 32 14.3 32 32s-14.3 32-32 32H480c-17.7 0-32-14.3-32-32z"/>
  </svg>
);

// Changed StarIcon to a more generic "Repo" or "Code" icon for clarity
const RepoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="w-5 h-5">
    {/* This path represents a simplified repository/code icon */}
    <path d="M528 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM48 448V64h480v384H48zm128-160h-32c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16zm128 0h-32c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16zm128 0h-32c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16z"/>
  </svg>
);

// Updated Social Media Icons with actual brand logos
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-8 h-8">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.278.261 2.148.558 2.913.306.789.717 1.459 1.384 2.126s1.337.935 2.126 1.23c.764.297 1.634.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.278-.06 2.148-.262 2.913-.558.789-.306 1.459-.717 2.126-1.384s.935-1.337 1.23-2.126c.297-.764.499-1.634.558-2.913.06-1.278.072-1.687.072-4.947s-.012-3.667-.072-4.947c-.06-1.278-.262-2.148-.558-2.913-.306-.789-.717-1.459-1.384-2.126S20.665.935 19.876.63c-.764-.297-1.634-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.899s.682.82.899 1.382c.166.422.36 1.057.415 2.227.056 1.265.07 1.647.07 4.85s-.014 3.585-.07 4.85c-.055 1.17-.249 1.805-.415 2.227-.217.562-.477.96-.899 1.382s-.82.682-1.382.899c-.422.166-1.057.36-2.227.415-1.265.056-1.647.07-4.85.07s-3.585-.014-4.85-.07c-1.17-.055-1.805-.249-2.227-.415-.562-.217-.96-.477-1.382-.899s-.682-.82-.899-1.382c-.422-.166-1.057-.36-2.227-.415C2.22 15.665 2.206 15.283 2.206 12s.014-3.585.07-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.899-1.382s.82-.682 1.382-.899c.422-.166 1.057-.36 2.227-.415C8.415 2.175 8.797 2.16 12 2.16zm0 3.635C9.315 5.795 7.16 8.005 7.16 10.742c0 2.737 2.155 4.947 4.84 4.947s4.84-2.21 4.84-4.947c0-2.737-2.155-4.947-4.84-4.947zm0 8.04c-1.764 0-3.203-1.438-3.203-3.203c0-1.765 1.439-3.203 3.203-3.203s3.203 1.438 3.203 3.203c0 1.765-1.439 3.203-3.203 3.203zm5.079-11.232c0 .607-.49.99-.99.99s-.99-.398-.99-.99c0-.607.49-.99.99-.99s.99.393.99.99z"/>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-8 h-8">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-2.01-.23-4.12-1-4.12-4.42 0-.98.35-1.78.93-2.42-.1-.23-.41-1.14.09-2.38 0 0 .76-.24 2.47.92.72-.2 1.48-.3 2.24-.3s1.52.1 2.24.3c1.71-1.16 2.47-.92 2.47-.92.5 1.24.2 2.15.09 2.38.58.64.93 1.43.93 2.42 0 3.44-2.12 4.2-4.14 4.42.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.24 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.326 0-2.224-.897-2.224-2.062 0-1.165.898-2.063 2.224-2.063 1.326 0 2.224.898 2.224 2.063 0 1.165-.898 2.062-2.224 2.062zm1.783 13.019H3.554V9h3.566v11.452z"/>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM224 256c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256zM256 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32v-96c0-17.7-14.3-32-32-32zM128 352c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32v-96c0-17.7-14.3-32-32-32zM384 352c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32v-96c0-17.7-14.3-32-32-32z"/>
  </svg>
);

// Custom animation for the waving hand
const WavingHand = () => {
  const [isWaving, setIsWaving] = useState(false);
  const waveProps = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'rotate(15deg)' });
        await next({ transform: 'rotate(-10deg)' });
        await next({ transform: 'rotate(0deg)' });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Pause for 2 seconds
      }
    },
    config: { tension: 300, friction: 10 },
    loop: true,
    immediate: !isWaving,
  });

  useEffect(() => {
    setIsWaving(true);
  }, []);

  return (
    <animated.span style={waveProps} className="inline-block origin-[70%_70%]">
      👋
    </animated.span>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const portfolioRepoLink = "https://github.com/your-github-username/your-portfolio-repo"; // TODO: Replace with your actual GitHub repo link

  // Function to handle navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-purple-950 text-white font-inter relative overflow-hidden">
      {/* Background Particles/Stars - A simple visual effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-75 animate-pulse"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between bg-black bg-opacity-20 shadow-xl backdrop-blur-sm rounded-b-xl border-b border-purple-800">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="text-3xl font-bold text-purple-400 mr-2 p-2 rounded-full bg-purple-900 bg-opacity-50
                        shadow-lg shadow-purple-500/30
                        transform transition-all duration-300 hover:scale-110 hover:text-white hover:shadow-purple-500/70">
            PB
          </div>
        </div>
        <ul className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8 text-lg">
          <li>
            <NavItem icon={<HomeIcon />} text="Home" onClick={() => navigateTo('home')} isActive={currentPage === 'home'} />
          </li>
          <li>
            <NavItem icon={<UserIcon />} text="About & Skills" onClick={() => navigateTo('about')} isActive={currentPage === 'about'} />
          </li>
          <li>
            <NavItem icon={<CodeBranchIcon />} text="Projects" onClick={() => navigateTo('projects')} isActive={currentPage === 'projects'} />
          </li>
          <li>
            <NavItem icon={<FileIcon />} text="Resume" onClick={() => navigateTo('resume')} isActive={currentPage === 'resume'} />
          </li>
          <li>
            <a href={portfolioRepoLink} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <RepoIcon /> {/* Changed to RepoIcon */}
            </a>
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <main className="relative z-10 p-4 md:p-8 flex-grow">
        {(() => {
          switch (currentPage) {
            case 'home':
              return <HomePage portfolioRepoLink={portfolioRepoLink} />;
            case 'about':
              return <AboutSkillsPage />;
            case 'resume':
              return <ResumePage />;
            case 'projects':
              return <ProjectsPage />;
            default:
              return <HomePage portfolioRepoLink={portfolioRepoLink} />;
          }
        })()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-4 text-center text-gray-400 bg-black bg-opacity-40 backdrop-blur-sm rounded-t-xl mt-8">
        Copyright © 2026 Prathamesh Bhutkar
      </footer>
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ icon, text, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center space-x-2 p-2 rounded-lg transition-all duration-300
      ${isActive ? 'text-purple-300' : 'text-gray-300 hover:text-white'}
      transform hover:scale-105 focus:outline-none focus:ring-0`}
  >
    {icon}
    <span>{text}</span>
    {isActive && (
      <animated.div
        className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 rounded-full"
        style={useSpring({
          from: { width: '0%', opacity: 0 },
          to: { width: '100%', opacity: 1 },
          config: { tension: 200, friction: 20 },
        })}
      />
    )}
  </button>
);

// Home Page Component
const HomePage = ({ portfolioRepoLink }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const introProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const nameProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    delay: 200,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const roleAnimationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    delay: 400,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  // Dynamic text animation for roles
  const roles = ["Software Developer", "Web Developer", "Freelancer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150; // milliseconds per character
  const deletingSpeed = 100;
  const pauseBeforeDelete = 1500;
  const pauseBeforeType = 500;

  useEffect(() => {
    if (!inView) return;

    let timer;
    const handleTyping = () => {
      const currentRole = roles[currentRoleIndex];
      if (isDeleting) {
        setDisplayedRole(prev => prev.substring(0, prev.length - 1));
        if (displayedRole === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        setDisplayedRole(prev => currentRole.substring(0, prev.length + 1));
        if (displayedRole === currentRole) {
          timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : (displayedRole === '' ? pauseBeforeType : typingSpeed));

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, currentRoleIndex, inView]);


  return (
    <animated.section ref={ref} style={introProps} className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center text-center p-4 md:p-8 relative">
      <div className="max-w-4xl mx-auto">
        <animated.h1 style={introProps} className="text-4xl md:text-6xl font-extrabold text-purple-300 mb-4 drop-shadow-lg">
          Hi There! <WavingHand />
        </animated.h1>
        <animated.h2 style={nameProps} className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
          I'M <span className="text-purple-500">PRATHAMESH BHUTKAR</span> {/* Corrected name */}
        </animated.h2>
        <animated.p
          className="text-2xl md:text-4xl text-gray-300 mb-8 font-light min-h-[40px]"
          style={{
            opacity: roleAnimationProps.opacity,
            transform: roleAnimationProps.transform,
          }}
        >
          {displayedRole}
          <span className="inline-block animate-blink">|</span> {/* Typing cursor */}
        </animated.p>
        <div className="mt-12 mb-8">
          <h3 className="text-2xl font-semibold text-purple-300 mb-2">FIND ME ON</h3>
          <p className="text-lg text-gray-400">Feel free to connect with me</p>
        </div>
        <div className="flex justify-center space-x-6">
          <SocialLink icon={<TwitterIcon />} href="https://x.com/mr_osiris_?t=xBImnbeK3f7d6sQ1SAj_UA&s=09" /> 
          <SocialLink icon={<InstagramIcon />} href="https://www.instagram.com/mr._osiris__666_/" /> 
          <SocialLink icon={<GithubIcon />} href="https://github.com/mr-osiris" /> 
          <SocialLink icon={<LinkedInIcon />} href="https://www.linkedin.com/in/prathamesh-bhutkar-13ab78256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" /> 
        </div>
      </div>
    </animated.section>
  );
};

// Social Link Component
const SocialLink = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-purple-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:shadow-lg p-3 rounded-full bg-purple-900 bg-opacity-50"
  >
    {icon}
  </a>
);

// About & Skills Page Component
const AboutSkillsPage = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const aboutProps = useSpring({
    opacity: aboutInView ? 1 : 0,
    transform: aboutInView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const skills = [
    { name: 'Python', icon: 'Py' },
    { name: 'C++', icon: 'C++' },
    { name: 'C', icon: 'C' },
    { name: 'HTML5', icon: 'HTML' },
    { name: 'CSS3', icon: 'CSS' },
    { name: 'JavaScript', icon: 'JS' },
    { name: 'React.js', icon: 'React' },
    { name: 'Tailwind CSS', icon: 'Tailwind' },
    { name: 'PHP', icon: 'PHP' },
    { name: 'Node.js', icon: 'Node' },
    { name: 'MongoDB', icon: 'Mongo' },
    { name: 'MySQL', icon: 'MySQL' },
    { name: 'PostgreSQL', icon: 'PSQL' },
  ];

  const tools = [
    { name: 'VS Code', icon: 'VS' },
    { name: 'Git', icon: 'Git' },
    { name: 'Firebase', icon: 'FB' },
    { name: 'GitHub', icon: 'GH' },
    { name: 'Windows', icon: 'Win' },
    { name: 'Linux', icon: 'Lin' },
    { name: 'Canva', icon: 'Canva' },
  ];

  return (
    <animated.section ref={aboutRef} style={aboutProps} className="p-4 md:p-8 max-w-6xl mx-auto text-gray-200">
      <h2 className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-8 text-center drop-shadow-lg">
        LET ME INTRODUCE MYSELF
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-12 mb-12">
        <div className="md:w-2/3 text-lg leading-relaxed mb-8 md:mb-0">
          <p className="mb-4">
            Hello! I'm Prathamesh Bhutkar, a final-year B.Tech Computer Engineering student with strong skills in system design, algorithms, and software development.My journey into programming began with a curiosity that quickly blossomed into a love for crafting elegant solutions and bringing ideas to life through code.
          </p>
          <p className="mb-4">
           I enjoy working with web technologies like HTML, CSS, JavaScript, PHP, and MySQL, aiming to create user-friendly and dynamic applications. I'm always up for a challenge and love learning new things in the tech world.
          </p>
          <p className="mb-4">
          When I'm not coding, you can find me enjoying photography, playing games, or traveling. I also had a great time contributing to open-source and even won 1st prize at Hacktoberfest 2024, plus I was the 2nd Runner-up at a college-level Web Development Hackathon.
          </p>
        </div>
        <div className="md:w-1/3 flex justify-center items-center">
          {/* Placeholder for an illustration or avatar */}
          <div className="w-48 h-48 md:w-64 md:h-64 bg-purple-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-purple-600">
            <span className="text-6xl text-white">👨‍💻</span>
          </div>
        </div>
      </div>

      <h3 className="text-3xl md:text-4xl font-extrabold text-purple-400 mb-8 text-center drop-shadow-lg">
        Professional Skillset
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {skills.map((skill, index) => (
          <SkillCard key={index} name={skill.name} icon={skill.icon} index={index} />
        ))}
      </div>

      <h3 className="text-3xl md:text-4xl font-extrabold text-purple-400 mb-8 text-center drop-shadow-lg">
        Tools I Use
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <SkillCard key={index} name={tool.name} icon={tool.icon} index={index} />
        ))}
      </div>
    </animated.section>
  );
};

// Skill Card Component with 3D effect and Neon Shadow
const SkillCard = ({ name, icon, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'scale(1) rotateY(0deg)' : 'scale(0.8) rotateY(90deg)',
    // Tuned for smoother animation
    config: { mass: 1, tension: 200, friction: 25 }, // Adjusted tension and friction
    delay: index * 75, // Slightly faster staggered delay
  });

  // Merge springProps with custom boxShadow style
  const mergedStyle = {
    ...springProps,
    boxShadow: '0 0 15px rgba(192, 132, 252, 0.3), 0 0 30px rgba(192, 132, 252, 0.2) inset', // Initial subtle glow
  };

  return (
    <animated.div
      ref={ref}
      style={mergedStyle} // Apply the merged style object
      className="relative flex flex-col items-center justify-center p-6 bg-purple-800 bg-opacity-40 rounded-xl shadow-xl border border-purple-700
                 transform transition-all duration-300 hover:scale-105 cursor-pointer
                 group perspective-1000"
    >
      <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-purple-900 bg-opacity-70 mb-4 shadow-inner-lg transform transition-transform duration-300 group-hover:rotate-y-180">
        <span className="text-5xl font-bold text-purple-300">
          {icon}
        </span>
      </div>
      <p className="text-xl font-semibold text-white text-center">{name}</p>
      {/* Neon Shadow on hover */}
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ boxShadow: '0 0 25px rgba(192, 132, 252, 0.8), 0 0 40px rgba(192, 132, 252, 0.6)' }}></div>
    </animated.div>
  );
};

// Resume Page Component
const ResumePage = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const handleDownload = () => {
    // Replace with the actual path to your resume file
    const resumeUrl = '/my-resume.pdf'; // TODO: Update with your resume file path
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.setAttribute('download', 'Prathamesh_Bhutkar_Resume.pdf'); // Corrected name in download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <animated.section ref={ref} style={props} className="p-4 md:p-8 max-w-4xl mx-auto text-gray-200 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-8 drop-shadow-lg">
        My Resume
      </h2>
      <p className="text-lg mb-8">
        Here you can find a detailed overview of my professional experience, education, and skills.
      </p>
      <button
        onClick={handleDownload}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg
                   transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-75
                   flex items-center justify-center mx-auto space-x-3"
      >
        <DownloadIcon />
        <span>Download Resume</span>
      </button>

      {/* Placeholder for Resume Image/PDF Viewer */}
      <div className="mt-12 p-6 bg-purple-900 bg-opacity-50 rounded-xl shadow-inner-lg border border-purple-700 text-left">
        <h3 className="text-2xl font-semibold text-purple-300 mb-4 text-center">Resume Preview</h3>
        <img
          src="/my-resume.png"
          alt="Resume Preview"
          className="w-full h-auto rounded-lg mb-6 border border-purple-600 shadow-md"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x800/6A0DAD/FFFFFF?text=Could+not+load+resume+image"; }}
        />
        <p className="text-center text-gray-400 text-sm">
          {/* TODO: Replace the `src` above with a screenshot of your resume (e.g., place it in your `public` folder and link as `/your-resume-screenshot.png`). */}
          {/* For a live PDF viewer, you would need a more complex solution (e.g., using `react-pdf` library and a PDF file). */}
        </p>

        <h3 className="text-2xl font-semibold text-purple-300 mb-4 mt-8">Summary</h3>
        <p className="mb-6">
          Highly motivated Software Developer with a strong foundation in system design, algorithms, and software development, cultivated throughout a B.Tech in Computer Engineering. Passionate about building scalable solutions using Python and C++ , with practical experience in MERN/web development through self-initiated projects and internships. Eager to contribute to innovative teams and grow as a software developer.
        </p>

        <h3 className="text-2xl font-semibold text-purple-300 mb-4">Experience</h3>
        <div className="mb-6">
          <h4 className="text-xl font-medium text-white">Photography Team Lead - SDW Cell Internship - [PCCoE, Pune]</h4>
          <p className="text-gray-400">Aug, 2024 – Apr, 2025</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Managed event photography for all college activities.</li>
            <li>Coordinated with design and media teams for content delivery.</li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-purple-300 mb-4">Education</h3>
        <div className="mb-6">
          <h4 className="text-xl font-medium text-white">[B.Tech, Computer Science & Engineering ] - [Pimpri Chinchwad College of Engineering(SPPU)]</h4>
          <p className="text-gray-400">Year of Graduation-2026</p>
          <p className="text-gray-400">Relevant coursework: Data Structures and Algorithms, Web Technology, DBMS, Opreating system, Computer Vision, Cloud Computing, Software Engineering, Software Testing.</p>
        </div>

        <h3 className="text-2xl font-semibold text-purple-300 mb-4">Certifications</h3>
        <ul className="list-disc list-inside ml-4">
          <li>[AI Foundation Bootcamp - FutureSkills PRIME (MeitY & NASSCOM) ]</li>
        </ul>
      </div>
    </animated.section>
  );
};

// Projects Page Component
const ProjectsPage = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const projects = [
    {
      title: "TODO-PRO",
      description: "A feature-rich todo application built with vanilla HTML, CSS, and JavaScript.",
      githubLink: "https://github.com/mr-osiris/TODO-PRO", 
      image: "https://placehold.co/400x250/8A2BE2/FFFFFF?text=TODO-PRO",
    },
    {
      title: "Credit Card Fraud Detection",
      description: "This project is focused on building an efficient fraud detection system using real-world anonymized credit card transaction data. The aim is to identify fraudulent transactions from legitimate ones using advanced machine learning models while handling extreme class imbalance.",
      githubLink: "https://github.com/mr-osiris/credit-card-fraud-detection", 
      image: "https://placehold.co/400x250/4B0082/FFFFFF?text=CCFD",
    },
    {
      title: "Personal Blog",
      description: "A minimalist blog platform where I share my thoughts on technology and development, built with a headless CMS.",
      githubLink: "https://github.com/your-github/personal-blog", // TODO: Replace with your actual GitHub repo link
      image: "https://placehold.co/400x250/9932CC/FFFFFF?text=Blog",
    },
    {
      title: "GitMap",
      description: "GitMap is a modern web application designed to explore GitHub user and organization profiles with key insights and data visualizations. Built with a contemporary tech stack, it provides a clean and functional interface for understanding GitHub activity.",
      githubLink: "https://github.com/mr-osiris/gitmap-app", // TODO: Replace with your actual GitHub repo link
      image: "https://placehold.co/400x250/BA55D3/FFFFFF?text=GitMap",
    },
    {
      title: "Lost-and-Found-Tracker",
      description: "The Lost & Found Tracker is a comprehensive full-stack web application designed to foster community connection by simplifying the process of reporting and recovering lost or found items. It provides a secure, centralized platform that streamlines item listings, enables efficient searching, and facilitates direct, confidential communication between users, ultimately aiming for successful item reunions.",
      githubLink: "https://github.com/mr-osiris/Lost-and-Found-Tracker",
      image: "https://placehold.co/400x250/BA55D3/FFFFFF?text=LAFT",
    },
  ];

  return (
    <animated.section ref={ref} style={props} className="p-4 md:p-8 max-w-6xl mx-auto text-gray-200">
      <h2 className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-8 text-center drop-shadow-lg">
        My Projects
      </h2>
      <p className="text-lg text-center mb-12">
        Here are some of the projects I've worked on, showcasing my skills and passion for development.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </animated.section>
  );
};

// Project Card Component with Neon Shadow
const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
    // Tuned for smoother animation
    config: { mass: 1, tension: 200, friction: 25 }, // Adjusted tension and friction
    delay: index * 75, // Slightly faster staggered delay
  });

  // Merge springProps with custom boxShadow style
  const mergedStyle = {
    ...springProps,
    boxShadow: '0 0 15px rgba(192, 132, 252, 0.3), 0 0 30px rgba(192, 132, 252, 0.2) inset', // Initial subtle glow
  };

  return (
    <animated.div
      ref={ref}
      style={mergedStyle} // Apply the merged style object
      className="relative flex flex-col items-center justify-center p-6 bg-purple-900 bg-opacity-40 rounded-xl shadow-xl border border-purple-700
                 transform transition-all duration-300 hover:scale-105 cursor-pointer
                 group perspective-1000"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover rounded-lg mb-4 border border-purple-600"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/8A2BE2/FFFFFF?text=Project+Image"; }}
      />
      <h3 className="text-2xl font-semibold text-purple-300 mb-3">{project.title}</h3>
      <p className="text-gray-300 text-base flex-grow mb-4">{project.description}</p>
      <a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full
                   transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
      >
        <GithubIcon />
        View on GitHub
      </a>
      {/* Neon Shadow on hover */}
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ boxShadow: '0 0 25px rgba(192, 132, 252, 0.8), 0 0 40px rgba(192, 132, 252, 0.6)' }}></div>
    </animated.div>
  );
};

export default App;
