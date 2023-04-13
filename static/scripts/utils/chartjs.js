
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
            //label: 'My Dataset',
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

function get_config(
    type, 
    data, 
    params) 
{
    // types: 
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

function get_chart(
    id, 
    type, 
    data, 
    params)
{
    const config = get_config(type, data, params);
    
    return new Chart(id, config);
}