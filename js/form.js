import {isEscEvent} from './util.js';
import {resetDocumentForms} from './map.js';
import {sendData} from './server.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const SELECTED_QUANTITY_ROOMS = 1;
const ROOMS_NOT_GUESTS = 100;
const VALUE_FOR_HUNDRED_ROOMS = 0;
const MIN_PRICE_BUNGALOW = 0;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOTEL = 3000;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_PALACE = 10000;
const AVATAR_TYPES = ['png', 'jpg', 'jpeg', 'gif'];
const DEFAULT_AVATAR_PREVIEW = 'img/muffin-grey.svg';
const DEFAULT_BACKGROUND_COLOR = '#e4e4de';

const Range = {MIN: 10000, MAX: 50000};

const filterAdvertsForm = document.querySelector('.map__filters');
const filterAdvertsFields = filterAdvertsForm.children;
const filterHousingTypeField = filterAdvertsForm.querySelector('#housing-type');
const filterHousingPriceField = filterAdvertsForm.querySelector('#housing-price');
const filterHousingRoomsField = filterAdvertsForm.querySelector('#housing-rooms');
const filterHousingGuestsField = filterAdvertsForm.querySelector('#housing-guests');
const addingAdvertForm = document.querySelector('.ad-form');
const advertAvatarField = document.querySelector('#avatar');
const advertPreviewAvatar = document.querySelector('.ad-form-header__preview img');
const addingAdvertFields = addingAdvertForm.querySelectorAll('fieldset');
const advertTitleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const selecterRoomNumber = document.querySelector('#room_number');
const selecterGuestQuantity = document.querySelector('#capacity');
const selecterHouseType = document.querySelector('#type');
const selecterTimeIn = document.querySelector('#timein');
const selecterTimeOut = document.querySelector('#timeout');
const advertPhotoField  = document.querySelector('#images');
const previewPhotoContainer = document.querySelector('.ad-form__photo');
const optionsCapacity = selecterGuestQuantity.querySelectorAll('option');
const resetFormButton = document.querySelector('.ad-form__reset');

const activateDocument = function () {
  addingAdvertForm.classList.remove('ad-form--disabled');
  addingAdvertFields.disabled = false;
};

const activateFiltersForm = function () {
  filterAdvertsForm.classList.remove('map__filters--disabled');
  filterAdvertsFields.disabled = false;
};

const deactivateDocument = function () {
  addingAdvertForm.classList.add('ad-form--disabled');
  addingAdvertFields.disabled = true;
  filterAdvertsForm.classList.add('map__filters--disabled');
  filterAdvertsFields.disabled = true;
};

const successSendingMessage = document.querySelector('#success').content.querySelector('.success');
const errorSendingMessage = document.querySelector('#error').content.querySelector('.error');
const errorMessageButton = errorSendingMessage.querySelector('.error__button');

const hideFormMessages = function () {
  if (!successSendingMessage.classList.contains('hidden')) {
    successSendingMessage.classList.add('hidden');
  } else if (!errorSendingMessage.classList.contains('hidden')) {
    errorSendingMessage.classList.add('hidden');
  }
};

const clearPreviewPhotos = () => {
  advertPreviewAvatar.src = DEFAULT_AVATAR_PREVIEW;
  previewPhotoContainer.style.background = DEFAULT_BACKGROUND_COLOR;
};

const initForm = function () {
  document.body.append(successSendingMessage);
  successSendingMessage.classList.add('hidden');

  document.body.append(errorSendingMessage);
  errorSendingMessage.classList.add('hidden');

  const toggleOptionsCapacity = function (valueRooms) {
    for (let i = 0; i < optionsCapacity.length; i++) {
      if (valueRooms === ROOMS_NOT_GUESTS.toString()) {
        optionsCapacity[i].disabled = optionsCapacity[i].value !== VALUE_FOR_HUNDRED_ROOMS.toString();
        selecterGuestQuantity.value = VALUE_FOR_HUNDRED_ROOMS.toString();
      } else {
        optionsCapacity[i].disabled = optionsCapacity[i].value > selecterRoomNumber.value || optionsCapacity[i].value === VALUE_FOR_HUNDRED_ROOMS.toString();
        selecterGuestQuantity.value = SELECTED_QUANTITY_ROOMS.toString();
      }
    }
  };

  advertAvatarField.addEventListener('change', () => {
    const avatarImage = advertAvatarField.files[0];
    const avatarName = avatarImage.name.toLowerCase();

    const matches = AVATAR_TYPES.some((element) => avatarName.endsWith(element));

    if (matches) {
      const avatarFileReader = new FileReader();

      avatarFileReader.addEventListener('load', () => {
        advertPreviewAvatar.src = avatarFileReader.result;
      });

      avatarFileReader.readAsDataURL(avatarImage);
    }
  });

  advertTitleInput.addEventListener('input', () => {
    const valueLength = advertTitleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      advertTitleInput.setCustomValidity(`Минимальное значение - ${MIN_TITLE_LENGTH} символов'`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      advertTitleInput.setCustomValidity(`Длина не должна превышать ${MAX_TITLE_LENGTH} символов!`);
    } else {
      advertTitleInput.setCustomValidity('');
    }
    advertTitleInput.reportValidity();
  });

  selecterHouseType.addEventListener('change', () => {
    if (selecterHouseType.value === 'bungalow') {
      priceInput.min = MIN_PRICE_BUNGALOW;
      priceInput.placeholder = MIN_PRICE_BUNGALOW;
    } else if (selecterHouseType.value === 'flat') {
      priceInput.min = MIN_PRICE_FLAT;
      priceInput.placeholder = MIN_PRICE_FLAT;
    } else if (selecterHouseType.value === 'hotel') {
      priceInput.min = MIN_PRICE_HOTEL;
      priceInput.placeholder = MIN_PRICE_HOTEL;
    } else if (selecterHouseType.value === 'house') {
      priceInput.min = MIN_PRICE_HOUSE;
      priceInput.placeholder = MIN_PRICE_HOUSE;
    } else if (selecterHouseType.value === 'palace') {
      priceInput.min = MIN_PRICE_PALACE;
      priceInput.placeholder = MIN_PRICE_PALACE;
    }
  });

  selecterTimeIn.addEventListener('change', () => selecterTimeOut.value = selecterTimeIn.value);
  selecterTimeOut.addEventListener('change', () => selecterTimeIn.value = selecterTimeOut.value);

  priceInput.addEventListener('invalid', () => {
    if (priceInput.value > MAX_PRICE) {
      priceInput.setCustomValidity(`Цена не может превышать ${MAX_PRICE} рублей за ночь!`);
    } else {
      priceInput.setCustomValidity('');
    }
  });

  advertPhotoField.addEventListener('change', () => {
    const photoImage = advertPhotoField.files[0];
    const photoName = photoImage.name.toLowerCase();

    const matches = AVATAR_TYPES.some((element) => photoName.endsWith(element));

    if (matches) {
      const photoFileReader = new FileReader();

      photoFileReader.addEventListener('load', () => {
        previewPhotoContainer.style.background = `center / 100% auto no-repeat url(${photoFileReader.result})`;
      });

      photoFileReader.readAsDataURL(photoImage);
    }
  });

  toggleOptionsCapacity(SELECTED_QUANTITY_ROOMS);

  selecterRoomNumber.addEventListener('change', () => {
    toggleOptionsCapacity(selecterRoomNumber.value);
  });

  document.addEventListener('click', () => {
    hideFormMessages();
  });

  document.addEventListener('keydown', (evt) => {
    if( isEscEvent(evt) ) {
      hideFormMessages();
    }
  });

  errorMessageButton.addEventListener('click', () => {
    errorSendingMessage.classList.add('hidden');
  });
};

const setResetAdvertForm = function (onReset) {
  resetFormButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetDocumentForms();
    onReset();
  });
};

const setSubmitAdvertForm = function (onSubmit) {
  addingAdvertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(formData);
    onSubmit();
  });
};

const filterSimilarAdverts = function (advert) {

  let isType = true;
  let isPrice = true;
  let isRooms = true;
  let isGuests = true;
  let isFeatures = true;

  const advertPrice = advert.offer.price;
  let advertPriceString = '';
  const choosenType = filterHousingTypeField.value;
  const choosenPrice = filterHousingPriceField.value;
  const choosenRooms = filterHousingRoomsField.value.toString();
  const choosenGuests = filterHousingGuestsField.value.toString();
  const choosenFeatures = filterAdvertsForm.querySelectorAll('input[name="features"]:checked');

  if (choosenType !== 'any') {
    isType = choosenType === advert.offer.type;
  }

  if (choosenRooms !== 'any') {
    isRooms = choosenRooms === advert.offer.rooms.toString();
  }

  if (choosenGuests !== 'any') {
    isGuests = choosenGuests === advert.offer.guests.toString();
  }

  if (choosenPrice !== 'any') {
    if (advertPrice < Range.MIN) {
      advertPriceString = 'low';
    } else if (advertPrice > Range.MIN && advertPrice < Range.MAX) {
      advertPriceString = 'middle';
    } else if (advertPrice > Range.MAX){
      advertPriceString = 'high';
    }
    isPrice = choosenPrice === advertPriceString;
  }

  if (choosenFeatures.length) {
    if (advert.offer.features !== undefined) {
      choosenFeatures.forEach((feature) => {
        if (!advert.offer.features.includes(feature.value)) {
          isFeatures = false;
        }
      });
    } else { isFeatures = false; }
  }

  return isType && isPrice && isRooms && isGuests && isFeatures;
};

const getFilterChange = function (afterChange) {
  filterAdvertsForm.addEventListener('change', () => {
    afterChange();
  });
};

export {initForm, deactivateDocument, activateDocument, filterSimilarAdverts, getFilterChange, activateFiltersForm, setSubmitAdvertForm, setResetAdvertForm, clearPreviewPhotos, successSendingMessage, errorSendingMessage};
