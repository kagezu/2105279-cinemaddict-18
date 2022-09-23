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
  LOWER_LIMIT: 500,
  UPPER_LIMIT: 1000
};

// Промежуток в минутах определяющее формат вывода
export const DurationType = {
  // Менее 2х минут - 'now'
  NOW: 2,
  // Менее 10 минут - 'a few minutes'
  FEW: 10,
  // Менее 2х часов выводим в минутах
  MINUTES: 2 * 60,
  // Менее суток в часах
  HOURS: 24 * 60,
  // Менее месяца в днях
  DAYS: 30 * 24 * 60,
  // Менее года в месяцах
  MOUNTS: 365 * 24 * 60
};

export const ranks = [
  {
    name: '',
    count: 1
  },
  {
    name: 'Novice',
    count: 11
  },
  {
    name: 'Fan',
    count: 21
  },
  {
    name: 'Movie Buff',
    count: Infinity
  },
];
