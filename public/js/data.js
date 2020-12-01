function populatechart(students) {
    var values = [];
    students.forEach(student => {
        values.push(student.score);
    });


    document.getElementById("mean").innerHTML = mean(values);
    document.getElementById("median").innerHTML = median(values);
    document.getElementById("mode").innerHTML = mode(values);

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
    var frequency = {}; // array of frequency.
    var maxFreq = 0; // holds the max frequency.
    var modes = [];

    for (var i in array) {
        frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.

        if (frequency[array[i]] > maxFreq) { // is this frequency > max so far ?
            maxFreq = frequency[array[i]]; // update max.
        }
    }

    for (var k in frequency) {
        if (frequency[k] == maxFreq) {
            modes.push(k);
        }
    }

    return modes;
}