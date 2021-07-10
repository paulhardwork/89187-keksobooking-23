import {getNewAdvert} from './adverts.js';
import {getAdvertsList} from './data.js';
import {activateDocument, deactivateDocument} from './form.js';

deactivateDocument();
const addressField = document.querySelector('#address');
const cityMap = L.map('map-canvas')
  .on('load', () => {
    activateDocument();
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 10);

addressField.value = '35.68950, 139.69171';

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

const ADVERTS_QUANTITY = 10;
const newAdverts = getAdvertsList(ADVERTS_QUANTITY);

newAdverts.forEach((advert) => {
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
      getNewAdvert(advert),
    );
});
