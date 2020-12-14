import './style.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mymap = L.map('mapid', {
  center: [0, 20],
  zoom: 1,
});
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/dark-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1Ijoia2F0ZXJpbmFmZWRvdG92YSIsImEiOiJja2luN3Q4Z3gxMGxwMzJxamI5MWpodThvIn0.xuyftPynmYDxhH177-wFgg',
}).addTo(mymap);

async function mapEffect() {
  let response;
  let data;
  try {
    response = await fetch('https://disease.sh/v3/covid-19/countries');
    data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(`Failed to fetch countries: ${e.message}`, e);
  }
  // based on https://www.freecodecamp.org/news/how-to-create-a-coronavirus-covid-19-dashboard-map-app-in-react-with-gatsby-and-leaflet/#step-2-fetching-the-coronavirus-data
  const geoJson = {
    // type: 'FeatureCollection',
    features: data.map((country = {}) => {
      const { countryInfo = {} } = country;
      const { lat, long } = countryInfo;
      return {
        type: 'Feature',
        properties: {
          ...country,
        },
        geometry: {
          type: 'Point',
          coordinates: [long, lat],
        },
      };
    }),
  };
  console.log(geoJson);
  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: (feature = {}, latlng) => {
      const { properties = {} } = feature;
      let updatedFormatted;

      const {
        country,
        updated,
        cases,
        deaths,
        recovered,
      } = properties;

      if (updated) {
        updatedFormatted = new Date(updated).toLocaleString();
      }

      let markerColor;
      if (cases > 2000000) {
        markerColor = '#7f0000';
      } else if (cases > 1000000) {
        markerColor = '#b30000';
      } else if (cases > 500000) {
        markerColor = '#d7301f';
      } else if (cases > 200000) {
        markerColor = '#ef6548';
      } else if (cases > 50000) {
        markerColor = '#fc8d59';
      } else if (cases > 20000) {
        markerColor = '#fdbb84';
      } else if (cases > 3000) {
        markerColor = '#fdd49e';
      } else {
        markerColor = '#fff7ec';
      }

      const html = `
        <span class="icon-marker" style = "background-color: ${markerColor}">
        <span class="icon-marker-tooltip">
            <h2>${country}</h2>
            <ul>
              <li><strong style = "color: #ffff00;">Confirmed:</strong> ${cases}</li>
              <li><strong style = "color: #fd2525;">Deaths:</strong> ${deaths}</li>
              <li><strong style = "color: #0be20b;">Recovered:</strong> ${recovered}</li>
              <li><strong>Last Update:</strong> ${updatedFormatted}</li>
            </ul>
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
  console.log(geoJsonLayers);
  geoJsonLayers.addTo(mymap);
}
mapEffect();
