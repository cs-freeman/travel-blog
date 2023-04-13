let map = null;

const data_url_ = '/static/data/';

const load_map = async () => {
    const locations = await fetch_json(data_url_+'locations.json');

    map = init_map();
    add_markers(
        map, 
        locations, 
        circle=false);
}

// window.onload = function() {
// }

document.addEventListener("DOMContentLoaded", () => { 
    load_map();
});