/**
 * Получаем случайное целое число из заданного диапазона
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
function getRandomNumber (min, max) {
  min = Math.abs(Math.ceil(min));
  max = Math.abs(Math.floor(max));
  return min >= max ? 'Верхняя граница диапазона должна быть больше, чем меньшая!' : Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber(100, 200);

/**
 * Получаем случайное число с плавающей точкой из заданного диапазона с регулированием кол-ва знаков после запятой
 *
 * @param {Number} min
 * @param {Number} max
 * @param {Number} afterComma
 * @return {Number}
 */
function getFloatRandom (min, max, afterComma) {
  min = Math.abs(min);
  max = Math.abs(max);
  if (min >= max) {
    return 'Верхняя граница диапазона должна быть больше, чем меньшая!';
  }
  const result = Math.random() * (max - min + 1) + min;
  return Number(result.toFixed(afterComma));
}
getFloatRandom(55.5, 234.2, 3);

// Пока не понял как объединить две функции, несмотря на то, что они очень похожи. Везде есть нюансы, и объединение вижу толбко с помощью ветвления, что еще больше усложнит и расширит код.

