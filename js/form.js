const addingAdvertForm = document.querySelector('.ad-form');
const addingAdvertFields = addingAdvertForm.querySelectorAll('fieldset');
const filterAdvertsForm = document.querySelector('.map__filters');
const filterAdvertsFields = filterAdvertsForm.children;

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

const initForm = function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;
  const SELECTED_QUANTITY_ROOMS = 1;
  const ROOMS_NOT_GUESTS = '100';
  const VALUE_FOR_HUNDRED_ROOMS = '0';

  const advertTitleInput = document.querySelector('#title');
  const priceInput = document.querySelector('#price');
  const selecterRoomNumber = document.querySelector('#room_number');
  const selecterGuestQuantity = document.querySelector('#capacity');
  const optionsCapacity = selecterGuestQuantity.querySelectorAll('option');

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
};

export {initForm, deactivateDocument, activateDocument};
