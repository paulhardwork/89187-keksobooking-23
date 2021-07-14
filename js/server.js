import {createAdvertMarker, resetDocumentForms} from './map.js';
import {successSendingMessage, errorSendingMessage} from './form.js';
import {showServerErrorMessage} from './util.js';

const showMessage = function (block) {
  block.classList.remove('hidden');
};

const getData = function () {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then ((response) => {
      if (response.ok) {
        return response;
      } else {
        showServerErrorMessage(`${response.status} — ${response.statusText}`);
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .then((response) => response.json())
    .then((adverts) => {
      adverts.forEach((advert) => createAdvertMarker(advert));
    })
    .catch((error) => showServerErrorMessage(error));
};

const sendData = function (body) {
  fetch('https://23.javascript.pages.academy/keksbooking', {
    method: 'POST',
    body: body,
  })
    .then((response) => {
      if (response.ok) {
        resetDocumentForms();
        showMessage(successSendingMessage);
      } showMessage(errorSendingMessage);
    })
    .catch(() => showMessage(errorSendingMessage));
};

export {getData, sendData};
