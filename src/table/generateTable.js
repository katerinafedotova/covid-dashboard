import createDomElement from '../utils/createDomElement';
import cleanContainer from '../utils/cleanContainer';
import getChartDataPerCountry from '../chart/createCountryChart';
import propertyPer100kPopulation from '../utils/propertyPer100KPopulation';

const countryDataContainer = document.querySelector('.country-data__container');
const countryDataContainerPer100K = document.querySelector('.country-data__container_per100K');
const countryTitle = document.querySelector('.country-data__title');

export default function generateTable(data, countryId) {
  cleanContainer(countryDataContainer);
  cleanContainer(countryDataContainerPer100K);
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
  const parametersNamePer100K = ['cases per 100K', 'deaths per 100K', 'recovered per 100K', 'today cases per 100K', 'today deaths per 100K', 'today recovered per 100K'];
  const parametersPer100K = [];
  countryTitle.innerText = `cases in ${countryName}`;

  data[countryId].properties.forEach((parameter) => {
    const countryInfo = createDomElement('div', 'country-info', null, countryDataContainer);
    const countryParameter = createDomElement('span', 'parameter', null, countryInfo);
    const parameterName = createDomElement('div', 'parameter-name', null, countryInfo);

    const parameterPer100K = propertyPer100kPopulation(parameter.value, data[countryId].population);
    parametersPer100K.push(parameterPer100K);

    countryParameter.innerText = parameter.value;
    parameterName.innerText = parameter.name;
  });

  for (let i = 0; i < parametersNamePer100K.length; i += 1) {
    const countryInfoPer100K = createDomElement('div', 'country-info', null, countryDataContainerPer100K);
    const countryParameterPer100K = createDomElement('span', 'parameter', null, countryInfoPer100K);
    const parameterNamePer100K = createDomElement('div', 'parameter-name', null, countryInfoPer100K);

    countryParameterPer100K.innerText = parametersPer100K[i];
    parameterNamePer100K.innerText = parametersNamePer100K[i];
  }
}
