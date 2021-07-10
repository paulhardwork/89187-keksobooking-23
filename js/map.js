import { activateDocument, deactivateDocument } from './form.js';

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
