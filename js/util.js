const ALERT_SHOW_TIME = 5000;
/**
 * Получаем случайное число с плавающей точкой из заданного диапазона с регулированием кол-ва знаков после запятой
 *
 * @param {Number} min
 * @param {Number} max
 * @param {Number} afterComma
 * @return {Number}
 */
const getRandomNumber = (min, max, afterComma) => {
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
const getRandomIntegerNumber = (min, max) => getRandomNumber(min, max);

/**
 * Получаем случайный элемент из входного массива
 *
 * @param {Array} array
 * @return {any}
 */
const getRandomArrayElement = (array) => {
  const elementNumber = getRandomIntegerNumber(0, array.length - 1);
  return array[elementNumber];
};

/**
 * Получаем копию массива из случайной длины и значений входного
 *
 * @param {Array} array
 * @return {Array}
 */
const getRandomList = (array) => {
  let leftBorderNewArray = getRandomIntegerNumber(0, array.length - 1);
  let rightBorderNewArray = getRandomIntegerNumber(0, array.length - 1);
  if (rightBorderNewArray < leftBorderNewArray) {
    let swap = 0;
    swap = rightBorderNewArray;
    rightBorderNewArray = leftBorderNewArray;
    leftBorderNewArray = swap;
  }
  return array.slice(leftBorderNewArray, rightBorderNewArray + 1);
};

const isEscEvent = (evt) => { evt.key === 'Escape' || evt.key === 'Esc'; };

const showServerErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, getRandomIntegerNumber, getRandomArrayElement, getRandomList, isEscEvent, showServerErrorMessage};
