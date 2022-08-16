/**
  *Целое число из диапазона [min; max]
  *undefined, если подходящих значений нет.
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
  *Случайное число с плавающей точкой из диапазона [min;max]
  * и digits "кол-вом знаков после запятой",
  *undefined если подходящих значений нет.
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
  */
const getRandomItem = (sourceList) => sourceList[getRandomInt(0, sourceList.length - 1)];


/**
  *Возвращает массив из случайных элементов
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

export { getRandomInt, getRandomFloat, getRandomItem, getRandomArray };
