import './style.css';

import createDomElement from './utils/createDomElement';
import generateList from './list/generateList';

const globalCases = createDomElement('span', 'cases__data', null, document.querySelector('.cases__global'));

let globalData;
let countriesData;

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
      // createList(countriesDataSort);
      generateList(countriesDataSort);
    });
}

// let dataJson;
// function createList(data) {
//   dataJson = data.map((info = {}) => {
//     const {
//       country, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, population,
//     } = info;
//     const { countryInfo = {} } = info;
//     const { flag } = countryInfo;
//     return {
//       country,
//       cases,
//       deaths,
//       recovered,
//       todayCases,
//       todayDeaths,
//       todayRecovered,
//       population,
//       flag,
//     };
//   });
// }

document.addEventListener('DOMContentLoaded', () => {
  getGlobalData();
  getCountriesData();
});
