import {createAdvert} from './data.js';

const ADVERTS_QUANTITY = 10;
const getAdvertsList = function (advertsCount) {
  return new Array(advertsCount).fill(null).map((__, index) => createAdvert(index));
};


const mapContainer = document.querySelector('.map');
const mapCanvas = mapContainer.querySelector('#map-canvas');
const similarAdvertsTemplate = document.querySelector('#card').content;

const similarAdverts = getAdvertsList(ADVERTS_QUANTITY);
const similarListFragment = document.createDocumentFragment();

const buildingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

similarAdverts.forEach((advert) => {
  const similarAdvert = similarAdvertsTemplate.cloneNode(true);
  similarAdvert.querySelector('.popup__title').textContent = advert.offer.title;
  similarAdvert.querySelector('.popup__text--address').textContent = advert.offer.address;
  similarAdvert.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  similarAdvert.querySelector('.popup__type').textContent = buildingTypes[advert.offer.type];
  similarAdvert.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  similarAdvert.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  const featureList = similarAdvert.querySelector('.popup__features');
  const modifiers = advert.offer.features.map((feature) => `popup__feature--${feature}`);
  featureList.querySelectorAll('.popup__feature').forEach((element) => {
    const modifier = element.classList[1];
    if (!modifiers.includes(modifier)) {
      element.remove();
    }
  });
  mapCanvas.appendChild(similarAdvert);
});
