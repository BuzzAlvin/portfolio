import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Social from "../components/ui/Social/Social"


const Layouts = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <>
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <Outlet />

      <Social />
      <Footer />
    </>
  );
};

export default Layouts;
