import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function setLayers(mymap, geoJson, color, targetId) {
  const casesArr = [20000, 20000, 100000, 500000, 1000000, 2000000];
  // set width and height of markers
  const paramsInEm = [0.7, 1.2, 1.7, 2.2, 2.7, 3.2];
  if (targetId === undefined) {
    targetId = 'cases';
  }
  // based on https://www.freecodecamp.org/news/how-to-create-a-coronavirus-covid-19-dashboard-map-app-in-react-with-gatsby-and-leaflet/#step-2-fetching-the-coronavirus-data
  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: (feature = {}, latlng) => {
      const { properties = {} } = feature;

      const {
        country,
        cases,
        // deaths,
        // recovered,
      } = properties;
      // console.log(properties);
      let param;
      for (let i = 0; i < paramsInEm.length; i += 1) {
        if (i === 0 && cases < casesArr[i]) {
          param = paramsInEm[i];
        }
        if (cases > casesArr[i]) {
          param = paramsInEm[i];
        }
      }
      const html = `
        <span class="icon-marker" style = " height: ${param}em; width: ${param}em; background-color: ${color};">
        <span class="icon-marker-tooltip">
            <h2>${country}</h2>
            <p><strong style = "text-transform: capitalize">${targetId}:</strong> ${cases}</p>
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
  const legendParamsInEm = paramsInEm.map((el) => el / 2);
  const legend = L.control({ position: 'topright' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML += `<h4>${targetId}</h4>`;
    for (let i = 0; i < legendParamsInEm.length; i += 1) {
      div.innerHTML += `<div class = "legend__info__container"><div style="background: ${color}; height: ${legendParamsInEm[i]}em; width: ${legendParamsInEm[i]}em"></div><div> < ${casesArr[i]}</div></div>`;
    }
    return div;
  };

  legend.addTo(mymap);
}

export default function check(...args) {
  const mymap = args[0];
  const geoJson = args[1];
  console.log(mymap);
  console.log(geoJson);
  // set different colors for different maps
  const colors = ['#bd0026', '#f03b20', '#fd8d3c', '#feb24c', '#fed976', '#ffffb2'];
  if (args[3] !== undefined) {
    console.log('it was click');
  }

  //   const info = [ cases, deaths, recovered, todayCases, todayDeaths, todayRecovered]
  //   Info [dataId]
  // const per100 = population*100000
  // If dataId > 6 => info [dataId]/per100

  setLayers(mymap, geoJson, colors[0]);
  //   console.log(id);
  //   const map = document.querySelector('#mapid');
  //   while (map.firstChild) {
  //     map.removeChild(map.lastChild);
  //   }
  //   console.log(geoJson);
// }
}
