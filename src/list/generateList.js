import createDomElement from '../utils/createDomElement';
import cleanContainer from '../utils/cleanContainer';

const casesListContainer = document.querySelector('.cases__by__country-list');
const categoryName = document.querySelector('.category-name');
const select = document.querySelector('.select');

const propertyPer100kPopulation = (a, b) => {
  if (b === 0) {
    return 0;
  }
  return ((a / b) * 100000).toFixed(1);
};

export default function generateList(dataJson, targetName, targetId = 0) {
  cleanContainer(casesListContainer);

  if (targetName === undefined) {
    categoryName.innerText = `${select.value} by Country`;
  } else {
    categoryName.innerText = `${targetName} by Country`;
  }

  let countriesDataSort;
  if (targetId >= 6) {
    const id = targetId - 6;
    countriesDataSort = dataJson.sort((a, b) => (propertyPer100kPopulation(b.properties[id].value,
      b.population) - propertyPer100kPopulation(a.properties[id].value, a.population)));
  } else {
    countriesDataSort = dataJson.sort((a, b) => b.properties[targetId].value
     - a.properties[targetId].value);
  }

  countriesDataSort.forEach((countryData) => {
    const countryDataContainer = createDomElement('div', 'country-data-container', null, casesListContainer);
    const countryCases = createDomElement('span', 'country-cases', null, countryDataContainer);
    const countryName = createDomElement('span', 'country-name', null, countryDataContainer);
    const countryFlag = createDomElement('img', null, null, countryDataContainer, ['src', countryData.flag]);

    if (targetId >= 6) {
      const id = targetId - 6;
      countryCases.innerText = propertyPer100kPopulation(countryData.properties[id].value,
        countryData.population);
    } else {
      countryCases.innerText = countryData.properties[targetId].value;
    }
    countryName.innerText = countryData.country;
  });
}
