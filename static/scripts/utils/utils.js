function merge_dicts(first, second) {
    return {...first, ...second};
}

function rand(max) {
    return Math.floor(Math.random()*(max + 1));
}

function rand_color() {
    return `rgb(${rand(255)},${rand(255)},${rand(255)})`
}

function capitalise_first(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// https://www.youtube.com/watch?v=Yp9KIcSKTNo
const fetch_json = async (url) => {
    // return (await fetch(...)).json();

    // try {
        const res = await fetch(url);
        const data = await res.json();
    // } catch(e) {
    //     console.error(e);
    // }
        
    return data
}