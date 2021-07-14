import {renderNewAdvert} from './adverts.js';
import {activateDocument, deactivateDocument} from './form.js';

deactivateDocument();
const LAT_TOKYO = 35.68950;
const LNG_TOKYO = 139.69171;
const addressField = document.querySelector('#address');
const addingAdvertForm = document.querySelector('.ad-form');
const filterAdvertsForm = document.querySelector('.map__filters');
const cityMap = L.map('map-canvas')
  .on('load', () => {
    activateDocument();
  })
  .setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, 10);

addressField.value = `${LAT_TOKYO}, ${LNG_TOKYO}`;

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(cityMap);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });

mainMarker.addTo(cityMap);
mainMarker.on('moveend', (evt) => {
  const currentLocation = evt.target.getLatLng();
  addressField.value = `${Number(currentLocation.lat.toFixed(5))}, ${Number(currentLocation.lng.toFixed(5))}`;
});

const createAdvertMarker = function (advert) {
  const lat = advert.location.lat;
  const lng = advert.location.lng;

  const similarAdvertIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const similarAdvertMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: similarAdvertIcon,
    },
  );

  similarAdvertMarker
    .addTo(cityMap)
    .bindPopup(
      renderNewAdvert(advert),
    );
};

const resetDocumentForms = function () {
  filterAdvertsForm.reset();
  addingAdvertForm.reset();
  mainMarker.setLatLng({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  });
  addressField.value = `${LAT_TOKYO}, ${LNG_TOKYO}`;
};

export {createAdvertMarker, resetDocumentForms};
