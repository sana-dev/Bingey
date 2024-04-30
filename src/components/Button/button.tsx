import { useState } from 'react';

function PlayPause() {
  const [isPlaying, setIsPlaying] = useState(true);

  function handlePlayPause() {
    setIsPlaying((prevState) => !prevState);
  }

  return (
    <button onClick={handlePlayPause} className={isPlaying ? 'play' : 'pause'}>
      {isPlaying ? 'Play' : 'Pause'}
    </button>
  );
}

export default PlayPause;
// {items.poster_path &&(
// 	<img src={`https:/image.tmdb.org/t/p/w300${items.poster_path}`} alt={`${items.title} poster`}></img>
//   ) }
