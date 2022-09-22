import { ESCAPE_KEY_NAME } from '../const.js';
import dayjs from 'dayjs';

// Взято с https://www.digitalocean.com/community/tutorials/copying-objects-in-javascript
/**Глубокое копирование объекта*/
export const getDeepCopy = (object) => JSON.parse(JSON.stringify(object));

/**Преобразование первый символ в заглавный*/
export const transformFirstCharToUpperCase = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

/** Нажата ли Escape*/
export const isEscapeKey = (evt) => evt.key === ESCAPE_KEY_NAME;

// Функции сортировки
export const sortDate = (a, b) => dayjs(a.filmInfo.release.date).diff(b.filmInfo.release.date) > 0;
export const sortRating = (a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating;
export const sortComment = (a, b) => a.comments?.length < b.comments?.length;
