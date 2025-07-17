import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence for conditional rendering animations

// --- Import Data ---
import timelineData from './data/timelineData.js';
import skillsData from './data/skillsData.js';
import certificationsData from './data/certificationsData.js';
import awardsData from './data/awardsData.js';
import projectsData from './data/projectsData.js';
import quotesData from './data/quotesData.js';
import factsData from './data/factsData.js'; // New data for interactive facts

// --- Import Helper Components ---
import TimelineItem from './components/TimelineItem.jsx';
import SkillCard from './components/SkillCard.jsx';
import QuoteBlock from './components/QuoteBlock.jsx';
import InteractiveFactToggle from './components/InteractiveFactToggle.jsx';

// --- Framer Motion Variants for Reusability ---
const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] } // Custom ease for smoother feel
  }
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// --- Main Profile Component ---
export default function AmanAgrawalProfile() {
  const [theme, setTheme] = useState("light");
  const [isNavOpen, setIsNavOpen] = useState(false); // For mobile navigation

  useEffect(() => {
    const savedTheme = localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Select a random quote for display
  const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];

  return (
    <div className="font-sans antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950">
      {/* Sticky Header Navigation */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md shadow-sm py-4 px-6 md:px-12 flex justify-between items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center">
          <a href="#" className="font-bold text-xl text-indigo-700 dark:text-indigo-400">Aman Agrawal</a>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#story" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">Journey</a>
          <a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">Skills</a>
          <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">Projects</a>
          <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">Contact</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '☀️' : '🌙'}
          </button>
          <button onClick={toggleNav} className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Open navigation">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full bg-white dark:bg-gray-950 z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <button onClick={toggleNav} className="absolute top-6 right-6 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Close navigation">
              <svg className="w-8 h-8 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <a href="#story" onClick={toggleNav} className="text-3xl font-bold text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Journey</a>
            <a href="#skills" onClick={toggleNav} className="text-3xl font-bold text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Skills</a>
            <a href="#projects" onClick={toggleNav} className="text-3xl font-bold text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Projects</a>
            <a href="#contact" onClick={toggleNav} className="text-3xl font-bold text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</a>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section - Redesigned for more impact */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden pt-20" // Added pt-20 for header clearance
      >
        {/* Background image with subtle parallax/scroll effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510851896000-498520af2236?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D')" }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          whileInView={{ y: [0, -50] }} // Subtle parallax on scroll
          viewport={{ once: true, amount: 0.1 }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-75 z-10"></div> {/* Increased opacity for better contrast */}

        <div className="z-20 text-center px-6 py-12 max-w-4xl mx-auto">
          <motion.img
            src="https://media.licdn.com/dms/image/v2/D5603AQEZ1ZxlfhSHzQ/profile-displayphoto-shrink_800_800/B56ZOMbB4IGgAc-/0/1733227717110?e=1758153600&v=beta&t=AMILKILzLPvd7DLWEvFUMdL48v8gnBhplOMx5TRAxUU"
            alt="Aman Agrawal"
            className="rounded-full border-4 border-white w-36 h-36 sm:w-48 sm:h-48 mx-auto mb-8 shadow-2xl object-cover object-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.2 }}
          />
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.6, 0.01, -0.05, 0.9] }}
          >
            Aman Agrawal
          </motion.h1>
          <motion.p
            className="text-lg sm:text-2xl md:text-3xl font-light mb-6 opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.6, 0.01, -0.05, 0.9] }}
          >
            **Transforming Data into Strategic Narratives.**
            <br className="hidden sm:block" /> MBA @ IIM Sambalpur | Ex-Infosys | Technical Assistant @ Tata Power DDL
          </motion.p>
          <motion.a
            href="#story"
            className="mt-10 inline-block px-10 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold text-xl rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all transform tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.6, 0.01, -0.05, 0.9] }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Journey & Impact
          </motion.a>
        </div>
      </section>

      {/* Intriguing Quote Section */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <QuoteBlock quote={randomQuote.quote} author={randomQuote.author} />
        </div>
      </section>

      {/* Life Story Section - Reimagined as a Timeline */}
      <motion.section
        id="story"
        className="px-6 py-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">📖 My Transformative Journey</h2>
        <div className="max-w-4xl mx-auto relative px-4">
          <motion.div variants={staggerContainer}>
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                year={item.year}
                title={item.title}
                description={item.description}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Skills with Proficiency Section - Using SkillCard */}
      <motion.section
        id="skills"
        className="px-6 py-16 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">🧠 Core Skills & Expertise</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skillsData.map((skill, index) => (
            <SkillCard key={index} skill={skill.skill} percent={skill.percent} icon={skill.icon} details={skill.details} />
          ))}
        </div>
      </motion.section>

      {/* Certifications & Awards Section - Combined for impact */}
      <motion.section
        className="px-6 py-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">🏅 Achievements & Credentials</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-purple-500 dark:border-purple-400"
          >
            <h3 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Certifications</h3>
            <div className="space-y-4">
              {certificationsData.map((cert, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center space-x-4 p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm"
                  variants={textRevealVariants}
                >
                  <span className="text-3xl flex-shrink-0">{cert.icon}</span>
                  <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">{cert.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Awards & Recognition */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, true: 0.3 }}
            variants={staggerContainer}
            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-blue-500 dark:border-blue-400"
          >
            <h3 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Awards & Recognition</h3>
            <div className="space-y-4">
              {awardsData.map((award, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center space-x-4 p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm"
                  variants={textRevealVariants}
                >
                  <span className="text-3xl flex-shrink-0">{award.icon}</span>
                  <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">{award.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section - More Visual and Detailed */}
      <motion.section
        id="projects"
        className="px-6 py-16 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">💼 My Impactful Projects</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border-t-8 border-indigo-600 dark:border-indigo-400 flex flex-col h-full"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
            >
              {/* Placeholder for project image/icon */}
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center text-5xl text-gray-500 dark:text-gray-400">
                {project.image || "💡"} {/* Use project specific image/icon */}
              </div>
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-3">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 text-sm space-y-1">
                {project.highlights.map((highlight, hIdx) => (
                  <li key={hIdx}>{highlight}</li>
                ))}
              </ul>
              <a
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium text-center hover:bg-indigo-700 transition transform hover:scale-105"
              >
                View Project
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Facts Section */}
      <motion.section
        className="px-6 py-16 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">💡 Interactive Insights About Me</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {factsData.map((fact, idx) => (
            <InteractiveFactToggle
              key={idx}
              icon={fact.icon}
              fact={fact}
            />
          ))}
        </div>
      </motion.section>

      {/* Contact Section - Consolidated and Prominent */}
      <motion.section
        id="contact"
        className="px-6 py-16 bg-indigo-900 text-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-6">📬 Let's Connect & Collaborate!</h2>
        <p className="mb-8 max-w-2xl mx-auto text-xl opacity-90">
          Passion for data-driven impact and digital transformation. If you'd like to collaborate, discuss opportunities, or just say hello, feel free to reach out.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <motion.a
            href="mailto:agrawalamanhnd@gmail.com"
            className="bg-white text-indigo-800 px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition transform flex items-center justify-center font-medium text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-3 text-2xl">📧</span> Email Me
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/am-ag/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-800 px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition transform flex items-center justify-center font-medium text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-3 text-2xl">🔗</span> LinkedIn Profile
          </motion.a>
          <motion.a
            href="https://github.com/am-ag"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-800 px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition transform flex items-center justify-center font-medium text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-3 text-2xl">💻</span> GitHub Portfolio
          </motion.a>
          <motion.a
            href="/aman-profile-site/aman_agrawal_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-800 px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition transform flex items-center justify-center font-medium text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-3 text-2xl">📄</span> Download Resume
          </motion.a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8 text-center mt-12">
        <p className="text-base mb-2">© {new Date().getFullYear()} Aman Agrawal • Crafted with 💙 & Analytics</p>
        <p className="text-sm opacity-80">Turning numbers into narratives • Building impact through insight.</p>
      </footer>
    </div>
  );
}
