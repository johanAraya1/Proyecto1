mapboxgl.accessToken = 'pk.eyJ1Ijoia3JhdGl1eCIsImEiOiJjazdkcGhpOWowMDNtM2dwZXp3ZzZxZTV1In0.VXqTb3Sm1-VAPSg0T3ztwA';
var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9', //hosted style id
    center: [-84.084854, 9.734496], // starting position                
    zoom: 6.7, // starting zoom
});

var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        line_string: true,
        trash: true
    },
    styles: [
        // ACTIVE (being drawn)
        // line stroke
        {
            "id": "gl-draw-line",
            "type": "line",
            "filter": ["all", ["==", "$type", "LineString"],
                ["!=", "mode", "static"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#3b9ddd",
                "line-dasharray": [0.2, 2],
                "line-width": 4,
                "line-opacity": 0.7
            }
        },
        // vertex point halos
        {
            "id": "gl-draw-polygon-and-line-vertex-halo-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"],
                ["==", "$type", "Point"],
                ["!=", "mode", "static"]
            ],
            "paint": {
                "circle-radius": 10,
                "circle-color": "#FFF"
            }
        },
        // vertex points
        {
            "id": "gl-draw-polygon-and-line-vertex-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"],
                ["==", "$type", "Point"],
                ["!=", "mode", "static"]
            ],
            "paint": {
                "circle-radius": 6,
                "circle-color": "#3b9ddd",
            }
        },
    ]
});

// add the draw tool to the map
map.addControl(draw);

map.on('draw.create', updateRoute);
map.on('draw.update', updateRoute);
map.on('draw.delete', removeRoute);


function updateRoute() {
    removeRoute(); // overwrite any existing layers
    var data = draw.getAll();
    var answer = document.getElementById('calculated-line');
    var lastFeature = data.features.length - 1;
    var coords = data.features[lastFeature].geometry.coordinates;
    var newCoords = coords.join(';')
    getMatch(newCoords);
}

function getMatch(e) {
    // https://www.mapbox.com/api-documentation/#directions
    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + e + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload = function() {
        var jsonResponse = req.response;
        var distance = jsonResponse.routes[0].distance * 0.001; // convert to km
        var duration = jsonResponse.routes[0].duration / 60; // convert to minutes
        // add results to info box
        document.getElementById('calculated-line').innerHTML = 'Distance: ' + distance.toFixed(2) + ' km<br>Duration: ' + duration.toFixed(2) + ' minutes';
        var coords = jsonResponse.routes[0].geometry;
        // add the route to the map
        addRoute(coords);
    };
    req.send();
}

function addRoute(coords) {
    let coordenadas = coords;
    // check if the route is already loaded
    if (map.getSource('route')) {
        map.removeLayer('route')
        map.removeSource('route')
    } else {
        map.addLayer({
            "id": "route",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": coordenadas
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#3b9ddd",
                "line-width": 8,
                "line-opacity": 0.8
            }
        });
    };
    console.log(coordenadas);
    localStorage.setItem("Coordenadas", JSON.stringify(coordenadas));
}

function removeRoute() {
    if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
        document.getElementById('calculated-line').innerHTML = '';
    } else {
        return;
    }
}