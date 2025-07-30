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
} from "react-icons/fi";
import { motion } from "framer-motion";
import gsap from "gsap";
import portfolioData from "../data/Profile.json";

// Register GSAP plugins
gsap.registerPlugin();

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

  // Render section content with Framer Motion
  const renderSectionContent = () => {
    const section = portfolioData.sections[activeSection];

    switch (activeSection) {
      case "home":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="  flex flex-col justify-center items-center"
            style={{
              height: "90%",
            }}
          >
            <div className="home_body">
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >
                {section.content.greeting}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                className="text-xl md:text-2xl mb-6"
              >
                {section.content.tagline}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                className="text-lg mb-8 max-w-2xl"
              >
                {section.content.intro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                className="flex flex-wrap gap-4"
              >
                {section.content.cta.map((button, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={button.link}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      darkMode ? "bg-blue-600" : "bg-blue-500"
                    } text-white`}
                  >
                    {button.text}
                  </motion.a>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick("contact")}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  Contact Me
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        );

      case "about":
        return (
          // <div className="space-y-6">
          //   <p className="text-lg">{section.content.who}</p>
          //   <p className="text-lg">{section.content.focus}</p>
          //   <p className="text-lg">{section.content.approach}</p>
          // </div>
      <section
  id="about"
  className="py-16 px-6 md:px-12 max-w-5xl mx-auto text-gray-800 dark:text-gray-200"
>
  {/* Title */}
  <h2 className="text-4xl font-bold mb-6 border-b-4 border-blue-500 dark:border-blue-400 inline-block">
    {section.content.title}
  </h2>

  {/* Bio */}
  <p className="text-lg mb-6 leading-relaxed">
    {section.content.bio}
  </p>

  {/* Paragraphs */}
  <div className="space-y-4 mb-8">
    {section.content.paragraphs.map((para, index) => (
      <p
        key={index}
        className="text-base text-gray-700 dark:text-gray-300 leading-relaxed"
      >
        {para}
      </p>
    ))}
  </div>

  {/* Technologies */}
  <div className="mt-10">
    <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
      Technologies I work with:
    </h3>
    <ul className="flex flex-wrap gap-3">
      {section.content.technologies.map((tech, index) => (
        <li
          key={index}
          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-1 rounded-full text-sm font-medium"
        >
          {tech}
        </li>
      ))}
    </ul>
  </div>
</section>

        );

      case "experience":
        return (
          <div className="space-y-6">
            {section.content.map((exp, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-md`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {exp.role} – {exp.company}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {exp.duration}
                    </p>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {exp.location}
                    </p>
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {exp.contributions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case "skills":
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(section.content).map(([category, skills]) => (
              <div
                key={category}
                className={`p-6 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-md`}
              >
                <h3 className="text-xl font-bold mb-4 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div
            className={`p-6 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-md`}
          >
            <h3 className="text-xl font-bold">{section.content.degree}</h3>
            <p
              className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {section.content.university}
            </p>
            <p
              className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {section.content.year}
            </p>
          </div>
        );

      case "certifications":
        return (
          <div className="space-y-4">
            {section.content.map((cert, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-md`}
              >
                <h3 className="text-xl font-bold">{cert.name}</h3>
                <p
                  className={`mt-2 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {cert.platform}
                </p>
              </div>
            ))}
          </div>
        );

      case "contact":
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-3">📧</span>
                  <a
                    href={`mailto:${section.content.email}`}
                    className="hover:underline"
                  >
                    {section.content.email}
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">🔗</span>
                  <a
                    href={section.content.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">🐙</span>
                  <a
                    href={section.content.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">📍</span>
                  {section.content.location}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full p-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full p-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className={`w-full p-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg font-medium ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition-colors`}
                >
                  Send Message
                </button>
              </form>
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
            className={`w-full p-2 rounded-lg flex items-center justify-center space-x-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
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
          key={activeSection} // Force re-animation on section change
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 md:mb-8"
        >
          {/* {portfolioData.sections[activeSection].title} */}
        </motion.h2>
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default Portfolio;
