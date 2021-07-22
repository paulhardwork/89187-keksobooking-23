const newAdvertsTemplate = document.querySelector('#card').content.querySelector('.popup');

const buildingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const hideEmptyBlock = (block) => {
  block.classList.add('hidden');
};

const renderNewAdvert = (advert) => {
  const newAdvert = newAdvertsTemplate.cloneNode(true);
  const avatarAdvertBlock = newAdvert.querySelector('.popup__avatar');
  const titleAdvertBlock = newAdvert.querySelector('.popup__title');
  const addressAdvertBlock = newAdvert.querySelector('.popup__text--address');
  const priceAdvertBlock = newAdvert.querySelector('.popup__text--price');
  const typeAdvertBlock = newAdvert.querySelector('.popup__type');
  const capacityAdvertBlock = newAdvert.querySelector('.popup__text--capacity');
  const timeAdvertBlock = newAdvert.querySelector('.popup__text--time');
  const descriptionAdvertBlock = newAdvert.querySelector('.popup__description');

  (advert.author.avatar !== undefined) ? avatarAdvertBlock.src = advert.author.avatar : hideEmptyBlock(avatarAdvertBlock);
  (advert.offer.title !== undefined) ? titleAdvertBlock.textContent = advert.offer.title : hideEmptyBlock(titleAdvertBlock);
  (advert.offer.address !== undefined) ? addressAdvertBlock.textContent = advert.offer.address : hideEmptyBlock(addressAdvertBlock);
  (advert.offer.price !== undefined) ? priceAdvertBlock.textContent = `${advert.offer.price} ₽/ночь` : hideEmptyBlock(priceAdvertBlock);
  (advert.offer.type !== undefined) ? typeAdvertBlock.textContent = buildingTypes[advert.offer.type] : hideEmptyBlock(typeAdvertBlock);
  ((advert.offer.rooms && advert.offer.guests) !== undefined) ? capacityAdvertBlock.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей` : hideEmptyBlock(capacityAdvertBlock);
  ((advert.offer.checkin && advert.offer.checkout) !== undefined) ? timeAdvertBlock.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}` : hideEmptyBlock(timeAdvertBlock);

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

  (advert.offer.description !== undefined) ? descriptionAdvertBlock.textContent = advert.offer.description : hideEmptyBlock(descriptionAdvertBlock);

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

  return newAdvert;
};

export {renderNewAdvert};
