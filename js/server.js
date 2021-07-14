import {createAdvertMarker} from './map.js';

const ALERT_SHOW_TIME = 5000;
const showErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getData = function () {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then ((response) => {
      if (response.ok) {
        return response;
      } else {
        showErrorMessage(`${response.status} — ${response.statusText}`);
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .then((response) => response.json())
    .then((adverts) => {
      adverts.forEach((advert) => createAdvertMarker(advert));
    })
    .catch((error) => showErrorMessage(error));
};

const sendData = function () {

};

export {getData, sendData};
