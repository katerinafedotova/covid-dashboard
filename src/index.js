import './style.css';
import createMyMap from './map/createMap';
// import createNewMap from './map/createNewMap';

let geoJson;
// set geoJson object for map
function createGeoJson(data) {
  geoJson = {
    features: data.map((info = {}) => {
      const {
        country, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, population,
      } = info;
      const { countryInfo = {} } = info;
      const { lat, long } = countryInfo;
      return {
        type: 'Feature',
        properties: {
          country,
          cases,
          deaths,
          recovered,
          todayCases,
          todayDeaths,
          todayRecovered,
          population,
        },
        geometry: {
          type: 'Point',
          coordinates: [long, lat],
        },
      };
    }),
  };
  createMyMap(geoJson);
}
let data;
async function getCountriesData() {
  let response;
  try {
    response = await fetch('https://disease.sh/v3/covid-19/countries');
    data = await response.json();
    createGeoJson(data);
  } catch (e) {
    throw new Error(`Failed to fetch countries: ${e.message}`, e);
  }
}

getCountriesData();
Array.from(document.querySelectorAll('.switcher')).forEach((switcher) => switcher.addEventListener('click', (e) => {
  const targetId = e.target.closest('.switcher').dataset.id;
  const targetNum = e.target.closest('.switcher').dataset.num;
  console.log(targetId);
  console.log(targetNum);

  createMyMap(geoJson, targetId, targetNum);
}));
