import './util.js';
import {createAdvert} from './data.js';

const ADVERTS_QUANTITY = 10;
const advertsList = new Array(ADVERTS_QUANTITY).fill(null).map((__, index) => createAdvert(index));
advertsList.length; // Временное использование массива
console.log(advertsList);
