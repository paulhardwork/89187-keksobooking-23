import {createAdvert} from './data.js';

const ADVERTS_QUANTITY = 8;
const getAdvertsList = function (advertsCount) {
  return new Array(advertsCount).fill(null).map((__, index) => createAdvert(index));
};

getAdvertsList(ADVERTS_QUANTITY);
