import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css';
import { useThemeContext } from '../../hooks/useThemeContext';
interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
function Movies() {
  const { darkTheme } = useThemeContext();

  const themeStyles = {
    backgroundColor: darkTheme ? '#000000' : ' #9AC3C0',
    heading: darkTheme ? ' #ADD8E6' : '#000000',
  };
  const [movies, setMovies] = useState<Movies[]>([]);
  const apiKey = '2510ebb73f5853851b304454d610807b';
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  useEffect(() => {
    fetchData();
  }, []);
  // it can be a arrow function or this
  const fetchData = async () => {
    try {
      const response = await fetch(popularUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  /// I have to add the clean up
  return (
    <>
      <div style={themeStyles}>
        <h1 className="heading"> Popular Movies</h1>
        <div className="App">
          {movies.map((movie) => (
            <Link
              to={`/detail/${movie.id}`}
              key={movie.id}
              className="movieContainer"
            >
              <div key={movie.id}>
                <div className="movieInfo">
                  <h1>{movie.title}</h1>

                  <div className="date">
                    released:
                    {movie.release_date}
                  </div>
                </div>
                <img
                  src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Movies;
