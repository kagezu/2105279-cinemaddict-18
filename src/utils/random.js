/**
  *Генерирует случайное число
 *@param {Number} min минимальное значение
 *@param {Number} max максимальное значение
 *@return {Number | undefined} Целое число из диапазона [min;max]
  */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const difference = max - min;
  if (difference >= 0) {
    return Math.floor(min + Math.random() * (difference + 1));
  }
};

/**
 *Генерирует случайное число
 *@param {Number} min минимальное значение
 *@param {Number} max максимальное значение
 *@param {Number} digits кол-вом знаков после запятой
 *@return {Number | undefined} Число с плавающей точкой из диапазона [min;max]
  */
const getRandomFloat = (min, max, digits) => {
  const factor = Math.pow(10, digits);
  min = Math.ceil(min * factor);
  max = Math.floor(max * factor);
  const difference = max - min;
  if (difference >= 0) {
    return Math.floor(min + Math.random() * (difference + 1)) / factor;
  }
};

/**
  *Возвращает случайный элемент из массива
 *@param {Array} sourceList Массив
 *@return {any | undefined} Элемент массива
  */
const getRandomItem = (sourceList) => sourceList[getRandomInt(0, sourceList.length - 1)];


/**
 *@param {Array} list Исходный массив
 *@return {Array} Массив из случайных элементов исходного
  */
const getRandomArray = (list) => {
  const result = [];
  const chance = 1 / list.length;
  list.forEach((value) => {
    if (Math.random() < chance) {
      result.push(value);
    }
  });
  return result;
};

export {
  getRandomInt,
  getRandomFloat,
  getRandomItem,
  getRandomArray
};
