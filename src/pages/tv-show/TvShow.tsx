import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TvShow.css';
import { useThemeContext } from '../../hooks/useThemeContext';

interface TvShow {
  id: number;
  original_name: string;
  poster_path: string;
}
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
function TvShow() {
  const { darkTheme } = useThemeContext();

  const themeStyles = {
    backgroundColor: darkTheme ? '#000000' : ' #9AC3C0',
    color: darkTheme ? '#ffffff' : '#ffffff',
  };

  const [TvShow, setTvShow] = useState<TvShow[]>([]);
  const apiKey = '2510ebb73f5853851b304454d610807b';
  const tvShowUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;

  useEffect(() => {
    fetchData();
  }, []);
  // it can be a arrow function or this
  const fetchData = async () => {
    try {
      const response = await fetch(tvShowUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTvShow(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  /// I have to add the clean up
  return (
    <>
      <div style={themeStyles}>
        <h2 className="heading"> Popular Show of All-Times</h2>
        <div className="App">
          {TvShow.map((TvShow) => (
            <Link
              to={`/detail/${TvShow.id}`}
              key={TvShow.id}
              className="movieContainer"
            >
              <div key={TvShow.id}>
                <div className="tvShow-Info">
                  <h2> {TvShow.original_name} </h2>
                </div>
                <div>
                  <img
                    src={`${IMAGE_BASE_URL}/${TvShow.poster_path}`}
                    alt={TvShow.original_name}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default TvShow;
