// import { useState, useEffect } from 'react';
// import portfolioData from '../data/Profile.json';

// const Portfolio = () => {
//   const [darkMode, setDarkMode] = useState(portfolioData.ui.darkMode);
//   const [activeSection, setActiveSection] = useState('home');
//   const [transitionDirection, setTransitionDirection] = useState('');
//   const [isAnimating, setIsAnimating] = useState(false);

//   const sections = Object.keys(portfolioData.sections).map(key => ({
//     id: key,
//     name: portfolioData.sections[key].title
//   }));

//   const handleNavClick = (sectionId) => {
//     if (isAnimating || sectionId === activeSection) return;

//     const currentIndex = sections.findIndex(s => s.id === activeSection);
//     const newIndex = sections.findIndex(s => s.id === sectionId);

//     setTransitionDirection(newIndex > currentIndex ? 'slide-left' : 'slide-right');
//     setIsAnimating(true);
//     setActiveSection(sectionId);

//     setTimeout(() => {
//       setIsAnimating(false);
//       setTransitionDirection('');
//     }, portfolioData.ui.transition.duration);
//   };

//   const renderSectionContent = () => {
//     const section = portfolioData.sections[activeSection];

//     switch (activeSection) {
//       case 'home':
//         return (
//           <div className="h-full flex flex-col justify-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">
//               {section.content.greeting}
//             </h1>
//             <h2 className="text-xl md:text-2xl mb-6">{section.content.tagline}</h2>
//             <p className="text-lg mb-8 max-w-2xl">{section.content.intro}</p>
//             <div className="flex flex-wrap gap-4">
//               {section.content.cta.map((button, index) => (
//                 <a
//                   key={index}
//                   href={button.link}
//                   className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
//                 >
//                   {button.text}
//                 </a>
//               ))}
//             </div>
//           </div>
//         );

//       case 'about':
//         return (
//           <div className="space-y-6">
//             <p className="text-lg">{section.content.who}</p>
//             <p className="text-lg">{section.content.focus}</p>
//             <p className="text-lg">{section.content.approach}</p>
//           </div>
//         );

//       case 'experience':
//         return (
//           <div className="space-y-6">
//             {section.content.map((exp, index) => (
//               <div
//                 key={index}
//                 className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold">{exp.role} – {exp.company}</h3>
//                     <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.duration}</p>
//                     <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.location}</p>
//                   </div>
//                 </div>
//                 <ul className="list-disc pl-5 space-y-2">
//                   {exp.contributions.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         );

//       case 'skills':
//         return (
//           <div className="grid md:grid-cols-3 gap-6">
//             {Object.entries(section.content).map(([category, skills]) => (
//               <div
//                 key={category}
//                 className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
//               >
//                 <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {skills.map((skill, index) => (
//                     <span
//                       key={index}
//                       className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       case 'education':
//         return (
//           <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
//             <h3 className="text-xl font-bold">{section.content.degree}</h3>
//             <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               {section.content.university}
//             </p>
//             <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               {section.content.year}
//             </p>
//           </div>
//         );

//       case 'certifications':
//         return (
//           <div className="space-y-4">
//             {section.content.map((cert, index) => (
//               <div
//                 key={index}
//                 className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
//               >
//                 <h3 className="text-xl font-bold">{cert.name}</h3>
//                 <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{cert.platform}</p>
//               </div>
//             ))}
//           </div>
//         );

//       case 'contact':
//         return (
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Contact Information</h3>
//               <ul className="space-y-3">
//                 <li className="flex items-center">
//                   <span className="mr-3">📧</span>
//                   <a href={`mailto:${section.content.email}`} className="hover:underline">
//                     {section.content.email}
//                   </a>
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-3">🔗</span>
//                   <a href={section.content.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
//                     LinkedIn
//                   </a>
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-3">🐙</span>
//                   <a href={section.content.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
//                     GitHub
//                   </a>
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-3">📍</span>
//                   {section.content.location}
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
//               <form className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block mb-1">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block mb-1">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block mb-1">Message</label>
//                   <textarea
//                     id="message"
//                     rows="4"
//                     className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className={`px-6 py-2 rounded-lg font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`min-h-screen flex transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
//       {/* Vertical Navbar */}
//       <div className={`w-64 min-h-screen p-6 flex flex-col fixed ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-10`}>
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold">{portfolioData.meta.name}</h1>
//           <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{portfolioData.meta.title}</p>
//         </div>

//         <nav className="flex-1">
//           <ul className="space-y-2">
//             {sections.map((section) => (
//               <li key={section.id}>
//                 <button
//                   onClick={() => handleNavClick(section.id)}
//                   className={`w-full text-left p-3 rounded-lg transition-all ${
//                     activeSection === section.id
//                       ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
//                       : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200')
//                   }`}
//                 >
//                   {section.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="mt-auto pt-4 border-t border-gray-600">
//           <div className="flex space-x-4 mb-4">
//             {portfolioData.meta.socials.map((social, index) => (
//               <a
//                 key={index}
//                 href={social.link}
//                 className={`p-2 rounded-full transition-all hover:scale-110 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {social.icon === 'linkedin' ? '🔗' : '🐙'}
//               </a>
//             ))}
//           </div>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
//           >
//             {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
//           </button>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 ml-64 p-8 relative overflow-hidden">
//         <div
//           className={`h-full transition-transform duration-${portfolioData.ui.transition.duration} ${portfolioData.ui.transition.easing} ${
//             transitionDirection === 'slide-left' ? 'translate-x-full' :
//             transitionDirection === 'slide-right' ? '-translate-x-full' : 'translate-x-0'
//           }`}
//         >
//           <div className={`h-full transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
//             <h2 className="text-3xl font-bold mb-8">{portfolioData.sections[activeSection].title}</h2>
//             {renderSectionContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;

// import { useState, useEffect } from 'react';
// import { FiMenu, FiX, FiSun, FiMoon, FiLinkedin, FiGithub, FiMail, FiMapPin } from 'react-icons/fi';
// import portfolioData from '../data/Profile.json';
// import gsap from 'gsap';

// const Portfolio = () => {
//   const [darkMode, setDarkMode] = useState(portfolioData.ui.darkMode);
//   const [activeSection, setActiveSection] = useState('home');
//   const [transitionDirection, setTransitionDirection] = useState('');
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const sections = Object.keys(portfolioData.sections).map(key => ({
//     id: key,
//     name: portfolioData.sections[key].title
//   }));

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setMobileMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleNavClick = (sectionId) => {
//     if (isAnimating || sectionId === activeSection) return;

//     const currentIndex = sections.findIndex(s => s.id === activeSection);
//     const newIndex = sections.findIndex(s => s.id === sectionId);

//     setTransitionDirection(newIndex > currentIndex ? 'slide-left' : 'slide-right');
//     setIsAnimating(true);
//     setActiveSection(sectionId);
//     setMobileMenuOpen(false);

//     setTimeout(() => {
//       setIsAnimating(false);
//       setTransitionDirection('');
//     }, portfolioData.ui.transition.duration);
//   };

//   const renderSectionContent = () => {
//     const section = portfolioData.sections[activeSection];

//     switch (activeSection) {
//       case 'home':
//         return (
//           <div className="h-full flex flex-col justify-center">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//               {section.content.greeting}
//             </h1>
//             <h2 className="text-lg sm:text-xl md:text-2xl mb-6">{section.content.tagline}</h2>
//             <p className="text-base sm:text-lg mb-8 max-w-2xl">{section.content.intro}</p>
//             <div className="flex flex-wrap gap-4">
//               {section.content.cta.map((button, index) => (
//                 <a
//                   key={index}
//                   href={button.link}
//                   className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-all hover:scale-105 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
//                 >
//                   {button.text}
//                 </a>
//               ))}
//             </div>
//           </div>
//         );

//       case 'about':
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             <p className="text-base sm:text-lg">{section.content.who}</p>
//             <p className="text-base sm:text-lg">{section.content.focus}</p>
//             <p className="text-base sm:text-lg">{section.content.approach}</p>
//           </div>
//         );

//       case 'experience':
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             {section.content.map((exp, index) => (
//               <div
//                 key={index}
//                 className={`p-4 sm:p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
//               >
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
//                   <div>
//                     <h3 className="text-lg sm:text-xl font-bold">{exp.role} – {exp.company}</h3>
//                     <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.duration}</p>
//                     <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.location}</p>
//                   </div>
//                 </div>
//                 <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
//                   {exp.contributions.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         );

//       case 'skills':
//         return (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {Object.entries(section.content).map(([category, skills]) => (
//               <div
//                 key={category}
//                 className={`p-4 sm:p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
//               >
//                 <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 capitalize">{category}</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {skills.map((skill, index) => (
//                     <span
//                       key={index}
//                       className={`px-2 py-1 text-xs sm:text-sm rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       case 'education':
//         return (
//           <div className={`p-4 sm:p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
//             <h3 className="text-lg sm:text-xl font-bold">{section.content.degree}</h3>
//             <p className={`mt-2 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               {section.content.university}
//             </p>
//             <p className={`mt-1 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               {section.content.year}
//             </p>
//           </div>
//         );

//       case 'certifications':
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             {section.content.map((cert, index) => (
//               <div
//                 key={index}
//                 className={`p-4 sm:p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
//               >
//                 <h3 className="text-lg sm:text-xl font-bold">{cert.name}</h3>
//                 <p className={`mt-2 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{cert.platform}</p>
//               </div>
//             ))}
//           </div>
//         );

//       case 'contact':
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
//             <div>
//               <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contact Information</h3>
//               <ul className="space-y-2 sm:space-y-3">
//                 <li className="flex items-center">
//                   <FiMail className="mr-2 sm:mr-3" />
//                   <a href={`mailto:${section.content.email}`} className="hover:underline text-sm sm:text-base">
//                     {section.content.email}
//                   </a>
//                 </li>
//                 <li className="flex items-center">
//                   <FiLinkedin className="mr-2 sm:mr-3" />
//                   <a href={section.content.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-sm sm:text-base">
//                     LinkedIn
//                   </a>
//                 </li>
//                 <li className="flex items-center">
//                   <FiGithub className="mr-2 sm:mr-3" />
//                   <a href={section.content.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-sm sm:text-base">
//                     GitHub
//                   </a>
//                 </li>
//                 <li className="flex items-center">
//                   <FiMapPin className="mr-2 sm:mr-3" />
//                   <span className="text-sm sm:text-base">{section.content.location}</span>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Send Me a Message</h3>
//               <form className="space-y-3 sm:space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block mb-1 text-sm sm:text-base">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     className={`w-full p-2 rounded border text-sm sm:text-base ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block mb-1 text-sm sm:text-base">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     className={`w-full p-2 rounded border text-sm sm:text-base ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block mb-1 text-sm sm:text-base">Message</label>
//                   <textarea
//                     id="message"
//                     rows="4"
//                     className={`w-full p-2 rounded border text-sm sm:text-base ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium text-sm sm:text-base ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
//       {/* Mobile Header */}
//       <header className={`md:hidden flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md z-20`}>
//         <h1 className="text-xl font-bold">{portfolioData.meta.name}</h1>
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
//           >
//             {darkMode ? <FiSun /> : <FiMoon />}
//           </button>
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
//           >
//             {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>
//       </header>

//       {/* Vertical Navbar - Desktop */}
//       <div className={`hidden md:flex md:w-64 min-h-screen p-6 flex-col fixed ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-10`}>
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold">{portfolioData.meta.name}</h1>
//           <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{portfolioData.meta.title}</p>
//         </div>

//         <nav className="flex-1">
//           <ul className="space-y-2">
//             {sections.map((section) => (
//               <li key={section.id}>
//                 <button
//                   onClick={() => handleNavClick(section.id)}
//                   className={`w-full text-left p-3 rounded-lg transition-all ${
//                     activeSection === section.id
//                       ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
//                       : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200')
//                   }`}
//                 >
//                   {section.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="mt-auto pt-4 border-t border-gray-600">
//           <div className="flex space-x-4 mb-4">
//             {portfolioData.meta.socials.map((social, index) => (
//               <a
//                 key={index}
//                 href={social.link}
//                 className={`p-2 rounded-full transition-all hover:scale-110 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {social.icon === 'linkedin' ? <FiLinkedin /> : <FiGithub />}
//               </a>
//             ))}
//           </div>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`w-full p-2 rounded-lg flex items-center justify-center space-x-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
//           >
//             {darkMode ? <><FiSun /> <span>Light Mode</span></> : <><FiMoon /> <span>Dark Mode</span></>}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className={`md:hidden fixed inset-0 z-10 ${darkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
//           <div className="flex flex-col h-full p-4 pt-16">
//             <nav className="flex-1">
//               <ul className="space-y-2">
//                 {sections.map((section) => (
//                   <li key={section.id}>
//                     <button
//                       onClick={() => handleNavClick(section.id)}
//                       className={`w-full text-left p-3 rounded-lg transition-all ${
//                         activeSection === section.id
//                           ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
//                           : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200')
//                       }`}
//                     >
//                       {section.name}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//             <div className="flex justify-center space-x-4 mt-4">
//               {portfolioData.meta.socials.map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.link}
//                   className={`p-3 rounded-full transition-all hover:scale-110 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {social.icon === 'linkedin' ? <FiLinkedin size={20} /> : <FiGithub size={20} />}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content Area */}
//       <div className={`flex-1 ${isMobile ? 'mt-16' : 'md:ml-64'} p-4 sm:p-6 md:p-8 relative overflow-hidden transition-all duration-300`}>
//         <div
//           className={`h-full transition-transform duration-${portfolioData.ui.transition.duration} ${portfolioData.ui.transition.easing} ${
//             transitionDirection === 'slide-left' ? 'translate-x-full' :
//             transitionDirection === 'slide-right' ? '-translate-x-full' : 'translate-x-0'
//           }`}
//         >
//           <div className={`h-full transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
//             <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">{portfolioData.sections[activeSection].title}</h2>
//             {renderSectionContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;

// import { useState, useEffect, useRef } from "react";
// import {
//   FiMenu,
//   FiX,
//   FiSun,
//   FiMoon,
//   FiLinkedin,
//   FiGithub,
//   FiMail,
//   FiMapPin,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import portfolioData from "../data/Profile.json";

// // Register GSAP plugins
// gsap.registerPlugin();

// const Portfolio = () => {
//   const [darkMode, setDarkMode] = useState(portfolioData.ui.darkMode);
//   const [activeSection, setActiveSection] = useState("home");
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const contentRef = useRef(null);
//   const sections = Object.keys(portfolioData.sections).map((key) => ({
//     id: key,
//     name: portfolioData.sections[key].title,
//   }));

//   // Handle resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) setMobileMenuOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // GSAP slide animation
//   const handleNavClick = (sectionId) => {
//     if (isAnimating || sectionId === activeSection) return;

//     const currentIndex = sections.findIndex((s) => s.id === activeSection);
//     const newIndex = sections.findIndex((s) => s.id === sectionId);
//     const direction = newIndex > currentIndex ? 1 : -1;

//     setIsAnimating(true);

//     const tl = gsap.timeline({
//       onComplete: () => setIsAnimating(false),
//     });

//     tl.to(contentRef.current, {
//       x: direction * 100,
//       opacity: 0,
//       duration: 0.4,
//       ease: "power2.inOut",
//     })
//       .set(contentRef.current, { x: direction * -100 })
//       .call(() => setActiveSection(sectionId))
//       .to(contentRef.current, {
//         x: 0,
//         opacity: 1,
//         duration: 0.4,
//         ease: "power2.inOut",
//       });
//   };

//   // Render section content with Framer Motion
//   const renderSectionContent = () => {
//     const section = portfolioData.sections[activeSection];

//     switch (activeSection) {
//       case "home":
//         return (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="  flex flex-col justify-center items-center"
//             style={{
//               height: "90%",
//             }}
//           >
//             <div className="home_body">
//               <motion.h1
//                 initial={{ y: -20 }}
//                 animate={{ y: 0 }}
//                 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
//               >
//                 {section.content.greeting}
//               </motion.h1>

//               <motion.h2
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1, transition: { delay: 0.2 } }}
//                 className="text-xl md:text-2xl mb-6"
//               >
//                 {section.content.tagline}
//               </motion.h2>

//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1, transition: { delay: 0.3 } }}
//                 className="text-lg mb-8 max-w-2xl"
//               >
//                 {section.content.intro}
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1, transition: { delay: 0.4 } }}
//                 className="flex flex-wrap gap-4"
//               >
//                 {section.content.cta.map((button, index) => (
//                   <motion.a
//                     key={index}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     href={button.link}
//                     className={`px-6 py-3 rounded-lg font-medium ${
//                       darkMode ? "bg-blue-600" : "bg-blue-500"
//                     } text-white`}
//                   >
//                     {button.text}
//                   </motion.a>
//                 ))}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleNavClick("contact")}
//                   className={`px-6 py-3 rounded-lg font-medium ${
//                     darkMode ? "bg-gray-700" : "bg-gray-200"
//                   }`}
//                 >
//                   Contact Me
//                 </motion.button>
//               </motion.div>
//             </div>
//           </motion.div>
//         );

//       case "about":
//         return (
//           // <div className="space-y-6">
//           //   <p className="text-lg">{section.content.who}</p>
//           //   <p className="text-lg">{section.content.focus}</p>
//           //   <p className="text-lg">{section.content.approach}</p>
//           // </div>
//       <section
//   id="about"
//   className="py-16 px-6 md:px-12 max-w-5xl mx-auto text-gray-800 dark:text-gray-200"
// >
//   {/* Title */}
//   <h2 className="text-4xl font-bold mb-6 border-b-4 border-blue-500 dark:border-blue-400 inline-block">
//     {section.content.title}
//   </h2>

//   {/* Bio */}
//   <p className="text-lg mb-6 leading-relaxed">
//     {section.content.bio}
//   </p>

//   {/* Paragraphs */}
//   <div className="space-y-4 mb-8">
//     {section.content.paragraphs.map((para, index) => (
//       <p
//         key={index}
//         className="text-base text-gray-700 dark:text-gray-300 leading-relaxed"
//       >
//         {para}
//       </p>
//     ))}
//   </div>

//   {/* Technologies */}
//   <div className="mt-10">
//     <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
//       Technologies I work with:
//     </h3>
//     <ul className="flex flex-wrap gap-3">
//       {section.content.technologies.map((tech, index) => (
//         <li
//           key={index}
//           className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-1 rounded-full text-sm font-medium"
//         >
//           {tech}
//         </li>
//       ))}
//     </ul>
//   </div>
// </section>

//         );

//       case "experience":
//         return (
//           <div className="space-y-6">
//             {section.content.map((exp, index) => (
//               <div
//                 key={index}
//                 className={`p-6 rounded-lg ${
//                   darkMode ? "bg-gray-800" : "bg-white"
//                 } shadow-md`}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold">
//                       {exp.role} – {exp.company}
//                     </h3>
//                     <p
//                       className={`${
//                         darkMode ? "text-gray-300" : "text-gray-600"
//                       }`}
//                     >
//                       {exp.duration}
//                     </p>
//                     <p
//                       className={`${
//                         darkMode ? "text-gray-300" : "text-gray-600"
//                       }`}
//                     >
//                       {exp.location}
//                     </p>
//                   </div>
//                 </div>
//                 <ul className="list-disc pl-5 space-y-2">
//                   {exp.contributions.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         );

//       // Replace your current skills section with this
// case 'skills':
//   return (
//     <div className="space-y-8">
//       {Object.entries(section.content).map(([category, skills]) => (
//         <div key={category} className={`p-6 rounded-lg ${
//           darkMode ? 'bg-gray-800' : 'bg-white'
//         } shadow-md`}>
//           <h3 className="text-xl font-bold mb-6 capitalize">{category}</h3>
//           <div className="space-y-4">
//             {skills.map((skill, index) => (
//               <motion.div
//                 key={skill}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="flex items-center justify-between"
//               >
//                 <span className="font-medium">{skill}</span>
//                 <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: `${70 + (index * 5)}%` }}
//                     transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
//                     className={`h-full ${
//                       darkMode ? 'bg-blue-500' : 'bg-blue-600'
//                     }`}
//                   />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
//       case "education":
//         return (
//           <div
//             className={`p-6 rounded-lg ${
//               darkMode ? "bg-gray-800" : "bg-white"
//             } shadow-md`}
//           >
//             <h3 className="text-xl font-bold">{section.content.degree}</h3>
//             <p
//               className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//             >
//               {section.content.university}
//             </p>
//             <p
//               className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//             >
//               {section.content.year}
//             </p>
//           </div>
//         );

//       case "certifications":
//         return (
//           <div className="space-y-4">
//             {section.content.map((cert, index) => (
//               <div
//                 key={index}
//                 className={`p-6 rounded-lg ${
//                   darkMode ? "bg-gray-800" : "bg-white"
//                 } shadow-md`}
//               >
//                 <h3 className="text-xl font-bold">{cert.name}</h3>
//                 <p
//                   className={`mt-2 ${
//                     darkMode ? "text-gray-300" : "text-gray-600"
//                   }`}
//                 >
//                   {cert.platform}
//                 </p>
//               </div>
//             ))}
//           </div>
//         );

//       case "contact":
//         return (
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Contact Information</h3>
//               <ul className="space-y-3">
//                 <li className="flex items-center">
//                   <span className="mr-3">📧</span>
//                   <a
//                     href={`mailto:${section.content.email}`}
//                     className="hover:underline"
//                   >
//                     {section.content.email}
//                   </a>
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-3">🔗</span>
//                   <a
//                     href={section.content.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:underline"
//                   >
//                     LinkedIn
//                   </a>
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-3">🐙</span>
//                   <a
//                     href={section.content.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:underline"
//                   >
//                     GitHub
//                   </a>
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-3">📍</span>
//                   {section.content.location}
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
//               <form className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className={`w-full p-2 rounded border ${
//                       darkMode
//                         ? "bg-gray-700 border-gray-600"
//                         : "bg-white border-gray-300"
//                     }`}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className={`w-full p-2 rounded border ${
//                       darkMode
//                         ? "bg-gray-700 border-gray-600"
//                         : "bg-white border-gray-300"
//                     }`}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block mb-1">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows="4"
//                     className={`w-full p-2 rounded border ${
//                       darkMode
//                         ? "bg-gray-700 border-gray-600"
//                         : "bg-white border-gray-300"
//                     }`}
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className={`px-6 py-2 rounded-lg font-medium ${
//                     darkMode
//                       ? "bg-blue-600 hover:bg-blue-700"
//                       : "bg-blue-500 hover:bg-blue-600"
//                   } text-white transition-colors`}
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen flex flex-col md:flex-row ${
//         darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       {/* Mobile Header */}
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className={`md:hidden flex justify-between items-center p-4 ${
//           darkMode ? "bg-gray-800" : "bg-white"
//         } shadow-md z-20`}
//       >
//         <h1 className="text-xl font-bold">{portfolioData.meta.name}</h1>
//         <div className="flex items-center space-x-4">
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setDarkMode(!darkMode)}
//             className={`p-2 rounded-full ${
//               darkMode
//                 ? "bg-gray-700 text-yellow-300"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             {darkMode ? <FiSun /> : <FiMoon />}
//           </motion.button>
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className={`p-2 rounded-full ${
//               darkMode ? "bg-gray-700" : "bg-gray-200"
//             }`}
//           >
//             {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </motion.button>
//         </div>
//       </motion.header>

//       {/* Desktop Sidebar */}
//       <motion.div
//         initial={{ x: -300 }}
//         animate={{ x: 0 }}
//         className={`hidden md:flex md:w-64 min-h-screen p-6 flex-col fixed ${
//           darkMode ? "bg-gray-800" : "bg-white"
//         } shadow-lg z-10`}
//       >
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold">{portfolioData.meta.name}</h1>
//           <p
//             className={`text-sm ${
//               darkMode ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             {portfolioData.meta.title}
//           </p>
//         </div>

//         <nav className="flex-1">
//           <ul className="space-y-2">
//             {sections.map((section) => (
//               <li key={section.id}>
//                 <motion.button
//                   whileHover={{ x: 5 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleNavClick(section.id)}
//                   className={`w-full text-left p-3 rounded-lg transition-all ${
//                     activeSection === section.id
//                       ? darkMode
//                         ? "bg-blue-600 text-white"
//                         : "bg-blue-500 text-white"
//                       : darkMode
//                       ? "hover:bg-gray-700"
//                       : "hover:bg-gray-200"
//                   }`}
//                 >
//                   {section.name}
//                 </motion.button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="mt-auto pt-4 border-t border-gray-600">
//           <div className="flex space-x-4 mb-4">
//             {portfolioData.meta.socials.map((social, index) => (
//               <motion.a
//                 key={index}
//                 whileHover={{ y: -3 }}
//                 whileTap={{ scale: 0.9 }}
//                 href={social.link}
//                 className={`p-2 rounded-full ${
//                   darkMode ? "bg-gray-700" : "bg-gray-200"
//                 }`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {social.icon === "linkedin" ? <FiLinkedin /> : <FiGithub />}
//               </motion.a>
//             ))}
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setDarkMode(!darkMode)}
//             className={`w-full p-2 rounded-lg flex items-center justify-center space-x-2 ${
//               darkMode ? "bg-gray-700" : "bg-gray-200"
//             }`}
//           >
//             {darkMode ? (
//               <>
//                 <FiSun /> <span>Light Mode</span>
//               </>
//             ) : (
//               <>
//                 <FiMoon /> <span>Dark Mode</span>
//               </>
//             )}
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className={`md:hidden fixed inset-0 z-10 ${
//             darkMode ? "bg-gray-900 bg-opacity-90" : "bg-white bg-opacity-90"
//           }`}
//         >
//           <div className="flex flex-col h-full p-4 pt-16">
//             <nav className="flex-1">
//               <ul className="space-y-2">
//                 {sections.map((section) => (
//                   <li key={section.id}>
//                     <motion.button
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => handleNavClick(section.id)}
//                       className={`w-full text-left p-3 rounded-lg ${
//                         activeSection === section.id
//                           ? darkMode
//                             ? "bg-blue-600 text-white"
//                             : "bg-blue-500 text-white"
//                           : darkMode
//                           ? "hover:bg-gray-700"
//                           : "hover:bg-gray-200"
//                       }`}
//                     >
//                       {section.name}
//                     </motion.button>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//             <div className="flex justify-center space-x-4 mt-4">
//               {portfolioData.meta.socials.map((social, index) => (
//                 <motion.a
//                   key={index}
//                   whileHover={{ y: -3 }}
//                   whileTap={{ scale: 0.9 }}
//                   href={social.link}
//                   className={`p-3 rounded-full ${
//                     darkMode ? "bg-gray-700" : "bg-gray-200"
//                   }`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {social.icon === "linkedin" ? (
//                     <FiLinkedin size={20} />
//                   ) : (
//                     <FiGithub size={20} />
//                   )}
//                 </motion.a>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Main Content */}
//       <div
//         ref={contentRef}
//         className={`flex-1 ${isMobile ? "mt-16" : "md:ml-64"} p-6 md:p-8`}
//       >
//         <motion.h2
//           key={activeSection} // Force re-animation on section change
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl font-bold mb-6 md:mb-8"
//         >
//           {/* {portfolioData.sections[activeSection].title} */}
//         </motion.h2>
//         {renderSectionContent()}
//       </div>
//     </div>
//   );
// };

// export default Portfolio;


import { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiLinkedin,
  FiGithub,
  FiMail,
  FiMapPin,
  FiPhone,
  FiDownload,
  FiExternalLink,
  FiCode,
  FiAward,
  FiBook,
  FiBriefcase,
  FiStar,
  FiCheck
} from "react-icons/fi";
import { motion } from "framer-motion";
import gsap from "gsap";
import portfolioData from "../data/Profile.json";

// Register GSAP plugins
gsap.registerPlugin();

// Typewriter Hook
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, speed);
    
    return () => clearInterval(typing);
  }, [text, speed]);
  
  return displayText;
};

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(portfolioData.ui.darkMode);
  const [activeSection, setActiveSection] = useState("home");
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const contentRef = useRef(null);
  const sections = Object.keys(portfolioData.sections).map((key) => ({
    id: key,
    name: portfolioData.sections[key].title,
  }));

  // Get the current section content for typewriter
  const currentSection = portfolioData.sections[activeSection];
  const typedIntro = useTypewriter(
    activeSection === "home" ? currentSection.content.intro : "", 
    30
  );

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP slide animation
  const handleNavClick = (sectionId) => {
    if (isAnimating || sectionId === activeSection) return;

    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    const newIndex = sections.findIndex((s) => s.id === sectionId);
    const direction = newIndex > currentIndex ? 1 : -1;

    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tl.to(contentRef.current, {
      x: direction * 100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    })
      .set(contentRef.current, { x: direction * -100 })
      .call(() => setActiveSection(sectionId))
      .to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
  };

  // Floating contact button
  const FloatingContactButton = () => (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-10 ${
        darkMode ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gradient-to-r from-blue-500 to-purple-500"
      } text-white`}
      onClick={() => handleNavClick('contact')}
    >
      <FiMail size={24} />
    </motion.button>
  );

  // Technology icons mapping
  const techIcons = {
    "HTML5": "🔶", "CSS3": "🎨", "JavaScript": "🟨", "TypeScript": "🔷", 
    "React": "⚛️", "Next.js": "▲", "Tailwind CSS": "💨", "Bootstrap": "🅱️",
    "Node.js": "🟢", "Express": "🚂", "REST APIs": "🔗", "Git": "📚",
    "MongoDB": "🍃", "Postman": "📬", "VS Code": "💻", "Material-UI": "🧩",
    "Responsive Design": "📱", "Performance Optimization": "⚡", 
    "Debugging": "🐛", "Agile Methodology": "🔄", "Code Review": "👁️", 
    "Testing": "🧪"
  };

  // Render section content with Framer Motion
  const renderSectionContent = () => {
    const section = portfolioData.sections[activeSection];

    switch (activeSection) {
      case "home":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col justify-center items-center min-h-[80vh]"
          >
            <div className="text-center max-w-6xl">
              {/* Main Greeting with different font sizes */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                  {section.content.greeting.split(' ')[0]}
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-700 dark:text-gray-300">
                  {section.content.greeting.split(' ').slice(1).join(' ')}
                </h2>
              </motion.div>

              {/* Tagline */}
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                className="text-2xl md:text-3xl mb-8 text-gray-600 dark:text-gray-400 font-light"
              >
                {section.content.tagline}
              </motion.h3>

              {/* Typing Intro */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.8 } }}
                className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed min-h-[120px]"
              >
                {typedIntro}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 1.2 } }}
                className="grid grid-cols-3 gap-8 mb-12"
              >
                {section.content.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.5 } }}
                className="flex flex-wrap gap-6 justify-center"
              >
                {section.content.cta.map((button, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={button.link}
                    className={`px-8 py-4 rounded-xl font-semibold flex items-center gap-3 text-lg ${
                      index === 0 
                        ? darkMode 
                          ? "bg-blue-600 hover:bg-blue-700 shadow-lg" 
                          : "bg-blue-500 hover:bg-blue-600 shadow-lg"
                        : darkMode 
                          ? "bg-transparent hover:bg-gray-800 border-2 border-gray-600"
                          : "bg-transparent hover:bg-gray-100 border-2 border-gray-300"
                    } text-white transition-all duration-300`}
                  >
                    {button.text}
                    {index === 0 && <FiDownload className="animate-bounce" />}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        );

      case "about":
        return (
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {section.content.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {section.content.bio}
              </p>
            </motion.div>

            {/* Enhanced Highlights Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {section.content.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`p-8 rounded-3xl text-center group relative overflow-hidden ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-2xl border border-gray-200 dark:border-gray-700`}
                >
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {highlight.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Content Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              className={`p-8 rounded-3xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-xl mb-12`}
            >
              <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                My Development Philosophy
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      darkMode ? "bg-green-900/30" : "bg-green-100"
                    }`}>
                      <FiCheck className="text-green-600" size={20} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Clean, Maintainable Code</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      darkMode ? "bg-blue-900/30" : "bg-blue-100"
                    }`}>
                      <FiStar className="text-blue-600" size={20} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">User-Centric Design</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      darkMode ? "bg-purple-900/30" : "bg-purple-100"
                    }`}>
                      <FiCode className="text-purple-600" size={20} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Performance Optimization</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      darkMode ? "bg-yellow-900/30" : "bg-yellow-100"
                    }`}>
                      <FiAward className="text-yellow-600" size={20} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Best Practices</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Technologies */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              className="text-center"
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
                Technologies I Work With
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {section.content.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.05 } }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-6 py-3 rounded-full font-semibold text-lg ${
                      darkMode 
                        ? "bg-gradient-to-r from-blue-900 to-purple-900 text-blue-200" 
                        : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800"
                    } shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case "experience":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {section.content.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-8 rounded-2xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-xl border-l-4 border-blue-500`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {exp.role}
                      </h3>
                      <h4 className="text-xl font-semibold mt-1">{exp.company}</h4>
                      <div className={`mt-2 space-y-1 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                        <p>📅 {exp.duration}</p>
                        <p>📍 {exp.location}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.contributions.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: i * 0.1 + 0.3 } }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(section.content).map(([category, skills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: categoryIndex * 0.2 } }}
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-3xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-2xl border border-gray-200 dark:border-gray-700 group hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300`}
                >
                  <h3 className="text-2xl font-bold mb-8 text-blue-600 dark:text-blue-400 capitalize flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${
                      darkMode ? "bg-blue-900/30" : "bg-blue-100"
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <FiCode size={24} />
                    </div>
                    {category}
                  </h3>
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 + categoryIndex * 0.1 } }}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between group/skill"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{techIcons[skill] || "💡"}</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 transition-colors">
                            {skill}
                          </span>
                        </div>
                        <div className="w-16 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${75 + (index * 3)}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                            className={`h-full ${
                              darkMode ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-600 to-purple-600"
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "education":
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {section.content.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.2 } }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-8 rounded-3xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-2xl border-l-4 ${
                    index === 0 ? 'border-blue-500' : 
                    index === 1 ? 'border-green-500' : 'border-purple-500'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-4 rounded-2xl ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}>
                          <FiBook size={32} className={
                            index === 0 ? 'text-blue-500' : 
                            index === 1 ? 'text-green-500' : 'text-purple-500'
                          } />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {edu.degree}
                          </h3>
                          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {edu.university}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-sm font-semibold px-4 py-2 rounded-full ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      } mb-2`}>
                        {edu.year}
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {edu.grade}
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className={`mt-6 p-4 rounded-2xl ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-100"
                  }`}>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {index === 0 ? "Bachelor's Degree in Computer Science with focus on software engineering and web technologies." :
                       index === 1 ? "Higher secondary education with focus on science and mathematics." :
                       "Secondary school education with excellent academic performance."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        return (
          <div className="max-w-4xl mx-auto">
            {section.content.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-3xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-2xl border-2 border-yellow-500/30 mb-8`}
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Certification Header */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-2xl ${
                        darkMode ? "bg-yellow-900/30" : "bg-yellow-100"
                      }`}>
                        <FiAward size={32} className="text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                          {cert.name}
                        </h3>
                        <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {cert.platform}
                        </p>
                        <p className="text-blue-500 font-semibold mt-2">{cert.year}</p>
                      </div>
                    </div>

                    {/* Skills Learned */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                        Skills Acquired:
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {cert.skills.map((skill, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <FiCheck className="text-green-500" />
                            <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certification Highlights */}
                  <div className={`p-6 rounded-2xl ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-100"
                  } lg:w-80`}>
                    <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                      Certification Highlights
                    </h4>
                    <ul className="space-y-3">
                      {cert.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-blue-500 mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      // ... (projects and contact sections remain the same)
      case "projects":
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.content.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                  whileHover={{ y: -5 }}
                  className={`rounded-2xl overflow-hidden ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg border border-gray-200 dark:border-gray-700`}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className="text-white text-center">
                        <FiBriefcase size={48} className="mx-auto mb-2 opacity-80" />
                        <span className="text-sm font-medium">Project Preview</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs ${
                            darkMode ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github}
                        className={`flex-1 py-2 rounded-lg text-center ${
                          darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                        } flex items-center justify-center gap-2`}
                      >
                        <FiGithub /> Code
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.live}
                        className={`flex-1 py-2 rounded-lg text-center ${
                          darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                        } text-white flex items-center justify-center gap-2`}
                      >
                        <FiExternalLink /> Live
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-8 rounded-2xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  I'm always open to discussing new opportunities, creative projects, or just having a chat about technology.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      darkMode ? "bg-blue-900" : "bg-blue-100"
                    }`}>
                      <FiMail className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href={`mailto:${section.content.email}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        {section.content.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      darkMode ? "bg-blue-900" : "bg-blue-100"
                    }`}>
                      <FiPhone className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <span className="text-gray-600 dark:text-gray-300">{section.content.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      darkMode ? "bg-blue-900" : "bg-blue-100"
                    }`}>
                      <FiMapPin className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <span className="text-gray-600 dark:text-gray-300">{section.content.location}</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-8">
                  {portfolioData.meta.socials.map((social, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={social.link}
                      className={`p-3 rounded-full ${
                        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                      } transition-colors`}
                    >
                      {social.icon === "linkedin" ? <FiLinkedin /> : <FiGithub />}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-8 rounded-2xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <h3 className="text-2xl font-bold mb-6">Send Message</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full p-4 rounded-xl border-2 ${
                        darkMode 
                          ? "bg-gray-700 border-gray-600 focus:border-blue-500" 
                          : "bg-white border-gray-300 focus:border-blue-500"
                      } transition-colors outline-none`}
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full p-4 rounded-xl border-2 ${
                        darkMode 
                          ? "bg-gray-700 border-gray-600 focus:border-blue-500" 
                          : "bg-white border-gray-300 focus:border-blue-500"
                      } transition-colors outline-none`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                    <textarea
                      id="message"
                      rows="5"
                      className={`w-full p-4 rounded-xl border-2 ${
                        darkMode 
                          ? "bg-gray-700 border-gray-600 focus:border-blue-500" 
                          : "bg-white border-gray-300 focus:border-blue-500"
                      } transition-colors outline-none resize-none`}
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`w-full py-4 rounded-xl font-semibold ${
                      darkMode 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    } text-white transition-all shadow-lg`}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`md:hidden flex justify-between items-center p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md z-20`}
      >
        <h1 className="text-xl font-bold">{portfolioData.meta.name}</h1>
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`hidden md:flex md:w-64 min-h-screen p-6 flex-col fixed ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg z-10`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{portfolioData.meta.name}</h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {portfolioData.meta.title}
          </p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? darkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : darkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {section.name}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-600">
          <div className="flex space-x-4 mb-4">
            {portfolioData.meta.socials.map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                href={social.link}
                className={`p-2 rounded-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon === "linkedin" ? <FiLinkedin /> : <FiGithub />}
              </motion.a>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full p-3 rounded-lg flex items-center justify-center space-x-2 ${
              darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"
            } font-medium transition-all`}
          >
            {darkMode ? (
              <>
                <FiSun /> <span>Light Mode</span>
              </>
            ) : (
              <>
                <FiMoon /> <span>Dark Mode</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`md:hidden fixed inset-0 z-10 ${
            darkMode ? "bg-gray-900 bg-opacity-90" : "bg-white bg-opacity-90"
          }`}
        >
          <div className="flex flex-col h-full p-4 pt-16">
            <nav className="flex-1">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavClick(section.id)}
                      className={`w-full text-left p-3 rounded-lg ${
                        activeSection === section.id
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : darkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {section.name}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex justify-center space-x-4 mt-4">
              {portfolioData.meta.socials.map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.link}
                  className={`p-3 rounded-full ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon === "linkedin" ? (
                    <FiLinkedin size={20} />
                  ) : (
                    <FiGithub size={20} />
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div
        ref={contentRef}
        className={`flex-1 ${isMobile ? "mt-16" : "md:ml-64"} p-6 md:p-8`}
      >
        <motion.h2
          key={activeSection}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 md:mb-8"
        >
          {portfolioData.sections[activeSection].title}
        </motion.h2>
        {renderSectionContent()}
      </div>

      {/* Floating Contact Button */}
      <FloatingContactButton />
    </div>
  );
};

export default Portfolio;