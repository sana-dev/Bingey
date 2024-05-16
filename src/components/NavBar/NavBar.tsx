import { useState, useContext } from 'react';
import { ThemeContext } from '../../App';
import './NavBar.css';
import { NavLink, Link } from 'react-router-dom';
import logoImage from './logo/logo.png';
interface NavBarProps {
  title: string;
}
const NavBar = (props: NavBarProps) => {
  const darkTheme = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: darkTheme ? '#000000' : ' #ADD8E6',
    color: darkTheme ? ' #ADD8E6' : '#000000',
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
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
