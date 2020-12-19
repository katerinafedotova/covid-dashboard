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
  createMap(geoJson);
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

// set event listeners for arrows
const arrows = Array.from([document.querySelector('.left'), document.querySelector('.right')]);
arrows.forEach((arrow) => arrow.addEventListener('click', (e) => {
  // check which arrow clicked
  let currentArrow = e.target;
  if (currentArrow.classList.contains('right')) {
    currentArrow = 'right';
  } else {
    currentArrow = 'left';
  }
  let currentNum;
  // find the slider we want to hide
  Array.from(document.querySelectorAll('.switchers__slider')).forEach((slider) => {
    if (slider.classList.contains('visible')) {
      currentNum = slider.dataset.slidernum;
      if (+currentNum === 4 && currentArrow === 'right') {
        document.querySelector(`[data-slidernum='${currentNum}']`).classList.toggle('visible');
        currentNum = 1;
      }
      if (+currentNum === 1 && currentArrow === 'left') {
        document.querySelector(`[data-slidernum='${currentNum}']`).classList.toggle('visible');
        currentNum = 4;
      }
    }
  });
  const sliderToHide = document.querySelector(`[data-slidernum='${currentNum}']`);
  let sliderToDisplay;

  if (currentArrow === 'right' && sliderToHide.classList.contains('visible')) {
    sliderToDisplay = document.querySelector(`[data-slidernum='${+currentNum + 1}']`);
    sliderToHide.classList.toggle('visible');
  } else if (currentArrow === 'left' && sliderToHide.classList.contains('visible')) {
    sliderToDisplay = document.querySelector(`[data-slidernum='${+currentNum - 1}']`);
    sliderToHide.classList.toggle('visible');
  } else {
    sliderToDisplay = sliderToHide;
  }

  sliderToDisplay.classList.toggle('visible');
}));
