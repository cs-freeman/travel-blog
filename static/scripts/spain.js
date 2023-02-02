let grey = "#6c757d";
// let pink = 'rgb(255, 99, 132)';

const base_url = 'http://127.0.0.1:8000/static/scripts/';

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

fetch(base_url+'nights_per_city.json')
  .then((response) => {
      return response.json();
  })
  .then((data) => {

    const options = get_options({ 
        "x_label": "", 
        "y_label": "", 
        "title": "Total No. Nights per City"
    });
    
    get_chart(
        "nights_per_city", 
        "bar", 
        data, 
        options);
  });
//----------------------------- 
// categories
//----------------------------- 

fetch(base_url+'categories.json')
  .then((response) => {
      return response.json();
  })
  .then((data) => {

    const options = get_options({ 
        "x_label": "€", 
        "y_label": "", 
        "title": "Total Spendings by Category"
    });
    
    get_chart(
        "categories", 
        "bar", 
        data, 
        options);
  });

//----------------------------- 
// total spendings by city
//----------------------------- 

fetch(base_url+'total_spendings_by_city.json')
  .then((response) => {
      return response.json();
  })
  .then((data) => {

    const options = get_options({ 
        "x_label": "€", 
        "y_label": "", 
        "title": "Total Spendings by City"
    });
    
    get_chart(
        "cities", 
        "bar", 
        data, 
        options);
  });

//----------------------------- 
// spendings by city per day
//----------------------------- 

fetch(base_url+'city_per_day.json')
  .then((response) => {
      return response.json();
  })
  .then((data) => {

    const options = get_options({ 
        "x_label": "€ / Day", 
        "y_label": "", 
        "title": "Spendings by City per Day"
    });
    
    get_chart(
        "cities_per_day", 
        "bar", 
        data, 
        options);
  });

//----------------------------- 
// timeline
//-----------------------------

fetch(base_url+'timeline_raw_data.json')
  .then((response) => {
      return response.json();
  })
  .then((data) => {

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

    const options = {
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
        options: options
        //plugins: [quadrants]
    });

  });