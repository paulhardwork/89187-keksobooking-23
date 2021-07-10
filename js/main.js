import {getAdvertsList} from './data.js';
import {getNewAdvert} from './adverts.js';
import {initForm} from './form.js';
import './map.js';

initForm();

const ADVERTS_QUANTITY = 10;
const newAdverts = getAdvertsList(ADVERTS_QUANTITY);
const mapContainer = document.querySelector('.map');
const mapCanvas = mapContainer.querySelector('#map-canvas');


