const textOutput = document.getElementById('output');
const numberButtons = document.querySelectorAll('#number');

function updateTextOutput(e) {
    if (textOutput.textContent === "0") {
        textOutput.textContent = e.target.value
    } else {
        textOutput.textContent += e.target.value;
    }
}
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', (e) => updateTextOutput(e));
})