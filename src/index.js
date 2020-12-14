import './style.css';

import createDomElement from './utils/createDomElement.js';

const globalCases = createDomElement('span', 'cases__data', null, document.querySelector('.cases__global'))
const casesListContainer = document.querySelector('.cases__by__country-list')

async function getGlobalCovidData() {
    const url = `https://disease.sh/v3/covid-19/all`;
    const result = await fetch(url);
    if (result.ok) {
        let globalCovidData = await result.json();
        globalCases.innerText = globalCovidData.cases;
        
    } else {
        throw new Error('oops')
    }
}

async function getCountriesCovidData() {
    const url = `https://disease.sh/v3/covid-19/countries`;
    const result = await fetch(url);
    if (result.ok) {
        let countriesCovidData = await result.json();
        countriesCovidData.forEach(countryData  => {
            const countryDataContainer = createDomElement('div', 'country-data-container', null, casesListContainer)
            const countryCases = createDomElement('span', 'country-cases', null, countryDataContainer);
            const countryName = createDomElement('span', 'country-name', null, countryDataContainer );
            countryCases.innerText = countryData.cases;
            countryName.innerText = countryData.country;
        })
    } else {
        throw new Error('oops')
    }
}


document.addEventListener('DOMContentLoaded', () => {
    getGlobalCovidData();
    getCountriesCovidData();
  })
