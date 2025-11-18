const resultText = document.getElementById("result")

function calcAverage(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    let result = sum / array.length;
    console.log(result);
    resultText.innerText = result;
}

