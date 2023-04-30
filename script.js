const textOutput = document.getElementById('output');
const numberButtons = document.querySelectorAll('#number');
const clearButton = document.getElementById('clear');

clearButton.onclick = () => clearAll();

function updateTextOutput() {
    if (textOutput.textContent === "0") {
        textOutput.textContent = this.value; 
    } else {
        textOutput.textContent += this.value;
    }
}

function clearAll() {
    textOutput.textContent = '0';
}
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', updateTextOutput);
})