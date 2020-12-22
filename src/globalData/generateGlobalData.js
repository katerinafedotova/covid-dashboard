import createDomElement from '../utils/createDomElement';
import cleanContainer from '../utils/cleanContainer';
import propertyPer100kPopulation from '../utils/propertyPer100KPopulation';

const globalDataContainer = document.querySelector('.global__cases');

export default function generateGlobalData(data, currentId = 0) {
  cleanContainer(globalDataContainer);

  const globalTitle = createDomElement('div', 'global__title', null, globalDataContainer);
  const globalData = createDomElement('span', 'global__data', null, globalDataContainer);

  const { population } = data;
  const parameters = [
    {
      name: 'cases',
      value: data.cases,
    },
    {
      name: 'deaths',
      value: data.deaths,
    },
    {
      name: 'recovered',
      value: data.recovered,
    },
    {
      name: 'today cases',
      value: data.todayCases,
    },
    {
      name: 'today deaths',
      value: data.todayDeaths,
    },
    {
      name: 'today recovered',
      value: data.todayRecovered,
    },
    {
      name: 'cases per 100K',
      value: propertyPer100kPopulation(data.cases, population),
    },
    {
      name: 'deaths per 100K',
      value: propertyPer100kPopulation(data.deaths, population),
    },
    {
      name: 'recovered per 100K',
      value: propertyPer100kPopulation(data.recovered, population),
    },
    {
      name: 'today cases per 100K',
      value: propertyPer100kPopulation(data.todayCases, population),
    },
    {
      name: 'today deaths per 100K',
      value: propertyPer100kPopulation(data.todayDeaths, population),
    },
    {
      name: 'today recovered per 100K',
      value: propertyPer100kPopulation(data.todayRecovered, population),
    },
  ];

  globalTitle.innerText = `Global ${parameters[currentId].name}`;
  globalData.innerText = parameters[currentId].value;
}
