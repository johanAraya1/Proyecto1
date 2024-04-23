mapboxgl.accessToken = 'pk.eyJ1Ijoia3JhdGl1eCIsImEiOiJjazdkcGhpOWowMDNtM2dwZXp3ZzZxZTV1In0.VXqTb3Sm1-VAPSg0T3ztwA';
var coordinates = document.getElementById('coordinates');

const Latitude = 9.934496;
const Longitude = -84.084854;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [Longitude, Latitude],
    zoom: 10
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

var marker = new mapboxgl.Marker({
        draggable: true
    })
    .setLngLat([Longitude, Latitude])
    .addTo(map);

function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML =
        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;

}
var lngLat = marker.getLngLat();
console.log(lngLat.lng);
console.log(lngLat.lat);

marker.on('dragend', onDragEnd);