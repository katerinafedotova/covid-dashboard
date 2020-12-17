import './style.css';
import createMyMap from './map/createMap';
// import setMarkersAndInfo from './map/setMarkersAndInfo';
// import createNewMap from './createNewMap';

let data;

async function getCountriesData() {
  let response;
  try {
    response = await fetch('https://disease.sh/v3/covid-19/countries');
    data = await response.json();
    createMyMap(data);
  } catch (e) {
    throw new Error(`Failed to fetch countries: ${e.message}`, e);
  }
}

getCountriesData();
Array.from(document.querySelectorAll('.switcher')).forEach((switcher) => switcher.addEventListener('click', (e) => {
  const targetId = e.target.dataset;
  // createNewMap(data, targetId);
}));
