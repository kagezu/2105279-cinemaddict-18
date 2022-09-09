import { ESCAPE_KEY_NAME } from '../const.js';
import dayjs from 'dayjs';

/*
*Преобразование первый символ в заглавный
*/
export const transformFirstCharToUpperCase = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

/*
* Нажата ли Escape
*/
export const isEscapeKey = (evt) => evt.key === ESCAPE_KEY_NAME;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortDate = (a, b) => dayjs(a.filmInfo.release.date).diff(b.filmInfo.release.date) > 0;
export const sortRating = (a, b) => a.filmInfo.totalRating > b.filmInfo.totalRating;
