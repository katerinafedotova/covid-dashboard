import './style.css';
import createMap from './map/createMap';
import createDomElement from './utils/createDomElement';
import generateList from './list/generateList';
import searchCountry from './list/searchCountry';
import transformData from './utils/transformData';
import createChart from './chart/createChart';

const globalCases = createDomElement('span', 'cases__data', null, document.querySelector('.cases__global'));
const select = document.querySelector('.select');
const search = document.querySelector('.search');

let globalData;
let countriesData;
let chartData;
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
// chart
const chartSwitchers = document.querySelectorAll('.switcher__chart');
Array.from(chartSwitchers).forEach((switcher) => switcher.addEventListener('click', (e) => {
  for (let i = 0; i < chartSwitchers.length; i += 1) {
    if (chartSwitchers[i].classList.contains('active')) {
      chartSwitchers[i].classList.remove('active');
    }
  }
  const target = e.target.closest('.switcher__chart');
  const targetId = target.dataset.chart;
  target.classList.add('active');
  console.log(chartData);

  createChart(chartData, targetId);
}));

const chartArrows = Array.from([document.querySelector('.chart__left'), document.querySelector('.chart__right')]);
chartArrows.forEach((arrow) => arrow.addEventListener('click', (e) => {
  // check which arrow clicked
  let currentArrow = e.target;
  if (currentArrow.classList.contains('chart__right')) {
    currentArrow = 'right';
  } else {
    currentArrow = 'left';
  }
  let currentNum;
  // find the slider we want to hide
  Array.from(document.querySelectorAll('.switchers__slider__chart')).forEach((slider) => {
    if (slider.classList.contains('visible')) {
      currentNum = slider.dataset.chartnum;
      if (+currentNum === 4 && currentArrow === 'right') {
        document.querySelector(`[data-chartnum='${currentNum}']`).classList.toggle('visible');
        currentNum = 1;
      }
      if (+currentNum === 1 && currentArrow === 'left') {
        document.querySelector(`[data-chartnum='${currentNum}']`).classList.toggle('visible');
        currentNum = 4;
      }
    }
  });
  const sliderToHide = document.querySelector(`[data-chartnum='${currentNum}']`);
  console.log(sliderToHide);
  let sliderToDisplay;

  if (currentArrow === 'right' && sliderToHide.classList.contains('visible')) {
    sliderToDisplay = document.querySelector(`[data-chartnum='${+currentNum + 1}']`);
    sliderToHide.classList.toggle('visible');
  } else if (currentArrow === 'left' && sliderToHide.classList.contains('visible')) {
    sliderToDisplay = document.querySelector(`[data-chartnum='${+currentNum - 1}']`);
    sliderToHide.classList.toggle('visible');
  } else {
    sliderToDisplay = sliderToHide;
  }

  sliderToDisplay.classList.toggle('visible');
}));

function getChartData() {
  fetch('https://covid19-api.org/api/timeline')
    .then((response) => response.json())
    .then((resp) => {
      chartData = resp;
      createChart(chartData);
    });
}

function getGlobalData() {
  fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((resp) => {
      globalData = resp;
      globalCases.innerText = globalData.cases;
    });
}

function getCountriesData() {
  fetch('https://disease.sh/v3/covid-19/countries')
    .then((response) => response.json())
    .then((respData) => {
      countriesData = respData;
      const countriesDataSort = countriesData.sort((a, b) => b.cases - a.cases);
      const transformedData = transformData(countriesDataSort);
      generateList(transformedData);
      createGeoJson(countriesData);
    });
}

select.addEventListener('change', (e) => {
  [...e.srcElement.options].forEach((elem) => {
    if (elem.selected) {
      const targetName = elem.value;
      const targetId = elem.dataset.id;
      const transformedData = transformData(countriesData);
      generateList(transformedData, targetName, targetId);
    }
  });
});

search.oninput = searchCountry;

document.addEventListener('DOMContentLoaded', () => {
  getGlobalData();
  getCountriesData();
  getChartData();
});
