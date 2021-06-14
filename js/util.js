/**
 * Получаем случайное число с плавающей точкой из заданного диапазона с регулированием кол-ва знаков после запятой
 *
 * @param {Number} min
 * @param {Number} max
 * @param {Number} afterComma
 * @return {Number}
 */
const getRandomNumber = function (min, max, afterComma) {
  min = Math.abs(min);
  max = Math.abs(max);
  if (min >= max) {
    return 'Верхняя граница диапазона должна быть больше, чем меньшая!';
  }
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(afterComma));
};

/**
 * Получаем случайное целое число из заданного диапазона
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
const getRandomIntegerNumber = function (min, max) {
  return getRandomNumber(min, max);
};

/**
 * Получаем случайный элемент из входного массива
 *
 * @param {Array} array
 * @return {any}
 */
const getRandomArrayElement = function (array) {
  const elementNumber = getRandomIntegerNumber(0, array.length - 1);
  return array[elementNumber];
};

/**
 * Получаем копию массива из случайной длины и значений входного
 *
 * @param {Array} array
 * @return {Array}
 */
const getRandomList = function (array) {
  let leftBorderNewArray = getRandomIntegerNumber(0, array.length - 1);
  let rightBorderNewArray = getRandomIntegerNumber(0, array.length - 1);
  if (rightBorderNewArray < leftBorderNewArray) {
    let swap = 0;
    swap = rightBorderNewArray;
    rightBorderNewArray = leftBorderNewArray;
    leftBorderNewArray = swap;
  } else if (rightBorderNewArray === leftBorderNewArray) {
    rightBorderNewArray++;
  }
  return array.slice(leftBorderNewArray, rightBorderNewArray);
};

export {getRandomNumber, getRandomIntegerNumber, getRandomArrayElement, getRandomList};
