// pk.eyJ1IjoianVhbmpiYXN0b3MiLCJhIjoiY2s5MDN5dXlyMXpsNDN1anM4ZHl2dTNibCJ9.4CobsiaNcxSYc6iXjtLQag
mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmpiYXN0b3MiLCJhIjoiY2s5MDN5dXlyMXpsNDN1anM4ZHl2dTNibCJ9.4CobsiaNcxSYc6iXjtLQag';
let coordinates = document.getElementById('coordinates');
let Latitude = 9.934496;
let Longitude = -84.084854;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [Longitude, Latitude],
    zoom: 10
})
coordinates.innerHTML = 'Longitud: ' + -84.084854 + '<br />Latitud: ' + 9.934496;
// elemento.addEventListener(click)
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);
let elemento = new mapboxgl.Marker({
        draggable: true
    })
    .setLngLat([Longitude, Latitude])
    .addTo(map)

function onDragEnd() {
    let lngLat = elemento.getLngLat();
    coordinates = [lngLat.lng, lngLat.lat];
    Longitude = lngLat.lng;
    Latitude = lngLat.lat;
    console.log(Longitude);
    console.log(Latitude);
    console.log(coordinates);
}
// let elemento = document.createElement('div');
// elemento.className = 'marcador';
let lngLat = elemento.getLngLat();
console.log(coordinates);
// console.log(lngLat.lat);
elemento.on('dragend', onDragEnd);




// // pk.eyJ1IjoianVhbmpiYXN0b3MiLCJhIjoiY2s5MDN5dXlyMXpsNDN1anM4ZHl2dTNibCJ9.4CobsiaNcxSYc6iXjtLQag

// mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmpiYXN0b3MiLCJhIjoiY2s5MDN5dXlyMXpsNDN1anM4ZHl2dTNibCJ9.4CobsiaNcxSYc6iXjtLQag';

// let coordinates = document.getElementById('coordinates');

// let Latitude = 9.870242752268979;
// let Longitude = -84.13058158758615;


// let map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [Longitude, Latitude],
//     zoom: 10


// })

// let element =

//     coordinates.innerHTML = 'Longitud: ' + -84.084854 + '<br />Latitud: ' + 9.934496;


// // elemento.addEventListener(click)

// map.addControl(
//     new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl
//     })
// );


// let elemento = new mapboxgl.Marker({

//     draggable: true
// })

// // elemento.className = 'marcador'

// .setLngLat([Longitude, Latitude])
//     .addTo(map)


// function onDragEnd() {
//     var lngLat = elemento.getLngLat();
//     coordinates.style.display = 'block';
//     coordinates.innerHTML =
//         'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
// }

// // let elemento = document.createElement('div');
// // elemento.className = 'marcador';

// let lngLat = elemento.getLngLat();
// console.log(coordinates);
// // console.log(lngLat.lat);

// elemento.on('dragend', onDragEnd);