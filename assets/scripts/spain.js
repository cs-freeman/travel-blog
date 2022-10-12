var grey = "#6c757d";

// Nights

var xValues = [ "Plama", 
                "Barcelona", 
                "Madrid", 
                "Valencia" ];

var yValues = [ 4, 
                12, 
                4, 
                4 ];

//var barColors = ["red", 
//				"green", 
//				"blue", 
//				"orange"];

const night_data = {
        labels: xValues,
        datasets: [{
            backgroundColor: grey,
            data: yValues
        }]
    };

//const night_config = 

new Chart("accommodation", {
    //type: "doughnut",
    type: "bar",
    data: night_data,
    options: {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: "Total No. Nights per City", 
                    font: {
                        size: 20
                    }
                }, 
                legend: {
                    display: false
                }
            },
            scales: {
                yAxes: {
                    ticks: {
                        autoSkip: false
                    }
            }
            }
        }
    });

// timeline

const labels = [
    "04/07", 
    "05/07", 
    "06/07", 
    "07/07", 
    "08/07", 
    "09/07", 
    "10/07", 
    "11/07", 
    "12/07", 
    "13/07", 
    "14/07", 
    "15/07", 
    "16/07", 
    "17/07", 
    "18/07", 
    "19/07", 
    "20/07", 
    "21/07", 
    "22/07", 
    "23/07", 
    "24/07", 
    "25/07", 
    "26/07", 
    "27/07", 
    "28/07", 
    "29/07"
];

timeline_data = [
    72.18, 
    87.698, 
    106.35, 
    173.03, 
    18.09, 
    144.948, 
    25, 
    160.522, 
    37.04, 
    103.5, 
    99, 
    62.35, 
    79.4, 
    35.8, 
    35.25, 
    87.65, 
    44.85, 
    52.27, 
    49.37, 
    90.968, 
    25.1, 
    22.65, 
    48.88, 
    106.484, 
    25.93, 
    20.108
];

// cumulative sum
// https://stackoverflow.com/questions/20477177/creating-an-array-of-cumulative-sum-in-javascript
const cumsum = (sum => value => sum += value)(0);
timeline_data = timeline_data.map(cumsum);

const timeline_data_obj = {
    labels: labels,
    datasets: [{
        //label: 'My First dataset',
        backgroundColor: "rgba(0, 0, 0, 0.05)", //"#FF0000",
        fill: true,
        //fillColor : "rgba(255, 255, 255, 0.5)", //"#ff0000",
        borderColor: grey, //'rgb(255, 99, 132)',
        data: timeline_data,
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

const config = {
    type: 'line',
    data: timeline_data_obj,
    options: {
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
            quadrants: {
                    topLeft: "#ff0000", //Utils.CHART_COLORS.red,
                    topRight: "#0000ff", //Utils.CHART_COLORS.blue,
                    bottomRight: "#00ff00", //Utils.CHART_COLORS.green,
                    bottomLeft: grey, //Utils.CHART_COLORS.yellow,
            }
        }
    }, 
    //plugins: [quadrants]
};

const myChart = new Chart(
    document.getElementById('timeline'),
    config
);

// categories

var xValues = [ "Accommodation", 
                "Food and Drinks", 
                "Transportation", 
                "Entertainment", 
                "Miscellaneous" ];

var yValues = [ 682.740, 
                459.496, 
                394.762, 
                200.400, 
                77.020 ];

/*var barColors = ["red", 
                    "green", 
                    "blue", 
                    "orange", 
                    "brown"];*/

const categories_data = {
        labels: xValues,
        datasets: [{
            backgroundColor: grey,
            data: yValues
        }]
    };

new Chart("categories", {
    //type: "pie",
    //type: "doughnut",
    type: "bar",
    data: categories_data,
    options: {
        indexAxis: 'y',
        scales: {
            xAxes: {
                title: {
                    display: true,
                    text: "€",
                    font: {
                        size: 15
                    }
                }
            }, 
            yAxes: {
                ticks: {
                    autoSkip: false
                }
            }
        }, 
        plugins: {
            title: {
                display: true,
                text: "Total Spendings by Category", 
                font: {
                    size: 20
                }
            }, 
            legend: {
                display: false
            }
            }
        }
    });

// total spendings by city

var xValues = [ "Barcelona", 
            "Plama", 
            "Madrid", 
            "Valencia", 
            "UK",
            //"Flights" 
            ];

var yValues = [ 909.84, 
            284.41, 
            163.97, 
            134.01,
            47.856,
            //197.364 
            ];

const city_data = {
    labels: xValues,
    datasets: [{
        backgroundColor: grey,
        data: yValues
    }]
};

//const city_config = 

new Chart("cities", {
//type: "doughnut",
type: "bar",
data: city_data,
options: {
        indexAxis: 'y',
        plugins: {
            title: {
                display: true,
                text: "Total Spendings by City", 
                font: {
                    size: 20
                }
            }, 
            legend: {
                display: false
            }
        },
        scales: {
            /*yAxes: {
                title: {
                    display: true,
                    text: "yAxisTitle",
                    font: {
                        size: 15
                    }
                },
                ticks: {
                    precision: 0
                }
            },*/
            xAxes: {
                title: {
                    display: true,
                    text: "€",
                    font: {
                        size: 15
                    }
                }
            }, 
            yAxes: {
                ticks: {
                    autoSkip: false
                }
            }
        }
    }
});

// spendings by city per day

var xValues = [ "Barcelona", 
            "Plama", 
            "Madrid", 
            "Valencia", 
            "UK",
            ];

var yValues = [ 113.73, 
            71.1025, 
            40.9925, 
            33.5025,
            23.928,
            ];

const city_per_day_data = {
    labels: xValues,
    datasets: [{
        backgroundColor: grey,
        data: yValues
    }]
};

//const city_config = 

new Chart("cities_per_day", {
//type: "doughnut",
type: "bar",
data: city_per_day_data,
options: {
        indexAxis: 'y',
        plugins: {
            title: {
                display: true,
                text: "Spendings by City per Day", 
                font: {
                    size: 20
                }
            }, 
            legend: {
                display: false
            }
        },
        scales: {
            xAxes: {
                title: {
                    display: true,
                    text: "€ / Day",
                    font: {
                        size: 15
                    }
                }
            }, 
            yAxes: {
                ticks: {
                    autoSkip: false
                }
            }
        }
    }
});