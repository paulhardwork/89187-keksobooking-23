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
  const result = Math.random() * (max - min + 1) + min;
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
  return getRandomNumber(min, max, 0);
};
getRandomIntegerNumber(-100.23, 200.45);
