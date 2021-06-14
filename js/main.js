import './util.js'; // Насколько это нужно здесь? Кода у нас не выполняется в нем, но ведь в точке входа в любом случае надо все модули обозначить?
import {createAdvert} from './data.js';

const ADVERTS_QUANTITY = 10;
const advertsList = new Array(ADVERTS_QUANTITY).fill(null).map((__, index) => createAdvert(index));
advertsList.length; // Временное использование массива
