import './style.css';
import createMap from './map/createMap';

let geoJson;
// set geoJson object for map
function createGeoJson(data) {
  geoJson = {
    features: data.map((info = {}) => {
      const {
        country, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, population,
      } = info;
      const { countryInfo = {} } = info;
      const { lat, long, flag } = countryInfo;
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
          flag,
        },
        geometry: {
          type: 'Point',
          coordinates: [long, lat],
        },
      };
    }),
  };
  console.log(geoJson);
  createMap(geoJson);
}
let data;
async function getCountriesData() {
  let response;
  try {
    response = await fetch('https://disease.sh/v3/covid-19/countries');
    data = await response.json();
    console.log(data);
    createGeoJson(data);
  } catch (e) {
    throw new Error(`Failed to fetch countries: ${e.message}`, e);
  }
}

getCountriesData();
const switchers = document.querySelectorAll('.switcher');
Array.from(switchers).forEach((switcher) => switcher.addEventListener('click', (e) => {
  for (let i = 0; i < switchers.length; i += 1) {
    if (switchers[i].classList.contains('active')) {
      switchers[i].classList.remove('active');
    }
  }
  const target = e.target.closest('.switcher');
  const targetId = target.dataset.id;
  const targetNum = e.target.closest('.switcher').dataset.num;
  target.classList.add('active');
  createMap(geoJson, targetId, targetNum);
}));
