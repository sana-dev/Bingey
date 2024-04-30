import { useState, useEffect } from 'react';
import './tv-show.css';
interface TvShow {
  id: number;
  original_name: string;
  poster_path: string;
  release_date: string;
}
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
function TvShow() {
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
      <div className="App">
        {TvShow.map((TvShow) => (
          <div className="movieContainer">
            <h4> {TvShow.original_name} </h4>
            <img
              src={`${IMAGE_BASE_URL}/${TvShow.poster_path}`}
              alt={TvShow.original_name}
            />
            <p>{TvShow.release_date}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TvShow;
