import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { statsArray, colors, sizeInEm } from './constants';

export default function setLayers(...args) {
  const mymap = args[0];
  const geoJson = args[1];
  const targetId = args[2];
  const targetNum = args[3];
  let parameterName;
  let color = colors[0];
  let arr = statsArray[0];
  // set color of markers and figures displayed in legend
  if (targetId !== undefined) {
    color = colors[targetNum];
    arr = statsArray[targetNum];
    parameterName = targetId.replaceAll('-', ' ');
  }
  // based on https://www.freecodecamp.org/news/how-to-create-a-coronavirus-covid-19-dashboard-map-app-in-react-with-gatsby-and-leaflet/#step-2-fetching-the-coronavirus-data
  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: (feature = {}, latlng) => {
      const { properties = {} } = feature;

      const {
        country,
        cases,
        deaths,
        recovered,
        todayCases,
        todayDeaths,
        todayRecovered,
        population,

      } = properties;

      let size;
      const arrToCompare = [
        cases,
        deaths,
        recovered,
        todayCases,
        todayDeaths,
        todayRecovered];
      let parameterToCompare;
      if (targetNum === undefined) {
        parameterToCompare = cases;
      } else if (targetNum >= 6) {
        if (population === 0) {
          parameterToCompare = 0;
        } else {
          parameterToCompare = ((arrToCompare[targetNum - 6] / population) * 100000).toFixed(1);
        }
      } else {
        parameterToCompare = arrToCompare[targetNum];
      }
      // set marker size
      for (let i = 0; i < sizeInEm.length; i += 1) {
        if (i === 0 && parameterToCompare < arr[i]) {
          size = sizeInEm[i];
        }
        if (parameterToCompare > arr[i]) {
          size = sizeInEm[i];
        }
      }
      if (targetId === undefined) {
        parameterName = 'cases';
      }
      // set marker content
      const html = `
        <span class="icon-marker" style = " height: ${size}em; width: ${size}em; background-color: ${color};">
        <span class="icon-marker-tooltip">
            <h2>${country}</h2>
            <p><strong style = "text-transform: capitalize">${parameterName}:</strong> ${parameterToCompare.toLocaleString('en', { maximumFractionDigits: 0 })}</p>
        </span>
        </span>
      `;
      return L.marker(latlng, {
        icon: L.divIcon({
          className: 'icon',
          html,
        }),
        riseOnHover: true,
      });
    },
  });
  geoJsonLayers.addTo(mymap);
  // set legend
  const legendSizeInEm = sizeInEm.map((el) => el / 2);
  const legend = L.control({ position: 'topright' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML += `<h4>${parameterName}</h4>`;
    for (let i = 0; i < legendSizeInEm.length; i += 1) {
      if (i === 0) {
        div.innerHTML += `<div class = "legend__info__container"><div style="background: ${color}; height: ${legendSizeInEm[i]}em; width: ${legendSizeInEm[i]}em"></div><div> < ${arr[i].toLocaleString('en', { maximumFractionDigits: 0 })}</div></div>`;
      } else {
        div.innerHTML += `<div class = "legend__info__container"><div style="background: ${color}; height: ${legendSizeInEm[i]}em; width: ${legendSizeInEm[i]}em"></div><div> > ${arr[i].toLocaleString('en', { maximumFractionDigits: 0 })}</div></div>`;
      }
    }
    return div;
  };

  legend.addTo(mymap);
}
