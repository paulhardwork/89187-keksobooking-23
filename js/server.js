import {resetDocumentForms} from './map.js';
import {successSendingMessage, errorSendingMessage} from './form.js';
import {showServerErrorMessage} from './util.js';

const showMessage = function (block) {
  block.classList.remove('hidden');
};

const getData = function (onSuccess) {
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
      onSuccess(adverts);
    })
    .catch((error) => showServerErrorMessage(error));
};

const sendData = function (body) {
  fetch('https://23.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: body,
  })
    .then((response) => {
      if (response.ok) {
        showMessage(successSendingMessage);
        resetDocumentForms();
      } else { showMessage(errorSendingMessage); }
    })
    .catch(() => showMessage(errorSendingMessage));
};

export {getData, sendData};
