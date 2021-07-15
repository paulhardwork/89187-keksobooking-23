const newAdvertsTemplate = document.querySelector('#card').content.querySelector('.popup');

const buildingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const hideEmptyBlock = function (block) {
  block.classList.add('hidden');
};

const renderNewAdvert = function (advert) {
  const newAdvert = newAdvertsTemplate.cloneNode(true);
  newAdvert.querySelector('.popup__avatar').src = advert.author.avatar;
  newAdvert.querySelector('.popup__title').textContent = advert.offer.title;
  newAdvert.querySelector('.popup__text--address').textContent = advert.offer.address;
  newAdvert.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  newAdvert.querySelector('.popup__type').textContent = buildingTypes[advert.offer.type];
  newAdvert.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  newAdvert.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;

  const featureList = newAdvert.querySelector('.popup__features');
  const features = advert.offer.features;
  if (features !== undefined) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    featureList.querySelectorAll('.popup__feature').forEach((element) => {
      const modifier = element.classList[1];
      if (!modifiers.includes(modifier)) {
        element.remove();
      }
    });
  } else { hideEmptyBlock(featureList); }

  newAdvert.querySelector('.popup__description').textContent = advert.offer.description;

  const photosContainer = newAdvert.querySelector('.popup__photos');
  const photoElement = photosContainer.querySelector('.popup__photo');
  const advertPhotos = advert.offer.photos;
  if (advertPhotos !== undefined) {
    if (advertPhotos.length === 1) {
      photoElement.src = advertPhotos[0];
    } else {
      advertPhotos.forEach((photoUrl) => {
        const newPhoto = photoElement.cloneNode();
        photosContainer.append(newPhoto);
        photosContainer.lastElementChild.src = photoUrl;
      });
      photosContainer.firstElementChild.remove();
    }
  } else { hideEmptyBlock (photosContainer); }

  const advertFields = newAdvert.children;
  for (let index = 0; index < advertFields.length; index++) {
    if ((advertFields[index].textContent === '' && advertFields[index].innerHTML === '' &&  advertFields[index].tagName !== 'IMG') || (advertFields[index].src === '' && advertFields[index].tagName === 'IMG')) {
      advertFields[index].classList.add('hidden');
    }
  }
  return newAdvert;
};

export {renderNewAdvert};
