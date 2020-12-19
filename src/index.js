import './style.css';

import createDomElement from './utils/createDomElement';
import generateList from './list/generateList';
import searchCountry from './list/searchCountry';

const globalCases = createDomElement('span', 'cases__data', null, document.querySelector('.cases__global'));
const select = document.querySelector('.select');
const search = document.querySelector('.search');

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
      const transformedData = transformData(countriesDataSort);
      generateList(transformedData);
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

function transformData(data) {
  return data.map((info = {}) => {
    const {
      country, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, population,
    } = info;
    const { countryInfo = {} } = info;
    const { flag } = countryInfo;
    return {
      country,
      population,
      flag,
      properties: [
        {
          name: 'cases',
          value: cases,
        },
        {
          name: 'deaths',
          value: deaths,
        },
        {
          name: 'recovered',
          value: recovered,
        },
        {
          name: 'todayCases',
          value: todayCases,
        },
        {
          name: 'todayDeaths',
          value: todayDeaths,
        },
        {
          name: 'todayRecovered',
          value: todayRecovered,
        },
      ],
    };
  });
}

search.oninput = searchCountry;

document.addEventListener('DOMContentLoaded', () => {
  getGlobalData();
  getCountriesData();
});
