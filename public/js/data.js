function populatechart(students) {
    var values = [];
    // var labels = [];
    students.forEach(student => {
        values.push(student.score);
        // labels.push(student.name);
    });


    document.getElementById("mean").innerHTML = mean(values);
    document.getElementById("median").innerHTML = median(values);
    document.getElementById("mode").innerHTML = mode(values);
    graphChart(values, median(values), mean(values), mode(values));

}

function mean(values) {
    //Work out the sum of the numbers in our array
    var totalSum = 0;
    for (var i in values) {
        totalSum += values[i];
    }
    //Work out how many numbers are in our array.
    var numsCnt = values.length;

    //Finally, get the average.
    var average = totalSum / numsCnt;
    return average.toFixed(2);
}

function median(values) {
    const arrSort = values.sort();
    const len = values.length;
    const mid = Math.ceil(len / 2);

    const median =
        len % 2 == 0 ? (values[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
    return median
}

function mode(array) {
    var frequency = {};
    var maxFreq = 0;
    var scoresMode = [];

    for (var i in array) {
        frequency[array[i]] = (frequency[array[i]] || 0) + 1;

        if (frequency[array[i]] > maxFreq) {
            maxFreq = frequency[array[i]];
        }
    }

    for (var j in frequency) {
        if (frequency[j] == maxFreq) {
            scoresMode.push(j);
        }
    }

    return scoresMode;
}


//GRAPH
function graphChart(values) {

    var summaryLabels = ['Mean', 'Median'];
    var summaryStats = {
        mean: mean(values),
        mode: mode(values),
        median: median(values)
    }

    var summaryCTX = document.getElementById('summaryChart').getContext('2d');
    var statisticsChart = new Chart(summaryCTX, {
        type: 'bar',
        data: {
            labels: summaryLabels,
            datasets: [{
                borderWidth: 1,
                label: 'Statistics',
                data: [summaryStats.mean, summaryStats.median],
                borderColor: 'rgba(0, 0, 0, .2)',
                backgroundColor: '#000',
                backgroundColor: [
                    'rgba(233, 114, 77, 1)',
                    'rgba(220, 215, 39, 1)'
                ]

            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
    const modeCTX = document.getElementById('modeSummaryChart').getContext('2d');
    var modeChart = new Chart(modeCTX, {
        type: 'bar',
        data: {
            labels: summaryStats.mode,
            datasets: [{
                label: 'Mode Statistics',
                data: summaryStats.mode,
                backgroundColor: 'rgba(48, 25, 52, 1)',
                borderColor: 'rgba(0, 0, 0, .2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });

}