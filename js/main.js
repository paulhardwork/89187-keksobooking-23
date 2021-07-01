import {getAdvertsList} from './data.js';
import {getNewAdvert} from './adverts.js';

const ADVERTS_QUANTITY = 10;
const newAdverts = getAdvertsList(ADVERTS_QUANTITY);

const mapContainer = document.querySelector('.map');
const mapCanvas = mapContainer.querySelector('#map-canvas');

mapCanvas.appendChild(getNewAdvert(newAdverts[5]));
