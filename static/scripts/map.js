let map = null;

const data_url_ = '/static/data/locations/';

const load_map = async () => {
    const locations = await fetch_json(data_url_+'gmap.json');

    map = init_map();
    let markers = add_markers(
        map, 
        locations, 
        circle=false);
    fit_all(map, markers);
}

// window.onload = function() {
// }

document.addEventListener("DOMContentLoaded", () => { 
    load_map();
});