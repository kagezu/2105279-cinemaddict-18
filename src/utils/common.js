import { ESCAPE_KEY_NAME } from '../const.js';
import dayjs from 'dayjs';

/**Преобразование первый символ в заглавный*/
export const transformFirstCharToUpperCase = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

/** Нажата ли Escape*/
export const isEscapeKey = (evt) => evt.key === ESCAPE_KEY_NAME;

// Функции сортировки
export const sortDate = (a, b) => dayjs(b.filmInfo.release.date).diff(a.filmInfo.release.date);
export const sortRating = (a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating;
export const sortComment = (a, b) => b.comments?.length - a.comments?.length;
