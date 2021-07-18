import './map.js';
import {renderActualMarkers} from './map.js';
import {initForm, getFilterChange, activateFiltersForm, setSubmitAdvertForm, setResetAdvertForm} from './form.js';
import {getData} from './server.js';
import {debounce} from './utils/debounce.js';

initForm();

getData((adverts) => {
  renderActualMarkers(adverts);
  activateFiltersForm();
  getFilterChange(debounce(() => renderActualMarkers(adverts)));
  setSubmitAdvertForm(() => renderActualMarkers(adverts));
  setResetAdvertForm(() => renderActualMarkers(adverts));
});


