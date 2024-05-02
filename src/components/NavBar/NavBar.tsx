import { useState } from 'react';
import './NavBar.css';
import { NavLink, Link } from 'react-router-dom';
import logoImage from './logo/logo.png';
interface NavBarProps {
  title: string;
}
const NavBar = (props: NavBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
          <NavLink to="/auth" className="nav-link">
            Auth
          </NavLink>
        </li>
        <li>
          <NavLink to="/rated" className="nav-link">
            Rated
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;

// interface NavBarProps {
//   title: string;
// }

// function NavBar(props: NavBarProps) {
//   const [menuOpen, setMenuOpen] = useState(true);

//   return (
//     <nav className="navbar">
//       <div
//         className="Menu"
//         onClick={() => {
//           setMenuOpen(!menuOpen);
//         }}
//       >
//         <div className={menuOpen ? 'menu-icon-open' : 'menu-icon'}>
//           {/* <div className="bar"></div>
//           <div className="bar"></div>
//           <div className="bar"></div> */}
//           <button
//             className="hamburger-button"
//             onClick={() => !setMenuOpen}
//           ></button>
//         </div>
//       </div>
//       <Link to="/" className="title">
//         {props.title}
//       </Link>
//       <ul className={menuOpen ? 'nav-links-open' : 'nav-links'}>
//         <li>
//           <Link to="/movies" className="nav-link">
//             Movies
//           </Link>
//         </li>
//         <li>
//           <Link to="/tv-show" className="nav-link">
//             TV Show
//           </Link>
//         </li>
//         <li>
//           <Link to="/auth" className="nav-link">
//             Auth
//           </Link>
//         </li>
//         <li>
//           <Link to="/rated" className="nav-link">
//             Rated
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default NavBar;
