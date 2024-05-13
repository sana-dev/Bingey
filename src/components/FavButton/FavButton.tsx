import { useState } from 'react';
import './FavButton.css';
import FavMoviePage from '../../pages/favs/Favs.tsx';
// import { Link } from 'react-router-dom';
const FavButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <button
        className={`FavoriteButton ${isFavorite ? 'clicked' : ''}`}
        onClick={handleAddToFavorites}
      >
        {isFavorite ? (
          <span className="HeartIcon">&#x2764;&#xfe0f;</span>
        ) : (
          <span className="HeartIcon">&#x2661;</span>
        )}
        {isFavorite && <FavMoviePage />}
      </button>
    </div>
  );
};

export default FavButton;

// import React, { useState, useEffect } from 'react';
// import './FavButton.css';

// interface FavoriteButtonProps {
//   movieId: string;
// }

// const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     const favorites = JSON.parse(
//       localStorage.getItem('favorites') || '[]'
//     ) as string[];
//     setIsFavorite(favorites.includes(movieId));
//   }, [movieId]);

//   const handleAddToFavorites = () => {
//     setIsFavorite(!isFavorite);
//     const favorites = JSON.parse(
//       localStorage.getItem('favorites') || '[]'
//     ) as string[];
//     if (isFavorite) {
//       const updatedFavorites = favorites.filter((id) => id !== movieId);
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//       console.log('Removed from favorites');
//     } else {
//       const updatedFavorites = [...favorites, movieId];
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//       console.log('Added to favorites');
//     }
//   };

//   return (
//     <button
//       className={`FavoriteButton ${isFavorite ? 'clicked' : ''}`}
//       onClick={handleAddToFavorites}
//     >
//       {isFavorite ? (
//         <span className="HeartIcon">&#x2764;&#xfe0f;</span> // Filled heart icon
//       ) : (
//         <span className="HeartIcon">&#x2661;</span> // Empty heart icon
//       )}
//     </button>
//   );
// };

// export default FavoriteButton;

// import React, { useState } from 'react';
// import './FavButton.css';

// const FavoriteButton: React.FC = () => {
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleAddToFavorites = () => {
//     setIsFavorite(!isFavorite);
//     console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites');
//   };

//   return (
//     <button
//       className={`FavoriteButton ${isFavorite ? 'clicked' : ''}`}
//       onClick={handleAddToFavorites}
//     >
//       {isFavorite ? (
//         <span className="HeartIcon">&#x2764;&#xfe0f;</span> // Filled heart icon
//       ) : (
//         <span className="HeartIcon">&#x2661;</span> // Empty heart icon
//       )}
//     </button>
//   );
// };

// export default FavoriteButton;

// import { useState } from 'react';

// function PlayPause() {
//   const [isPlaying, setIsPlaying] = useState(true);

//   function handlePlayPause() {
//     setIsPlaying((prevState) => !prevState);
//   }

//   return (
//     <button onClick={handlePlayPause} className={isPlaying ? 'play' : 'pause'}>
//       {isPlaying ? 'Play' : 'Pause'}
//     </button>
//   );
// }

// export default PlayPause;
// // {items.poster_path &&(
// // 	<img src={`https:/image.tmdb.org/t/p/w300${items.poster_path}`} alt={`${items.title} poster`}></img>
// //   ) }
