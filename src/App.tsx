import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.tsx';
import Mood from './pages/auth/Mood.tsx';
import Movies from './pages/movies/movies';
// import PlayPause from './components/Button/button.tsx';
import Hero from './components/hero/Hero.tsx';
import TvShow from './pages/tv-show/tv-show.tsx';
import MyComponent from './pages/mood/Mood.tsx';
function App() {
  return (
    <div>
      <Router>
        <NavBar title="BINGEY" />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-show" element={<TvShow />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/calc" element={<MyComponent />} />
        </Routes>
      </Router>

      {/* <PlayPause /> */}
    </div>
  );
}

export default App;
