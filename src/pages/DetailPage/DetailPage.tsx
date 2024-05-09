import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetailPage.css';
import FavButton from './FavButton/FavButton.tsx';
import image from './Movieicon/movieicon.png';

interface Genre {
  id: number;
  name: string;
}

interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

interface MovieDetail {
  title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  genres?: Genre[];
  original_language?: string;
  spoken_languages?: Language[];
  production_companies?: ProductionCompany[];
  vote_average?: number;
  mainCharacter?: Actor;
  runtime?: number;
}

const API_KEY = '2510ebb73f5853851b304454d610807b';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
          //`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMovieDetail({
          title: data.title,
          overview: data.overview,
          release_date: data.release_date,
          poster_path: data.poster_path,
          genres: data.genres,
          production_companies: data.production_companies,
          vote_average: data.vote_average,
          mainCharacter: data.credits.cast[0],
          runtime: data.runtime || 0,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  const {
    title,
    poster_path,
    release_date,
    overview,
    genres,
    production_companies,
    vote_average,
    mainCharacter,
    runtime,
  } = movieDetail;

  const simplifyGenres = (genres: Genre[] | undefined): string =>
    genres && genres.length > 0
      ? genres.map((genre) => genre.name.split(' ')[0]).join('')
      : '';

  const formatRuntime = (runtime: number): string => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };
  return (
    <div className="DetailContainer">
      <img
        src={`${IMAGE_BASE_URL}/${poster_path}`}
        alt={title}
        className="DetailImage"
      />
      <h2>{title}</h2>
      <div className="Runtime">
        RUNTIME: {runtime && formatRuntime(runtime)}{' '}
      </div>
      <div className="Genres"> GENRE: {simplifyGenres(genres)}</div>
      <div className="ProductionCompanies">
        COMPANY:{' '}
        {production_companies &&
          production_companies.map((company) => (
            <span className="ProductionCompanies" key={company.id}>
              {company.name}
            </span>
          ))}
      </div>
      <div className="Rating">RATING: {vote_average}</div>
      <div className="MainCharacter">
        <h3>Main Character:</h3>
        {mainCharacter && (
          <div>
            <div className="MainChara">
              {mainCharacter.name} as {mainCharacter.character}
            </div>
            {mainCharacter.profile_path && (
              <img
                src={`${IMAGE_BASE_URL}/${mainCharacter.profile_path}`}
                alt={mainCharacter.name}
              />
            )}
          </div>
        )}
      </div>

      <div className="Date">{release_date}</div>
      <p className="Overview">{overview}</p>
      <FavButton />
      <div className="torch">
        <div className="torchlight"></div>
      </div>
      <img className="movieicon" src={image} />
    </div>
  );
}

export default MovieDetailPage;
