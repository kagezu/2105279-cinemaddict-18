const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'

};

const filterTypeToText = {
  [FilterType.ALL]: 'All movies',
  [FilterType.WATCHLIST]: 'Watchlist',
  [FilterType.HISTORY]: 'History',
  [FilterType.FAVORITES]: 'Favorites'
};

const ESCAPE_KEY_NAME = 'Escape';

export { FilterType, SortType, filterTypeToText, ESCAPE_KEY_NAME };
