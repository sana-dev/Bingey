import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import NavBar from './components/nav-bar/NavBar.tsx';
import DetailPage from './pages/detail/DetailPage.tsx';
import GenreGalore from './pages/genre/Genre.tsx';
import Movies from './pages/movies/Movies.tsx';
import TvShow from './pages/tv-show/TvShow.tsx';
import Hero from './components/hero/Hero.tsx';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
