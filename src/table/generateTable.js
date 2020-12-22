import createDomElement from '../utils/createDomElement';
import cleanContainer from '../utils/cleanContainer';
import getChartDataPerCountry from '../chart/createCountryChart';

const countryDataContainer = document.querySelector('.country-data__container');
const countryTitle = document.querySelector('.country-data__title');

export default function generateTable(data, countryId) {
  console.log(data);
  cleanContainer(countryDataContainer);
  let countryName;
  if (countryId !== undefined) {
    countryName = data[countryId].country;
    const countryPopulation = data[countryId].population;
    getChartDataPerCountry(countryName, countryPopulation);
    localStorage.setItem('chosenCountryForChart', countryName);
    localStorage.setItem('chosenCountryPopulationForChart', countryPopulation);
  } else {
    countryId = 0;
  }
  countryName = data[countryId].country;
  countryTitle.innerText = `cases in ${countryName}`;

  data[countryId].properties.forEach((parameter) => {
    const countryInfo = createDomElement('div', 'country-info', null, countryDataContainer);
    const countryParameter = createDomElement('span', 'parameter', null, countryInfo);
    const parameterName = createDomElement('div', 'parameter-name', null, countryInfo);

    countryParameter.innerText = parameter.value;
    parameterName.innerText = parameter.name;
  });
}
