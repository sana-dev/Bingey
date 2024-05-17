import { useState } from 'react';
import './NavBar.css';
import { NavLink, Link } from 'react-router-dom';
import logoImage from './logo/logo.png';
import { useThemeContext } from '../../hooks/useThemeContext';
interface NavBarProps {
  title: string;
}
const NavBar = (props: NavBarProps) => {
  const { darkTheme, toggleTheme } = useThemeContext();

  const themeStyles = {
    backgroundColor: darkTheme ? '#000000' : '#4C7876',
    color: darkTheme ? '#ADD8E6' : '#000000',
    textColor: darkTheme ? '#ffffff' : '#000000',
  };
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={themeStyles}>
      <nav>
        <Link to="/" className="title">
          <img src={logoImage} alt="Logo" className="logo" /> {props.title}
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? 'open' : ''}>
          <li>
            <NavLink to="/movies" className="nav-link">
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/tv-show" className="nav-link">
              TV Show
            </NavLink>
          </li>
          <li>
            <NavLink to="/Genre-Galore" className="nav-link">
              Genre
            </NavLink>
          </li>
          <li>
            <button className="toggle" onClick={toggleTheme}>
              Toggle theme
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
