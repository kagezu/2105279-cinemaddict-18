export const ESCAPE_KEY_NAME = 'Escape';

export const emotions = ['smile', 'sleeping', 'puke', 'angry'];

export const FilterType = {
  ALL: 'all movies',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

export const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  MICRO: 'MICRO',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  MODEL: 'MODEL'
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};
