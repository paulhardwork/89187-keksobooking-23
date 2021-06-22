import {createAdvert} from './data.js';

const ADVERTS_QUANTITY = 10;
const getAdvertsList = function (advertsCount) {
  return new Array(advertsCount).fill(null).map((__, index) => createAdvert(index));
};


const mapContainer = document.querySelector('.map');
const mapCanvas = mapContainer.querySelector('#map-canvas');
const similarAdvertsTemplate = document.querySelector('#card').content;

const similarAdverts = getAdvertsList(ADVERTS_QUANTITY);

similarAdverts.forEach((advert) => {
  const similarAdvert = similarAdvertsTemplate.cloneNode(true);
  similarAdvert.querySelector('.popup__title').textContent = advert.offer.title;
  mapCanvas.appendChild(similarAdvert);
});
