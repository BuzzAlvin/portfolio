import { useEffect, useState } from "react";
import "/site-svg.png";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/section/Hero/Hero";
import About from "./components/section/Hero/About/About";
import Experience from "./components/section/Hero/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Contact from "./components/section/Hero/Contact/Contact";
import Social from "./components/ui/Social/Social";
import Footer from "./components/layouts/Footer";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  },[isDarkMode]);

  return (
    <>
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Social />
      <Footer />
    </>
  );
};

export default App;
