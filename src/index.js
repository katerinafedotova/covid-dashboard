import './style.css';

import createDomElement from './utils/createDomElement.js';


const globalCases = createDomElement('span', 'cases__data', null, document.querySelector('.cases__global'))
const casesListContainer = document.querySelector('.cases__by__country-list')

function getGlobalCovidData() {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then(response => {
        return response.json();
      })
      .then(respData => {
        let globalCovidData = respData;
        globalCases.innerText = globalCovidData.cases;

      });
  }

 

async function getCountriesCovidData() {
    const url = `https://disease.sh/v3/covid-19/countries`;
    const result = await fetch(url);
    if (result.ok) {
        let countriesCovidData = await result.json();
        ///сперва сортиро=ую countriesCovidData затем закидываем в генератетабле
        generateTable(countriesCovidData);
        
    } else {
        throw new Error('oops')
    }
}

function cleanContainer(dataContainer) {
    while (dataContainer.firstChild) {
      dataContainer.removeChild(dataContainer.firstChild);
    }
}

const generateTable = (data, ) => {
    cleanContainer(casesListContainer);
    data.forEach(countryData  => {
        const countryDataContainer = createDomElement('div', 'country-data-container', null, casesListContainer)
        const countryCases = createDomElement('span', 'country-cases', null, countryDataContainer);
        const countryName = createDomElement('span', 'country-name', null, countryDataContainer );
        countryCases.innerText = countryData.cases;
        countryName.innerText = countryData.country;
    })
}






document.addEventListener('DOMContentLoaded', () => {
    getGlobalCovidData();
    getCountriesCovidData();
  })
