import { FilterType } from '../const.js';

const isWatchList = (movie) => movie.userDetails.watchlist;
const isFavorite = (movie) => movie.userDetails.favorite;
const isHistory = (movie) => movie.userDetails.alreadyWatched;

const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter(isWatchList),
  [FilterType.HISTORY]: (movies) => movies.filter(isHistory),
  [FilterType.FAVORITES]: (movies) => movies.filter(isFavorite),
};

export { filter };
