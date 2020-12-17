import createDomElement from '../utils/createDomElement';

const casesListContainer = document.querySelector('.cases__by__country-list');
const select = document.querySelector('.select');
const categoryName = document.querySelector('.category-name');

export default function generateList(data) {
  cleanContainer(casesListContainer);
  categoryName.innerText = `${select.value} by Country`;
  data.forEach((countryData) => {
    const countryDataContainer = createDomElement('div', 'country-data-container', null, casesListContainer);
    const countryCases = createDomElement('span', 'country-cases', null, countryDataContainer);
    const countryName = createDomElement('span', 'country-name', null, countryDataContainer);
    const countryFlag = createDomElement('img', null, null, countryDataContainer, ['src', countryData.countryInfo.flag]);
    countryCases.innerText = countryData.cases;
    countryName.innerText = countryData.country;
  });
}

function cleanContainer(dataContainer) {
  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }
}
