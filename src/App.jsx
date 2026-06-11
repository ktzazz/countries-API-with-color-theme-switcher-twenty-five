import "./scss/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Nav";
import Home from "./Home";
import CountryDetail from "./Details";

function App() {
  // check if the user's system already prefers dark mode
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // initialize state based on system preference
  const [isDark, setIsDark] = useState(prefersDark);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDark]); // this runs every time isDark changes

  const toggleTheme = () => {
    setIsDark(!isDark); // no matter what's the user's default it will toggle the oposite
  };

  return (
    <Router>
      {/* The Navbar stays on top of every page */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <Routes>
          {/* Route for the main page with all countries */}
          <Route path='/' element={<Home isDark={isDark} />} />

          {/* Route for the specific country details */}
          <Route path='/country/:countryName' element={<CountryDetail isDark={isDark} />} />
        </Routes>
      </main>
      <footer className='attribution'>
        {" "}
        Challenge by{" "}
        <a href='https://www.frontendmentor.io?ref=challenge' target='_blank' rel='noreferrer'>
          Frontend Mentor
        </a>
        . Coded by <a href='https://www.frontendmentor.io/profile/ktzazz'>Katia Aragón</a>.
      </footer>
    </Router>
  );
}

export default App;
