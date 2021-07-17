import './map.js';
import {renderActualMarkers} from './map.js';
import './form.js';
import {getFilterChange, activateFiltersForm, setSubmitAdvertForm, setResetAdvertForm} from './form.js';
import {getData} from './server.js';
import {debounce} from './utils/debounce.js';

getData((adverts) => {
  renderActualMarkers(adverts);
  activateFiltersForm();
  getFilterChange(debounce(() => renderActualMarkers(adverts)));
  setSubmitAdvertForm(() => renderActualMarkers(adverts));
  setResetAdvertForm(() => renderActualMarkers(adverts));
});


