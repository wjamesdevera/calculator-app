const DEFAULT_TEXT_OUTPUT_FONT_SIZE = 96


const textOutput = document.getElementById('output');
const numberButtons = document.querySelectorAll('#number');
const clearButton = document.getElementById('clear');
const operationBtns = document.querySelectorAll('.operation');


let currentOperation = '';
let operationOn = false;

clearButton.onclick = () => clearAll();

function updateTextOutput() {
    const textOutputSize = textOutput.textContent.length;
    let text = textOutput.textContent.replace(/,/g, '');
    console.log(text);
    if (textOutput.textContent === "0") {
        textOutput.textContent = this.value;
    } else if (textOutputSize < 11) {
        text += this.value;
        textOutput.textContent = numberWithCommas(text);
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clearAll() {
    textOutput.textContent = '0';
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
        console.log(currentOperation);
    })
})