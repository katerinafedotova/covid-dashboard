import './style.css';

import createDomElement from './utils/createDomElement.js';

const globalCases = createDomElement('span', 'cases__data', null, document.querySelector('.cases__global'))

let globalCovidData;

async function getGlobalCovidData() {
    const url = `https://disease.sh/v3/covid-19/all`;
    const result = await fetch(url);
    if (result.ok) {
        globalCovidData = await result.json();
        globalCases.innerText = globalCovidData.cases;
        
    } else {
        throw new Error('oops')
    }
}



document.addEventListener('DOMContentLoaded', () => {
    getGlobalCovidData();
  })
