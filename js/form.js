const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const advertTitleInput = document.querySelector('#title');
const selecterRoomNumber = document.querySelector('#room_number');
const selecterGuestQuantity = document.querySelector('#capacity');
const optionsCapacity = selecterGuestQuantity.querySelectorAll('option');


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

selecterRoomNumber.addEventListener('change', () => {
  if (selecterRoomNumber.value === '1') {
    for (let i = 0; i < optionsCapacity.length; i++) {
      optionsCapacity[i].value > selecterRoomNumber.value || optionsCapacity[i].value === '0' ? optionsCapacity[i].disabled = true : optionsCapacity[i].disabled = false;
    }
  } else if (selecterRoomNumber.value === '2') {
    for (let i = 0; i < optionsCapacity.length; i++) {
      optionsCapacity[i].value > selecterRoomNumber.value || optionsCapacity[i].value === '0' ? optionsCapacity[i].disabled = true : optionsCapacity[i].disabled = false;
    }
  } else if (selecterRoomNumber.value === '3') {
    for (let i = 0; i < optionsCapacity.length; i++) {
      optionsCapacity[i].value > selecterRoomNumber.value || optionsCapacity[i].value === '0' ? optionsCapacity[i].disabled = true : optionsCapacity[i].disabled = false;
    }
  } else if (selecterRoomNumber.value === '100') {
    for (let i = 0; i < optionsCapacity.length; i++) {
      optionsCapacity[i].value !== '0' ? optionsCapacity[i].disabled = true : optionsCapacity[i].disabled = false;
    }
  }
});

