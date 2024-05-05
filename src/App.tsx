import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.tsx';
import Movies from './pages/Movies/Movies.tsx';
import Hero from './components/Hero/Hero.tsx';
import TvShow from './pages/Tv-show/Tv-show.tsx';
import DetailPage from './pages/DetailPage/DetailPage.tsx';

// import PlayPause from './components/Button/button.tsx';

function App() {
  return (
    <div>
      <Router>
        <NavBar title="BINGEY" />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-show" element={<TvShow />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </Router>
      {/* <PlayPause /> */}
    </div>
  );
}

export default App;
