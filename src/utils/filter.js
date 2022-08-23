import { FilterType } from '../const.js';

const isWatchList = (movie) => movie.userDetails.watchList;
const isFavorite = (movie) => movie.userDetails.favorite;
const isHistory = (movie) => movie.filmInfo.genre.some((value) => value === 'History');
/*{
  const genre = movie.filmInfo.genre;
  return Array.isArray(genre) ?
    genre.some((value) => value === 'History') :
    false;
};*/

const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter(isWatchList),
  [FilterType.HISTORY]: (movies) => movies.filter(isHistory),
  [FilterType.FAVORITES]: (movies) => movies.filter(isFavorite),
};

export { filter };
