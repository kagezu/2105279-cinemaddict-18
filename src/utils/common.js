import { ESCAPE_KEY_NAME } from '../const.js';

/*
*Преобразование первый символ в заглавный
*/
export const transformFirstCharToUpperCase = (str) => str ? `${str[0].toUpperCase()}${str.slice(1)}` : str;

/*
* Нажата ли Escape
*/
export const isEscapeKey = (evt) => evt.key === ESCAPE_KEY_NAME;
