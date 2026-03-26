let historyDisplay = document.getElementById('history');
let currentDisplay = document.getElementById('current');

let currentOperand = '';
let previousOperand = '';
let currentOperation = null;

function updateDisplay() {
    currentDisplay.innerText = currentOperand === '' ? '0' : currentOperand;
    if (currentOperation != null) {
        historyDisplay.innerText = `${previousOperand} ${currentOperation}`;
    } else {
        historyDisplay.innerText = '';
    }
}

function clearAll() {
    currentOperand = '';
    previousOperand = '';
    currentOperation = null;
    updateDisplay();
}

function deleteLast() {
    if (currentOperand === '') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperand === '' && previousOperand !== '') {
        currentOperation = operator;
        updateDisplay();
        return;
    }
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    currentOperation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (currentOperation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '÷':
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clearAll();
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    // Format number to avoid long decimals
    currentOperand = Math.round(computation * 100000000) / 100000000;
    currentOperation = null;
    previousOperand = '';
    
    // Convert to string to prevent issues
    currentOperand = currentOperand.toString();
    updateDisplay();
}
