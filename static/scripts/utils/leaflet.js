function center_view(
    map, 
    origin,
    zoom) 
{
    map.setView([
        origin['lat'], 
        origin['lon']], 
        zoom);
}

function fit_view(map, loc1, loc2)
{
    map.fitBounds([loc1, loc2]);
    // map.fitBounds();
}

function clear_map(map)
{
    // L.markerClusterGroup().clearLayers();
    // markerGroup.removeLayer(219)
    // if(markers != null) {
    //     console.log(markers);
    //     // markers.clearLayers();
    // }
    map.eachLayer((layer) => {
        map.removeLayer(layer)
    });

    add_tiles(map);
}

function create_map()
{
    let map = L.map('map', { zoomControl: false });

    return map;
}

function add_tiles(map, max_zoom)
{
    host = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    const tiles = L.tileLayer(host, {
        maxZoom: max_zoom,
        attribution: attribution
    }).addTo(map);

    return tiles;
}

function add_origin(map, origin)
{    
    let origin_ = L
        .layerGroup()
        .addTo(map);

    let icon = L
        .AwesomeMarkers
        .icon({
        icon: "fa-circle",
        markerColor: "red",
        iconColor: "white", 
        prefix: "fa"
        // extraClasses: ""
      }
    );
    let marker = L
        .marker([
            origin['lat'], 
            origin['lon'] ], {
                icon: icon
            })
        .bindPopup(origin['name'])
        .addTo(origin_);

    // let marker = L
    //     .marker([ 
    //         origin['lat'], 
    //         origin['lon'] ])
    //     .bindPopup(origin['name'])
    //     .addTo(origin_);

    return origin_;
}

function add_markers(
    map, 
    locations, 
    circle=false)
{
    // let markers = L
    //     .layerGroup()
    //     .addTo(map);

    let markers = L
        .markerClusterGroup()
        .addTo(map);

    locations.forEach(location => {

        if(circle)
        {
            marker = new L.circleMarker([
                location['lat'], 
                location['lon'] ], 
                { 
                    stroke: false, 
                    fillColor: 'black', 
                    fillOpacity: 1.0, 
                    radius: 5
                })
                .bindPopup(location['name'])
                .addTo(markers);
        }
        else
        {
            let icon = L
                .AwesomeMarkers
                .icon({
                    icon: location['icon'], 
                    markerColor: "black", 
                    iconColor: "white", 
                    prefix: "fa"
                    // extraClasses: ""
            });

            marker = new L.marker([
                location['lat'], 
                location['lon'] ],
                { icon: icon })
                .bindPopup(location['name'])
                .addTo(markers);
        }
    });

    return markers;
}

function add_circle(
    map, 
    origin, 
    radius)
{
    let areas = L
        .layerGroup()
        .addTo(map);

    let circle = L.circle([ 
            origin['lat'], 
            origin['lon'] 
        ], {
            stroke: false, 
            // color: 'red',
            // opacity: 0.2,
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: radius // [meters]
    }).addTo(areas);

    return areas;
}

function add_polygon(
    map, 
    points)
{
    let polygon = L
        .polygon(
            points, {
                stroke: false, 
                fillColor: 'red', 
                fillOpacity: 0.1
            })
        .addTo(map);

    return polygon
}

// https://ryancatalani.medium.com/creating-consistently-curved-lines-on-leaflet-b59bc03fa9dc

function add_path(map, path_data) {

    let paths = L.layerGroup().addTo(map);

    color = rand_color();
    const options = {
            "bubblingMouseEvents": true, 
            // "color": "rgb(255,0,0)", 
            "color": rand_color(), 
            "dashArray": [10, 20], 
            "dashOffset": null, 
            "delay": 400, 
            "fill": false, 
            // "fillColor": "rgb(255,0,0)", 
            "fillColor": rand_color(), 
            "fillOpacity": 0.2, 
            "fillRule": "evenodd", 
            "hardwareAcceleration": false, 
            "lineCap": "round", 
            "lineJoin": "round", 
            "noClip": false, 
            "opacity": 0.5, 
            "paused": false, 
            "pulseColor": "#FFFFFF", 
            "reverse": false, 
            "smoothFactor": 1.0, 
            "stroke": true, 
            "weight": 5
        }

    // Using the constructor...
    let ant_polyline = new L.Polyline.AntPath(path_data, options);

    // ... or use the factory
    // ant_polyline = L.polyline.antPath(path_data, options);

    ant_polyline.addTo(paths);

    return { 'path': ant_polyline, 'layer': paths };
}

function init_map(
    origin={ 
        'name': 'Origin', 
        'lon': 0, 
        'lat': 0
    }, 
    max_zoom=19, 
    zoom=1)
{

    map = create_map(map);
    let tiles = add_tiles(map, max_zoom);
    center_view(map, origin, zoom);
    // fit_view(map, loc1, loc2);

    return map
}