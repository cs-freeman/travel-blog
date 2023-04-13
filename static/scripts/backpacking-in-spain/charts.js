const data_url = '/static/data/backpacking-in-spain/';

const en = [
    {
        "id": "nights_per_city",
        "x_label": "", 
        "y_label": "", 
        "title": "Total No. Nights per City"
    }, 
    {
        "id": "categories",
        "x_label": "€", 
        "y_label": "", 
        "title": "Total Spendings by Category"
    }, 
    {
        "id": "total_spendings_by_city",
        "x_label": "€", 
        "y_label": "", 
        "title": "Total Spendings by City"
    }, 
    {
        "id": "city_per_day",
        "x_label": "€ / Day", 
        "y_label": "", 
        "title": "Spendings by City per Day"
    }, 
    {
        "id": "timeline_raw_data",
        "x_label": "", 
        "y_label": "€", 
        "title": "Cumulative Spendings Over Time"
    }
]

const fr = [
    {
        "id": "nights_per_city",
        "x_label": "", 
        "y_label": "", 
        "title": "Nb. Totale de Nuits par Ville"
    }, 
    {
        "id": "categories",
        "x_label": "€", 
        "y_label": "", 
        "title": "Dépenses Totales par Categorie"
    }, 
    {
        "id": "total_spendings_by_city",
        "x_label": "€", 
        "y_label": "", 
        "title": "Dépenses Totales par Ville"
    }, 
    {
        "id": "city_per_day",
        "x_label": "€ / Jour", 
        "y_label": "", 
        "title": "Dépenses par Ville par Jour"
    }, 
    {
        "id": "timeline_raw_data",
        "x_label": "", 
        "y_label": "€", 
        "title": "Dépenses Cumulatives sur la Période"
    }
]

const es = [
    {
        "id": "nights_per_city",
        "x_label": "", 
        "y_label": "", 
        "title": "Número Total de Noches por Ciudad"
    }, 
    {
        "id": "categories",
        "x_label": "€", 
        "y_label": "", 
        "title": "Gastos Totales por Categoría"
    }, 
    {
        "id": "total_spendings_by_city",
        "x_label": "€", 
        "y_label": "", 
        "title": "Gastos Totales por Ciudad"
    }, 
    {
        "id": "city_per_day",
        "x_label": "€ / Day", 
        "y_label": "", 
        "title": "Gastos Totales por Ciudad por Día"
    }, 
    {
        "id": "timeline_raw_data",
        "x_label": "", 
        "y_label": "€", 
        "title": "Gastos Acumulados a lo Largo del Tiempo"
    }
]

//-----------------------------
// Nights
//-----------------------------
const nights_per_city = async (options) => {
    const data = await fetch_json(data_url+'nights_per_city.json');
    
    get_chart(
        "nights_per_city", 
        "bar", 
        data, 
        options);
}
//----------------------------- 
// categories
//----------------------------- 
const categories = async (options) => {
    const data = await fetch_json(data_url+'categories.json');
    
    get_chart(
        "categories", 
        "bar", 
        data, 
        options);
}
//----------------------------- 
// total spendings by city
//----------------------------- 
const total_spendings_by_city = async (options) => {
    const data = await fetch_json(data_url+'total_spendings_by_city.json');
    
    get_chart(
        "cities", 
        "bar", 
        data, 
        options);
}
//----------------------------- 
// spendings by city per day
//----------------------------- 
const city_per_day = async (options) => {
    const data = await fetch_json(data_url+'city_per_day.json');
    
    get_chart(
        "cities_per_day", 
        "bar", 
        data, 
        options);
}
//----------------------------- 
// timeline
//-----------------------------
const timeline_raw_data = async (options) => {
    let data = await fetch_json(data_url+'timeline_raw_data.json');

    // CumSum
    cs_values = get_values(data).map(cumsum);
    data = Object.fromEntries(get_keys(data).map((e, i) => [e, cs_values[i]]));

    // TODO
    // const timeline_data = get_data();
    const timeline_data = {
        labels: get_keys(data),
        datasets: [{
            // backgroundColor: "rgba(0, 0, 0, 0.05)", //"#FF0000",
            fill: true,
            //fillColor : "rgba(255, 255, 255, 0.5)", //"#ff0000",
            borderColor: "rgba(0, 0, 0, 0.25)", 
            data: get_values(data),
        }]
    };

    /*const quadrants =
    {
        id: 'quadrants',
        beforeDraw(chart, args, options)
        {
            const { 
                ctx, 
                chartArea: {
                    left, 
                    top, 
                    right, 
                    bottom
                    }, 
                scales: {
                    x, 
                    y
                    } 
            } = chart;
            const midX = x.getPixelForValue(0);
            const midY = y.getPixelForValue(0);
            ctx.save();
            ctx.fillStyle = options.topLeft;
            ctx.fillRect(left, top, midX - left, midY - top);
            ctx.fillStyle = options.topRight;
            ctx.fillRect(midX, top, right - midX, midY - top);
            ctx.fillStyle = options.bottomRight;
            ctx.fillRect(midX, midY, right - midX, bottom - midY);
            ctx.fillStyle = options.bottomLeft;
            ctx.fillRect(left, midY, midX - left, bottom - midY);
            ctx.restore();
        }
    };*/
        
    new Chart('timeline', {
        type: 'line',
        data: timeline_data,
        options: options
        //plugins: [quadrants]
    });
}

function get_json(url) {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (ev) => {
        if(xhr.readyState === 4) {
            const data = JSON.parse(xhr.response);
            console.log(data);
        }
    }

    xhr.open('GET', url, false);
    xhr.send();
}

// window.onload = function() {
document.addEventListener("DOMContentLoaded", async () => {

    const lang = document.documentElement.lang;
    let options = null;
    if(lang.search('en') != -1) {
        options=en;
    } else if(lang.search('fr') != -1) {
        options=fr;
    } else if(lang.search('es') != -1) {
        options=es;
    }

    // let options = {};
    // const langs = [ 'en', 'fr', 'es' ];
    // langs.forEach( lang => {
        
    //     get_json(data_url+'labels/'+`${lang}.json`);

    // //     promise = fetch_json(data_url+'labels/'+`${lang}.json`);
    // //     promise.then(data => {
    // //         options[lang] = data;
    // //     });
    // });
    // console.log(options);
    // console.log(Object.keys(options));
    // let u = options['fr'].filter((item) => item.id == 0);
    // console.log(u);

    // let data = {}
    // const urls = [
    //     'nights_per_city.json', 
    //     'categories.json', 
    //     'total_spendings_by_city.json', 
    //     'city_per_day.json', 
    //     'timeline_raw_data.json'
    // ];
    // urls.forEach( url => {
    //     data[url] = fetch_json(data_url+url);
    // });
    // console.log(data);

    let option = options.find((item) => item.id == 'nights_per_city');
    nights_per_city(option);

    option = options.find((item) => item.id == 'categories');
    categories(option);

    option = options.find((item) => item.id == 'total_spendings_by_city');
    total_spendings_by_city(option);
    
    option = options.find((item) => item.id == 'city_per_day');
    city_per_day(option);

    option = options.find((item) => item.id == 'timeline_raw_data');
    option = {
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: option['y_label'],
                    font: {
                        size: 15
                    }
                }
            }
        }, 
        plugins: {
            title: {
                display: true,
                text: option['title'], 
                font: {
                    size: 20
                }
            }, 
            legend: {
                display: false
            }, 
            // quadrants: {
            //         topLeft: "#ff0000", //Utils.CHART_COLORS.red,
            //         topRight: "#0000ff", //Utils.CHART_COLORS.blue,
            //         bottomRight: "#00ff00", //Utils.CHART_COLORS.green,
            //         bottomLeft: grey, //Utils.CHART_COLORS.yellow,
            // }
        }
    }; 
    timeline_raw_data(option);
})