let grey = "#6c757d";
// let pink = 'rgb(255, 99, 132)';

// cumulative sum
// https://stackoverflow.com/questions/20477177/creating-an-array-of-cumulative-sum-in-javascript
const cumsum = (sum => value => sum += value)(0);

function get_keys(dict) {
    return Object.entries(dict).map(([k,v]) => k);
}

function get_values(dict) {
    return Object.entries(dict).map(([k,v]) => v);
}

function get_data(data) {
    return {
        labels: get_keys(data),
        datasets: [{
            //label: 'My First dataset',
            backgroundColor: grey,
            data: get_values(data)
        }]
    };
}

function get_options(params) {
    return {
        indexAxis: 'y',
        scales: {
            xAxes: {
                title: {
                    display: true,
                    text: params['x_label'],
                    font: {
                        size: 15
                    }
                }
            }, 
            yAxes: {
                title: {
                    display: true,
                    text: params['y_label'],
                    font: {
                        size: 15
                    }
                }, 
                ticks: {
                    autoSkip: false
                    // precision: 0
                }
            }
        }, 
        plugins: {
            title: {
                display: true,
                text: params['title'], 
                font: {
                    size: 20
                }
            }, 
            legend: {
                display: false
            }
        }
    };
}

function get_config(type, data, params) {
    // type: 
        // "doughnut"
        // "bar"
        // "pie"

    const data_ = get_data(data);
    const options = get_options(params);

    return {
        type: type, 
        data: data_,
        options: options
    };
}

function get_chart(id, type, data, params) {

    const config = get_config(type, data, params);

    return new Chart(id, config);
}

//-----------------------------
// Nights
//-----------------------------

const nights_per_city = {
    "Plama": 4, 
    "Barcelona": 12, 
    "Madrid": 4, 
    "Valencia": 4
};

const nights_per_city_options = get_options({ 
    "x_label": "", 
    "y_label": "", 
    "title": "Total No. Nights per City"
});

get_chart(
    "nights_per_city", 
    "bar", 
    nights_per_city, 
    nights_per_city_options);

//----------------------------- 
// categories
//----------------------------- 

const categories = {
    "Accommodation": 682.740, 
    "Food and Drinks": 459.496, 
    "Transportation": 394.762, 
    "Entertainment": 200.400, 
    "Miscellaneous": 77.020
};

const categories_options = get_options({ 
    "x_label": "€", 
    "y_label": "", 
    "title": "Total Spendings by Category"
});

get_chart(
    "categories", 
    "bar", 
    categories, 
    categories_options);

//----------------------------- 
// total spendings by city
//----------------------------- 

const total_spendings_by_city = {
    "Barcelona": 909.84, 
    "Plama": 284.41, 
    "Madrid": 163.97, 
    "Valencia": 134.01, 
    "UK": 47.856
    //"Flights": 197.364 
};

const city_options = get_options({ 
    "x_label": "€", 
    "y_label": "", 
    "title": "Total Spendings by City"
});

get_chart(
    "cities", 
    "bar", 
    total_spendings_by_city, 
    city_options);

//----------------------------- 
// spendings by city per day
//----------------------------- 

const city_per_day = {
    "Barcelona": 113.73, 
    "Plama": 71.1025, 
    "Madrid": 40.9925, 
    "Valencia": 33.5025,
    "UK": 23.928,
};

const city_per_day_options = get_options({ 
    "x_label": "€ / Day", 
    "y_label": "", 
    "title": "Spendings by City per Day"
});

get_chart(
    "cities_per_day", 
    "bar", 
    city_per_day, 
    city_per_day_options);

//----------------------------- 
// timeline
//-----------------------------

let timeline_raw_data = {
    "04/07": 72.18, 
    "05/07": 87.698, 
    "06/07": 106.35, 
    "07/07": 173.03, 
    "08/07": 18.09, 
    "09/07": 144.948, 
    "10/07": 25, 
    "11/07": 160.522, 
    "12/07": 37.04, 
    "13/07": 103.5, 
    "14/07": 99, 
    "15/07": 62.35, 
    "16/07": 79.4, 
    "17/07": 35.8, 
    "18/07": 35.25, 
    "19/07": 87.65, 
    "20/07": 44.85, 
    "21/07": 52.27, 
    "22/07": 49.37, 
    "23/07": 90.968, 
    "24/07": 25.1, 
    "25/07": 22.65, 
    "26/07": 48.88, 
    "27/07": 106.484, 
    "28/07": 25.93, 
    "29/07": 20.108
};

// CumSum
cs_values = get_values(timeline_raw_data).map(cumsum);
timeline_raw_data = Object.fromEntries(get_keys(timeline_raw_data).map((e, i) => [e, cs_values[i]]));

// TODO
// const timeline_data = get_data();
const timeline_data = {
    labels: get_keys(timeline_raw_data),
    datasets: [{
        // backgroundColor: "rgba(0, 0, 0, 0.05)", //"#FF0000",
        fill: true,
        //fillColor : "rgba(255, 255, 255, 0.5)", //"#ff0000",
        borderColor: "rgba(0, 0, 0, 0.25)", 
        data: get_values(timeline_raw_data),
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

const timeline_options = {
    scales: {
        yAxes: {
            title: {
                display: true,
                text: "€",
                font: {
                    size: 15
                }
            }
        }
    }, 
    plugins: {
        title: {
            display: true,
            text: "Cumulative Spendings Over Time", 
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
    
new Chart('timeline', {
    type: 'line',
    data: timeline_data,
    options: timeline_options
    //plugins: [quadrants]
});