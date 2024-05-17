import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import './GenreGalore.css';
import { ThemeContext } from '../../App';
import {
  Genre,
  MovieDetail,
} from '../../pages/DetailPage/Interfaces/interfaces.tsx';

const API_KEY = '2510ebb73f5853851b304454d610807b';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function GenreGalore() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movieDetail, setMovieDetail] = useState<MovieDetail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const darkTheme = useContext(ThemeContext);

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
        <div className="list">
          <h2 style={{ color: themeStyles.heading }}>Movies</h2>
          <div className="listItems">
            {movieDetail.map((movie) => (
              <div key={movie.title}>
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '100px', marginRight: '10px' }}
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

export default GenreGalore;

// import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
// import './GenreGalore.css';
// import { ThemeContext } from '../../App';
// import {
//   Genre,
//   MovieDetail,
// } from '../../pages/DetailPage/Interfaces/interfaces.tsx';

// const API_KEY = '2510ebb73f5853851b304454d610807b';
// const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

// function GenreGalore() {
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
//   const [movieDetail, setMovieDetail] = useState<MovieDetail[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const darkTheme = useContext(ThemeContext);

//   const themeStyles = useMemo(
//     () => ({
//       backgroundColor: darkTheme ? '#000000' : '#9AC3C0',
//       heading: darkTheme ? '#f6f6f6' : '#f6f6f6',
//       color: darkTheme ? '#000000' : '#f6f6f6',
//       buttonBackground: darkTheme ? '#FFFF00' : '#4C7876',
//     }),
//     [darkTheme]
//   );

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
//       );
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setGenres(data.genres);
//     } catch (error) {
//       setError('Error fetching genres');
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const fetchMoviesByGenre = useCallback(async (genreId: number) => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
//       );
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setMovieDetail(data.results);
//     } catch (error) {
//       setError('Error fetching movies');
//     }
//   }, []);

//   const handleGenreClick = useCallback(
//     (genreId: number) => {
//       setSelectedGenre(genreId);
//       fetchMoviesByGenre(genreId);
//     },
//     [fetchMoviesByGenre]
//   );

//   return (
//     <div style={{ backgroundColor: themeStyles.backgroundColor }}>
//       <h2 style={{ color: themeStyles.heading }}>
//         Choose a movie for current MOOD
//       </h2>
//       <div className="mainbox">
//         {genres.map((genre) => (
//           <button
//             className="genreButton"
//             key={genre.id}
//             onClick={() => handleGenreClick(genre.id)}
//             style={{
//               backgroundColor: themeStyles.buttonBackground,
//               color: themeStyles.color,
//             }}
//           >
//             {genre.name}
//           </button>
//         ))}
//       </div>
//       {error && <p>Error: {error}</p>}
//       {movieDetail.length > 0 && (
//         <div className="list">
//           <h2 style={{ color: themeStyles.heading }}>Movies</h2>
//           <ul className="listItems">
//             {movieDetail.map((movie) => (
//               <li key={movie.title}>
//                 <img
//                   src={`${IMAGE_BASE_URL}${movie.poster_path}`}
//                   alt={movie.title}
//                   style={{ width: '100px', marginRight: '10px' }}
//                 />
//                 <strong>{movie.title}</strong>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GenreGalore;
