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
      optionsCapacity[i].value !== VALUE_FOR_HUNDRED_ROOMS ? optionsCapacity[i].disabled = true : optionsCapacity[i].disabled = false;
    } else {
      optionsCapacity[i].value > selecterRoomNumber.value || optionsCapacity[i].value === VALUE_FOR_HUNDRED_ROOMS ? optionsCapacity[i].disabled = true : optionsCapacity[i].disabled = false;
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
    priceInput.setCustomValidity('Цена не может превышать 1000000 рублей за ночь!');
  } else {
    priceInput.setCustomValidity('');
  }
});

toggleOptionsCapacity(SELECTED_QUANTITY_ROOMS);

selecterRoomNumber.addEventListener('change', () => {
  toggleOptionsCapacity(selecterRoomNumber.value);
});

