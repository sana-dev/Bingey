import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import NavBar from './components/nav-bar/NavBar.tsx';
import DetailPage from './pages/detail/DetailPage.tsx';
import GenreGalore from './pages/genre/Genre.tsx';
import Movies from './pages/movies/Movies.tsx';
import TvShow from './pages/tv-show/TvShow.tsx';
import Hero from './components/hero/Hero.tsx';

export const ThemeContext = React.createContext<boolean>(false);

function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  return (
    <>
      <button
        className="toggle"
        onClick={toggleTheme}
        style={{
          backgroundColor: 'yellow',
          borderRadius: '50%',
          padding: '5px',
          margin: '2px',
          position: 'relative',
          left: '93%',
        }}
      >
        🔵
      </button>
      <ThemeContext.Provider value={darkTheme}>
        <Router>
          <NavBar title="BINGEY" />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/Genre-Galore" element={<GenreGalore />} />
            <Route path="/tv-show" element={<TvShow />} />
            <Route path="/detail/:id" element={<DetailPage />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
