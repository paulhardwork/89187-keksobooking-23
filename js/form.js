import {isEscEvent} from './util.js';
import {resetDocumentForms} from './map.js';
import {sendData} from './server.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const SELECTED_QUANTITY_ROOMS = 1;
const ROOMS_NOT_GUESTS = '100';
const VALUE_FOR_HUNDRED_ROOMS = '0';


const filterAdvertsForm = document.querySelector('.map__filters');
const filterAdvertsFields = filterAdvertsForm.children;
const filterHousingTypeField = filterAdvertsForm.querySelector('#housing-type');

const addingAdvertForm = document.querySelector('.ad-form');
const addingAdvertFields = addingAdvertForm.querySelectorAll('fieldset');
const advertTitleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const selecterRoomNumber = document.querySelector('#room_number');
const selecterGuestQuantity = document.querySelector('#capacity');
const optionsCapacity = selecterGuestQuantity.querySelectorAll('option');
const resetFormButton = document.querySelector('.ad-form__reset');

const activateDocument = function () {
  addingAdvertForm.classList.remove('ad-form--disabled');
  addingAdvertFields.disabled = false;
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
document.body.append(successSendingMessage);
successSendingMessage.classList.add('hidden');

const errorSendingMessage = document.querySelector('#error').content.querySelector('.error');
document.body.append(errorSendingMessage);
errorSendingMessage.classList.add('hidden');

const errorMessageButton = errorSendingMessage.querySelector('.error__button');

const hideFormMessages = function () {
  if (!successSendingMessage.classList.contains('hidden')) {
    successSendingMessage.classList.add('hidden');
  } else if (!errorSendingMessage.classList.contains('hidden')) {
    errorSendingMessage.classList.add('hidden');
  }
};

const toggleOptionsCapacity = function (valueRooms) {
  for (let i = 0; i < optionsCapacity.length; i++) {
    if (valueRooms === ROOMS_NOT_GUESTS) {
      optionsCapacity[i].disabled = optionsCapacity[i].value !== VALUE_FOR_HUNDRED_ROOMS;
    } else {
      optionsCapacity[i].disabled = optionsCapacity[i].value > selecterRoomNumber.value || optionsCapacity[i].value === VALUE_FOR_HUNDRED_ROOMS;
    }
  }
};

advertTitleInput.addEventListener('input', () => {
  const valueLength = advertTitleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    advertTitleInput.setCustomValidity('Минимальное значение - 30 символов');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    advertTitleInput.setCustomValidity('Длина не должна превышать 100 символов!');
  } else {
    advertTitleInput.setCustomValidity('');
  }
  advertTitleInput.reportValidity();
});

priceInput.addEventListener('invalid', () => {
  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена не может превышать ${MAX_PRICE} рублей за ночь!`);
  } else {
    priceInput.setCustomValidity('');
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

resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetDocumentForms();
});

addingAdvertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(formData);
});

const filterSimilarAdverts = function (advert) {
  let isType = true;
  let isPrice = true;
  let isRooms = true;
  let isGuests = true;
  let isFeatures = true;

  const choosenType = filterHousingTypeField.value;
  const choosenFeatures = filterAdvertsForm.querySelectorAll('input[name="features"]:checked');

  if (choosenType !== 'any') {
    isType = choosenType === advert.offer.type;
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

export {deactivateDocument, activateDocument, filterSimilarAdverts, getFilterChange, successSendingMessage, errorSendingMessage};
