import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function setLayers(mymap, geoJson, colors) {
  const casesArr = [20000, 20000, 100000, 500000, 1000000, 2000000];
  // set width and height of markers
  const paramsInEm = [0.7, 1.2, 1.7, 2.2, 2.7, 3.2];
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
        <span class="icon-marker" style = " height: ${param}em; width: ${param}em; background-color: ${colors[0]};">
        <span class="icon-marker-tooltip">
            <h2>${country}</h2>
            <p><strong>Confirmed:</strong> ${cases}</p>
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
    div.innerHTML += '<h4>CASES</h4>';
    div.innerHTML += `<div class = "legend__info__container"><div style="background: ${colors[0]}; height: ${legendParamsInEm[0]}em; width: ${legendParamsInEm[0]}em"></div><div> < ${casesArr[0]}</div></div>`;
    div.innerHTML += `<div class = "legend__info__container"><div style="background: ${colors[0]}; height: ${legendParamsInEm[1]}em; width: ${legendParamsInEm[1]}em"></div><div> > ${casesArr[1]}</div></div>`;
    div.innerHTML += `<div class = "legend__info__container"><div style="background: ${colors[0]}; height: ${legendParamsInEm[2]}em; width: ${legendParamsInEm[2]}em"></div><div> > ${casesArr[2]}</div></div>`;
    div.innerHTML += `<div class = "legend__info__container"><div style="background: ${colors[0]}; height: ${legendParamsInEm[3]}em; width: ${legendParamsInEm[3]}em"></div><div> > ${casesArr[3]}</div></div>`;
    div.innerHTML += `<div class = "legend__info__container"><div style="background: ${colors[0]}; height: ${legendParamsInEm[4]}em; width: ${legendParamsInEm[4]}em"></div><div> > ${casesArr[4]}</div></div>`;
    div.innerHTML += `<div class = "legend__info__container"><div style="background: ${colors[0]}; height: ${legendParamsInEm[5]}em; width: ${legendParamsInEm[5]}em"></div><div> > ${casesArr[5]}</div></div>`;
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

  setLayers(mymap, geoJson, colors);
  //   console.log(id);
  //   const map = document.querySelector('#mapid');
  //   while (map.firstChild) {
  //     map.removeChild(map.lastChild);
  //   }
  //   console.log(geoJson);
// }
}
