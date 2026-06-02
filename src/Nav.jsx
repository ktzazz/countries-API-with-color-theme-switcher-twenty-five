import "./scss/Nav.scss";
import { Icon } from "./Icon";

function Navbar({ isDark, toggleTheme }) {
  return (
    <header className='navbar'>
      <h1 className='navbar__title'>Where in the world?</h1>
      <button className='navbar__btn' onClick={toggleTheme}>
        <span className='navbar__icon'>
          <Icon isDark={isDark} />
        </span>
        <span className='navbar__text'>Dark Mode</span>
      </button>
    </header>
  );
}

export default Navbar;
