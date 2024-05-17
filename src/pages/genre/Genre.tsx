import { useState, useEffect, useCallback, useMemo } from 'react';
import './Genre.css';
import {
  Genre as GenreType,
  MovieDetail,
} from '../detail/Interfaces/interfaces.tsx';
import { useThemeContext } from '../../hooks/useThemeContext.ts';

const API_KEY = '2510ebb73f5853851b304454d610807b';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function Genre() {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movieDetail, setMovieDetail] = useState<MovieDetail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { darkTheme } = useThemeContext();

  console.log('Selected genre', selectedGenre);

  const themeStyles = useMemo(
    () => ({
      backgroundColor: darkTheme ? '#000000' : '#9AC3C0',
      heading: darkTheme ? '#f6f6f6' : '#f6f6f6',
      color: darkTheme ? '#000000' : '#f6f6f6',
      buttonBackground: darkTheme ? '#FFFF00' : '#4C7876',
    }),
    [darkTheme]
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      setError('Error fetching genres');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchMoviesByGenre = useCallback(async (genreId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovieDetail(data.results);
    } catch (error) {
      setError('Error fetching movies');
    }
  }, []);

  const handleGenreClick = useCallback(
    (genreId: number) => {
      setSelectedGenre(genreId);
      fetchMoviesByGenre(genreId);
    },
    [fetchMoviesByGenre]
  );

  return (
    <div style={{ backgroundColor: themeStyles.backgroundColor }}>
      <h2 style={{ color: themeStyles.heading }}>
        Choose a movie for current MOOD
      </h2>
      <div className="mainbox">
        {genres.map((genre) => (
          <button
            className="genreButton"
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            style={{
              backgroundColor: themeStyles.buttonBackground,
              color: themeStyles.color,
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>
      {error && <p>Error: {error}</p>}
      {movieDetail.length > 0 && (
        <div>
          <h2 style={{ color: themeStyles.heading }}>Movies</h2>
          <div className="list">
            {movieDetail.map((movie) => (
              <div className="listItems" key={movie.title}>
                <img
                  className="listImg"
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
                <strong>{movie.title}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Genre;
