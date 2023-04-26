let operator = '';
let previousValue = '';
let currentValue = '';
let resultOperation = '';
let lastOperation = '';



// Store components oof the DOM in our JS

document.addEventListener("DOMContentLoaded", function(){
    let clear = document.getElementById('clear')
    let allClear = document.getElementById('allClear')
    let equal = document.querySelector(".equal")
    let decimal = document.querySelector(".decimal")

    let numbers = document.querySelectorAll(".nums")
    let operators = document.querySelectorAll(".operator")

    let topScreen = document.querySelector(".topScreen")
    let result = document.querySelector(".result")
    let audio = document.querySelector('#audio')
    audio.volume = 0.01;
    let maxVolume = 0.05;
    

    numbers.forEach((number) => number.addEventListener('click', function(e){
        clickBtn(e.target.textContent)
        topScreen.textContent = previousValue + operator + currentValue;
    }))

    operators.forEach((op) => op.addEventListener('click', function(e){
        operatorBtn(e.target.textContent)
        topScreen.textContent = previousValue + operator;
        
    }))

    allClear.addEventListener('click', function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        topScreen.textContent = currentValue
        result.textContent = currentValue
    })

    clear.addEventListener('click', function(){
        if (currentValue.length > 0) {
            currentValue = currentValue.slice(0, -1);
            if (operator) {
                topScreen.textContent = previousValue + operator + currentValue;
            } else {
                topScreen.textContent = currentValue;
            }
        }
    });

    equal.addEventListener('click', function(){
        operation()
        result.textContent = resultOperation;
        if(resultOperation.length <= 12) {
            result.textContent = resultOperation;
        } else {
            result.textContent = result.textContent.slice(0,12);
        }
        if (result.textContent === "181223") {
            audio.currentTime = 0;
            audio.play();
        }
        let interval = setInterval(function() {
            if (audio.volume < maxVolume) {
                audio.volume += 0.001;
            } else {
                clearInterval(interval);
            }
        }, 10);
    })

    decimal.addEventListener('click', function(){
        addDecimal()
    })
})

function clickBtn(num){
    if(currentValue.length <= 5){
        currentValue += num;
    }
}

function operatorBtn(op){
    if(operator.length === 0){
        previousValue = currentValue;
        currentValue = '';
        operator += op;
    }
}



function operation() {

    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    if(operator === "+") {
        return resultOperation = previousValue + currentValue;
    } else if(operator === "-") {
        return resultOperation = previousValue - currentValue;
    } else if(operator === "×") {
        return resultOperation = previousValue * currentValue;
    } else {
        return resultOperation = previousValue / currentValue;
    }
    previousValue = round(previousValue)
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}
//  Round numbers
function round(num) {
    return Math.round(num * 1000) / 1000;
}


function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
}



