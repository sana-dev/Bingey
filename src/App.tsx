import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.tsx';
import Movies from './pages/Movies/Movies.tsx';
import Hero from './components/Hero/Hero.tsx';
import TvShow from './pages/Tv-show/Tv-show.tsx';
import DetailPage from './pages/DetailPage/DetailPage.tsx';
import GenreGalore from './pages/GenrePage/GenreGalore.tsx';
import React, { useState } from 'react';

export const ThemeContext = React.createContext<boolean>(false);

function App() {
  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        {/* <button
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
        </button> */}
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
