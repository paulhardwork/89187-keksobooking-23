import {getRandomNumber, getRandomIntegerNumber, getRandomArrayElement, getRandomList} from './util.js';

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

/**
 * Получаем объект, сгенерированный по заданным условиям
 *
 * @param {Number} index
 * @return {Object}
 */
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

export {createAdvert};
