import './map.js';
import {renderActualMarkers} from './map.js';
import './form.js';
import {getFilterChange} from './form.js';
import {getData} from './server.js';

getData((adverts) => {
  renderActualMarkers(adverts);
  getFilterChange(() => renderActualMarkers(adverts));
});


