import { useState, useEffect } from 'react';
import './movies.css';
interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
function Movies() {
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
      <div className="App">
        {movies.map((movie) => (
          <div className="movieContainer">
            <h4> {movie.title} </h4>
            <img
              src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Movies;
