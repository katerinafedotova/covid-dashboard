import createDomElement from '../utils/createDomElement';
import cleanContainer from '../utils/cleanContainer';

const countryDataContainer = document.querySelector('.country-data__container');
const countryTitle = document.querySelector('.country-data__title');

export default function generateTable(data, countryId = 0) {
    cleanContainer(countryDataContainer)

    const countryName = data[countryId].country;
    countryTitle.innerText = `cases in ${countryName}`;
    
    data[countryId].properties.forEach(parameter => {
        const countryInfo = createDomElement('div', 'country-info', null, countryDataContainer);
        const countryParameter = createDomElement('span', 'parameter', null, countryInfo);
        const parameterName = createDomElement('div', 'parameter-name', null, countryInfo);

        countryParameter.innerText = parameter.value;
        parameterName.innerText = parameter.name;
    })

}