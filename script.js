
const textOutput = document.getElementById('output');
const numberButtons = document.querySelectorAll('#number');
const clearButton = document.getElementById('clear');
const operationBtns = document.querySelectorAll('.operation');
const equalBtn = document.getElementById('equal');
const decimalPoint = document.getElementById('decimalPoint');
const percentButton = document.getElementById('percent');
const negetiveButton = document.getElementById('plus-minus');


let currentOperation = '';
let operationOn = false;
let firstValue = 0;
let nextValue = 0;

clearButton.onclick = () => clearAll();
decimalPoint.onclick = () => addDecimal();
percentButton.onclick = () => percentNumber();
negetiveButton.onclick = () => negativeSwap();

function updateTextOutput() {
    const textOutputSize = textOutput.textContent.length;
    let text = textOutput.textContent.replace(/,/g, '');
    checkClearCheckBox();
    changeClearButton();
    if (textOutput.textContent === "0") {
        textOutput.textContent = this.value;
    } else if (textOutputSize < 11) {
        text += this.value;
        textOutput.textContent = numberWithCommas(text);
    }
}

function percentNumber() {
    text = textOutput.textContent.replace(/,/g, '');
    textOutput.textContent = numberWithCommas(percent(text));
}

function negativeSwap() {
    text = textOutput.textContent.replace(/,/g, '');
    textOutput.textContent = numberWithCommas(negative(text));
}

function addDecimal() {
    if (textOutput.textContent.includes('.')) {
        return;
    }
    textOutput.textContent += '.';
}

function changeClearButton() {
    clearButton.textContent = 'C';
}

function resetClearButton() {
    clearButton.textContent = 'AC';
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clearAll() {
    resetClearButton();
    clearPressedOperation();
    textOutput.textContent = '0';
}

function checkClearCheckBox() {
    if (operationOn) {
        firstValue = textOutput.textContent.replace(/,/g, '');
        textOutput.textContent = '0';
        operationOn = false;
    }
}

function clearPressedOperation() {
    operationBtns.forEach(operationBtn => {
        operationBtn.classList.remove('orange-pressed');
    })
}

function checkOperation() {
    let isOn = false;
    operationBtns.forEach(operationBtn => {
        if (operationBtn.classList.contains('orange-pressed')) {
            isOn = true;
        }
    })
    operationOn = isOn;
}


numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', updateTextOutput);
})



operationBtns.forEach(operationBtn => {
    operationBtn.addEventListener('click', () => {
        operationBtns.forEach(checkButton => {
            if (checkButton !== operationBtn) {
                checkButton.classList.remove('orange-pressed');
            }
        })
        operationBtn.classList.toggle('orange-pressed');
        currentOperation = operationBtn.value;
        checkOperation();
    })
})


function compute() {
    resetClearButton();
    checkOperation();
    console.log(operationOn);
    let result = 0;
    if (!operationOn) {
        return;
    }
    clearPressedOperation();

    nextValue = textOutput.textContent.replace(/,/g, '');

    switch(currentOperation) {
        case '+':
            result = add(firstValue, nextValue);
            break;
        case '-':
            result = subtract(firstValue, nextValue);
            break;
        case '*':
            result = multiply(firstValue, nextValue);
            break;
        case '/':
            result = divide(firstValue, nextValue);
            break;
        default:
            break;
    }
    firstValue = result;
    textOutput.textContent = numberWithCommas(result);
}

equalBtn.addEventListener('click', () => {compute()});

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

function percent(n) {
    return Number(n) / 100;
}

function negative(n) {
    const x = Number(n);
    if (x < 0) {
        return x + (x * -2);
    }
    return x - (x * 2);
}