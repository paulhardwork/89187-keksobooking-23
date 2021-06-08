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

const getRandomArrayElement = function (array) {
  const elementNumber = getRandomIntegerNumber(0, array.length - 1);
  return array[elementNumber];
};

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

const ADVERTS_QUANTITY = 10;
const BUILDING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const IMPORTANT_TIMES = ['12:00', '13:00', '14:00'];
const ROOM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ROOM_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LOWER_LAT = 35.65000;
const UPPER_LAT = 35.70000;
const LOWER_LNG = 139.70000;
const UPPER_LNG = 139.80000;

const createAdvert = function (index) {
  const locationLat = getRandomNumber(LOWER_LAT, UPPER_LAT, 5);
  const locationLng = getRandomNumber(LOWER_LNG, UPPER_LNG, 5);
  return {
    author: {
      avatar: `img/avatars/user0${index + 1}.png`,
    },
    offer: {
      title: 'Объявление о сдаче комнаты',
      address: `${locationLat}, ${locationLng}`,
      price: getRandomIntegerNumber(10000, 100000),
      type: getRandomArrayElement(BUILDING_TYPES),
      rooms: getRandomIntegerNumber(1, 5),
      guests: getRandomIntegerNumber(1, 10),
      checkin: getRandomArrayElement(IMPORTANT_TIMES),
      checkout: getRandomArrayElement(IMPORTANT_TIMES),
      features: getRandomList(ROOM_FEATURES),
      description: 'Уютная, теплая, твоя',
      photos: getRandomList(ROOM_PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const advertsList = new Array(ADVERTS_QUANTITY).fill(null).map((__, index) => createAdvert(index));
getRandomList(advertsList); // Временный вызов для использования массива
