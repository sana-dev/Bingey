import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

const API_KEY = '2510ebb73f5853851b304454d610807b';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function FavMoviePage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <div>
      <h1>Favourite Movie</h1>

      {movie && (
        <div key={movie.id}>
          <img
            src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
            alt={movie.title}
            className="DetailImage"
          />
        </div>
      )}
    </div>
  );
}

export default FavMoviePage;
