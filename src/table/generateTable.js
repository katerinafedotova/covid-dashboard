import createDomElement from '../utils/createDomElement';
import cleanContainer from '../utils/cleanContainer';

const countryDataContainer = document.querySelector('.country-data__container');
const countryTitle = document.querySelector('.country-data__title');

export default function generateTable(data) {
    const countryName = data[0].country;
    countryTitle.innerText = `cases in ${countryName}`;
    console.log(data[0]);
}