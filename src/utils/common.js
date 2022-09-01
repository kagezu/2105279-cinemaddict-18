import { ESCAPE_KEY_NAME } from '../const.js';

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
