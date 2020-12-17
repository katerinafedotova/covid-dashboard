import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import check from './setMarkersAndInfo';

export default function createMyMap(geoJson, targetId, targetNum) {
  console.log(geoJson);
  // const map = document.querySelector('#mapid');
  if (targetId !== undefined) {
    console.log(targetId);
    document.querySelector('#mapid').remove();
    const switchers = document.querySelector('.switchers');
    const container = document.querySelector('.second__column__content');
    const div = document.createElement('div');
    container.insertBefore(div, switchers);
    div.setAttribute('id', 'mapid');
  }

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
  check(mymap, geoJson, targetId, targetNum);
}
