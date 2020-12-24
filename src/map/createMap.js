import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import setLayers from './setLayers';

let mymap;
const createMap = (geoJson, targetId, targetNum) => {
  if (targetId !== undefined) {
    setLayers(mymap, geoJson, targetId, targetNum);
  } else {
    mymap = L.map('mapid', {
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
      invalidateSize: true,
    }).addTo(mymap);
    setLayers(mymap, geoJson);
  }
};
export default createMap;
