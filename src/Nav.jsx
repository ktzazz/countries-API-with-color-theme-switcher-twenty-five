import "./scss/Nav.scss";
import { Icon } from "./Icon";
import { Link } from "react-router-dom";

function Navbar({ isDark, toggleTheme }) {
  return (
    <header className='navbar'>
      <Link to='/'>
        <h1 className='navbar__title'>Where in the world?</h1>
      </Link>
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
