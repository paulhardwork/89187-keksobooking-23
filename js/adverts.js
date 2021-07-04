const newAdvertsTemplate = document.querySelector('#card').content;

const buildingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getNewAdvert = function (advert) {
  const newAdvert = newAdvertsTemplate.cloneNode(true);
  newAdvert.querySelector('.popup__avatar').src = advert.author.avatar;
  newAdvert.querySelector('.popup__title').textContent = advert.offer.title;
  newAdvert.querySelector('.popup__text--address').textContent = advert.offer.address;
  newAdvert.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  newAdvert.querySelector('.popup__type').textContent = buildingTypes[advert.offer.type];
  newAdvert.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  newAdvert.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;

  const featureList = newAdvert.querySelector('.popup__features');
  const modifiers = advert.offer.features.map((feature) => `popup__feature--${feature}`);
  featureList.querySelectorAll('.popup__feature').forEach((element) => {
    const modifier = element.classList[1];
    if (!modifiers.includes(modifier)) {
      element.remove();
    }
  });

  newAdvert.querySelector('.popup__description').textContent = advert.offer.description;

  const photosContainer = newAdvert.querySelector('.popup__photos');
  const photosList = photosContainer.querySelectorAll('.popup__photo');
  const advertPhotos = advert.offer.photos;
  if (advertPhotos.length === 1) {
    photosList[0].src = advertPhotos[0];
  } else {
    photosList[0].remove();
    advertPhotos.forEach((photoUrl) => {
      photosContainer.insertAdjacentHTML('beforeend', '<img src="" class="popup__photo" width="40" height="40" alt="Фотография отеля">');
      photosContainer.lastChild.src = photoUrl;
    });
  }
  const advertFields = newAdvert.querySelector('.popup').childNodes;
  for (let index = 0; index < advertFields.length; index++) {
    if ((advertFields[index].textContent === '' && advertFields[index].innerHTML === '' &&  advertFields[index].tagName !== 'IMG') || (advertFields[index].src === '' && advertFields[index].tagName === 'IMG')) {
      advertFields[index].classList.add('hidden');
    }
  }
  return newAdvert;
};

export {getNewAdvert};