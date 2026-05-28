import { useState, useEffect } from "react";
import { Icon } from "./Icon";

function Navbar() {
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
    <header className="navbar">
      <div className="navbar__container">
        <h1 className="navbar__title">Where in the world?</h1>
        <button className="navbar__btn" onClick={toggleTheme}>
          <span className="navbar__icon">
            <Icon isDark={isDark} />
          </span>
          <span className="navbar__text">Dark Mode</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
