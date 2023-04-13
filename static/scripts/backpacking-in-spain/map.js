let map = null;

const data_url_ = '/static/data/';

const load_map = async () => {
    const locations = await fetch_json(data_url_+'locations.json');

    const london = locations.find((item) => item.name == 'London');
    const madrid = locations.find((item) => item.name == 'Madrid');
    const barcelona = locations.find((item) => item.name == 'Barcelona');
    const valencia = locations.find((item) => item.name == 'Valencia');
    const palma = locations.find((item) => item.name == 'Palma de Mallorca');

    destinations = [ london, palma, barcelona, madrid, valencia ]
    
    map = init_map(
        origin=madrid, 
        zoom=5, 
        max_zoom=50);
    add_markers(map, destinations, circle=true);
    // add_circle(
    //     map, 
    //     origin=madrid, 
    //     radius=500000);

    let points = destinations.map(({ lat, lon }) => [ lat, lon ]);
    points.push(points[0]);

    let flights = new L.Polyline(points, {
        color: 'black',
        weight: 2,
        opacity: 1.0,
        smoothFactor: 1
    });
    flights.addTo(map);
}

document.addEventListener("DOMContentLoaded", () => { 
    load_map();
});