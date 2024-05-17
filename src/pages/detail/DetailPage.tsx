import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FavButton from '../../components/fav-button/FavButton.tsx';
import './DetailPage.css';
import { useContext } from 'react';
import { ThemeContext } from '../../App.tsx';
import image from './Icon/movieicon.png';
import ActorIcon from './Icon/actoricon.png';
import {
  Genre,
  ProductionCompany,
  MovieDetail,
} from './Interfaces/interfaces.tsx';

const API_KEY = '2510ebb73f5853851b304454d610807b';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

function MovieDetailPage() {
  const darkTheme = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: darkTheme ? '#000000' : ' #9AC3C0',
    heading: darkTheme ? ' #ADD8E6' : '#000000',
  };
  const { id } = useParams<{ id: string }>();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMovieDetail({
          title: data.name,
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
        console.error('Error fetching TV data:', error);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
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
          console.error('Error fetching movie data:', error);
        }
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
    genres && genres.length > 0 ? genres[0].name.split('  ')[0] : ' ';

  const formatRuntime = (runtime: number): string => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };
  const RoundRating = (vote_average: number | undefined): string => {
    if (typeof vote_average === 'number') {
      const RatingNumber = Math.round(vote_average * 10) / 10;
      return RatingNumber.toString();
    } else {
      return 'N/A';
    }
  };
  const Company = (
    productionCompany: ProductionCompany[] | undefined
  ): string => {
    console.log('prod comp', productionCompany);

    return production_companies && production_companies.length > 0
      ? production_companies[0].name.split('  ')[0]
      : ' ';
  };

  return (
    <div style={themeStyles}>
      <div className="MainContainer">
        <div className="DetailContainer">
          <img
            src={`${IMAGE_BASE_URL}/${poster_path}`}
            alt={title}
            className="DetailImage"
          />
          <h2 className="DetailHeading">{title}</h2>
          <FavButton />
          <div className="Runtime">
            RUNTIME: {runtime && formatRuntime(runtime)}{' '}
          </div>
          <div className="Genres"> GENRE: {simplifyGenres(genres)}</div>
          <div className="ProductionCompanies">
            Production Company: {Company(production_companies)}
          </div>

          <div className="Rating">RATING: {RoundRating(vote_average)}</div>
          <div className="Date"> Release Date: {release_date}</div>
          <p className="Overview">{overview}</p>
          <div className="MainCharacter">
            {mainCharacter && (
              <div className="MainChara">
                <div className="MainText">
                  <img className="ActorIcon" src={ActorIcon} alt="Actor Icon" />
                  <h3>Main Character:</h3>
                  {mainCharacter.name} as {mainCharacter.character}
                </div>
                {mainCharacter.profile_path && (
                  <img
                    className="MainCharaImg"
                    src={`${IMAGE_BASE_URL}/${mainCharacter.profile_path}`}
                    alt={mainCharacter.name}
                  />
                )}
              </div>
            )}
          </div>
          <div className="torch">
            <div className="torchlight"></div>
          </div>
          <img className="movieicon" src={image} />
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
