import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { array, colors, sizeInEm } from './mapMarkersInfo';

function setLayers(...args) {
  const mymap = args[0];
  const geoJson = args[1];
  let targetId = args[2];
  const targetNum = args[3];

  let color = colors[0];
  let arr = array[0];
  if (targetId !== undefined) {
    if (targetNum < 6) {
      color = colors[targetNum];
      arr = array[targetNum];
    } else {
      color = colors[targetNum - 6];
      arr = array[targetNum - 6];
    }
  }
  // set width and height of markers
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
      for (let i = 0; i < 12; i += 1) {
        parameterToCompare = arrToCompare[targetNum] || cases;
      }
      // if (parameterToCompare === undefined) { parameterToCompare = cases; }
      for (let i = 0; i < sizeInEm.length; i += 1) {
        if (i === 0 && parameterToCompare < arr[i]) {
          size = sizeInEm[i];
        }
        if (parameterToCompare > arr[i]) {
          size = sizeInEm[i];
        }
      }
      if (targetId === undefined) {
        targetId = 'cases';
      }
      const html = `
        <span class="icon-marker" style = " height: ${size}em; width: ${size}em; background-color: ${color};">
        <span class="icon-marker-tooltip">
            <h2>${country}</h2>
            <p><strong style = "text-transform: capitalize">${targetId}:</strong> ${parameterToCompare}</p>
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
  const legendSizeInEm = sizeInEm.map((el) => el / 2);
  const legend = L.control({ position: 'topright' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML += `<h4>${targetId}</h4>`;
    for (let i = 0; i < legendSizeInEm.length; i += 1) {
      if (i === 0) {
        div.innerHTML += `<div class = "legend__info__container"><div style="background: ${color}; height: ${legendSizeInEm[i]}em; width: ${legendSizeInEm[i]}em"></div><div> < ${arr[i]}</div></div>`;
      } else {
        div.innerHTML += `<div class = "legend__info__container"><div style="background: ${color}; height: ${legendSizeInEm[i]}em; width: ${legendSizeInEm[i]}em"></div><div> > ${arr[i]}</div></div>`;
      }
    }
    return div;
  };

  legend.addTo(mymap);
}

export default function check(...args) {
  const mymap = args[0];
  const geoJson = args[1];
  const targetId = args[2];
  const targetNum = args[3];
  if (args[2] !== undefined) {
    setLayers(mymap, geoJson, targetId, targetNum);
  } else {
    //   const info = [ cases, deaths, recovered, todayCases, todayDeaths, todayRecovered]
    //   Info [dataId]
    // const per100 = population*100000
    // If dataId > 6 => info [dataId]/per100

    setLayers(mymap, geoJson);
  }
}
