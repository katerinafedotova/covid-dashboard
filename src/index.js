import './style.css';
import createMap from './map/createMap';
import updateSwitchers from './map/updateSwitchers';
import generateList from './list/generateList';
import generateTable from './table/generateTable';
import generateGlobalData from './globalData/generateGlobalData';
import searchCountry from './list/searchCountry';
import transformData from './utils/transformData';
import createChart from './chart/createChart';
import updateChartSwitchers from './chart/updateChartSwitchers';
import getChartDataPerCountry from './chart/createCountryChart';
import './assets/githubLogo.png';
import './assets/rs_school_js.svg';

const countriesListContainer = document.querySelector('.cases__by__country-list');
const select = document.querySelector('.select');
const search = document.querySelector('.search');
const globalArrows = document.querySelectorAll('.global-arrow');

let globalData;
let countriesData;
let chartData;
let transformedData;
let geoJson;
localStorage.clear();

const createGeoJson = (data) => {
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
};
// set event listeners for map
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

const arrows = Array.from([document.querySelector('.map__left'), document.querySelector('.map__right')]);
arrows.forEach((arrow) => arrow.addEventListener('click', (e) => updateSwitchers(e)));

// set event listeners for chart
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
  const countryName = localStorage.getItem('chosenCountryForChart');
  const countryPopulation = localStorage.getItem('chosenCountryPopulationForChart');
  if (countryName === null) {
    createChart(chartData, targetId);
  } else {
    getChartDataPerCountry(countryName, countryPopulation, targetId);
  }
}));

const chartArrows = Array.from([document.querySelector('.chart__left'), document.querySelector('.chart__right')]);
chartArrows.forEach((arrow) => arrow.addEventListener('click', (e) => updateChartSwitchers(e)));

// accumulate data from API
const getChartData = () => {
  fetch('https://covid19-api.org/api/timeline')
    .then((response) => response.json())
    .then((resp) => {
      chartData = resp;
      createChart(chartData);
    });
};

const getGlobalData = () => {
  fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((resp) => {
      globalData = resp;
      generateGlobalData(globalData);
    });
};

const getCountriesData = () => {
  fetch('https://disease.sh/v3/covid-19/countries')
    .then((response) => response.json())
    .then((respData) => {
      countriesData = respData;
      const countriesDataSort = countriesData.sort((a, b) => b.cases - a.cases);
      transformedData = transformData(countriesDataSort);
      generateList(transformedData);
      generateTable(transformedData);
      createGeoJson(countriesData);
    });
};

select.addEventListener('change', (e) => {
  [...e.srcElement.options].forEach((elem) => {
    if (elem.selected) {
      const targetName = elem.value;
      const targetId = elem.dataset.id;
      transformedData = transformData(countriesData);
      generateList(transformedData, targetName, targetId);
    }
  });
});

search.oninput = searchCountry;

countriesListContainer.addEventListener('click', (e) => {
  const countries = document.querySelectorAll('.country-data-container');
  countries.forEach((country) => {
    country.classList.remove('country-data-container_active');
  });

  const country = e.target.closest('.country-data-container');
  country.classList.add('country-data-container_active');
  const countryId = country.dataset.id;
  generateTable(transformedData, countryId);
});

let currentGlobalDataId = 0;
globalArrows.forEach((arrow) => {
  arrow.addEventListener('click', (e) => {
    let currentArrow = e.target;
    if (currentArrow.classList.contains('right')) {
      currentArrow = 'right';
      if (currentGlobalDataId === 11) {
        currentGlobalDataId = 0;
      } else {
        currentGlobalDataId += 1;
      }
    } else {
      currentArrow = 'left';
      if (currentGlobalDataId === 0) {
        currentGlobalDataId = 11;
      } else {
        currentGlobalDataId -= 1;
      }
    }
    generateGlobalData(globalData, currentGlobalDataId);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  getGlobalData();
  getCountriesData();
  getChartData();
});
