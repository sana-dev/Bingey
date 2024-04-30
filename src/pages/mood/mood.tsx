import { useEffect, useState } from 'react';

const apiKey = 'your_api_key_here';
const genreId = 28; // Example genre ID for Action
const moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

const Mood = async () => {
  try {
    const response = await fetch(moviesUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const movies = data.results;
    console.log(movies);
    // Now you have movies belonging to the specific genre
    return movies; // Return the movies data
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return []; // Return an empty array in case of error
  }
};

function MyComponent() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    // Call Mood when the component mounts
    Mood().then((movies) => {
      // Update state with the fetched movies
      setMovies(movies);
    });
  }, []); // Empty dependency array means it only runs once when the component mounts

  return (
    <div>
      <h2>Popular Movies</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <h3>{movie.title}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <p>Release Date: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComponent;
//https://api.themoviedb.org/3/discover/movie?api_key=2510ebb73f5853851b304454d610807b&with_genres=28
