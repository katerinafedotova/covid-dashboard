import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import check from './setMarkersAndInfo';

// based on https://www.freecodecamp.org/news/how-to-create-a-coronavirus-covid-19-dashboard-map-app-in-react-with-gatsby-and-leaflet/#step-2-fetching-the-coronavirus-data
function structureData(mymap, data) {
  const geoJson = {
    features: data.map((info = {}) => {
      const {
        country, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, population,
      } = info;
      const { countryInfo = {} } = info;
      const { lat, long } = countryInfo;
      return {
        type: 'Feature',
        properties: {
          country,
          cases,
          deaths,
          recovered,
          todayCases,
          todayDeaths,
          todayRecovered,
          population,
        },
        geometry: {
          type: 'Point',
          coordinates: [long, lat],
        },
      };
    }),
  };
  check(mymap, geoJson);
}

export default function createMyMap(data, targetId) {
  console.log(data);
  console.log(targetId);
  const mymap = L.map('mapid', {
    center: [0, 20],
    zoom: 1,
    worldCopyJump: true,
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2F0ZXJpbmFmZWRvdG92YSIsImEiOiJja2luN3Q4Z3gxMGxwMzJxamI5MWpodThvIn0.xuyftPynmYDxhH177-wFgg',
  }).addTo(mymap);
  structureData(mymap, data);
}
