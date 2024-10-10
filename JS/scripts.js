document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const previousOperationText = document.getElementById('previous-operation');
    const currentOperationText = document.getElementById('current-operation');
    let currentOperation = '';
    let previousOperation = '';
    let operation = undefined;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                appendNumber(button.innerText);
            } else if (button.innerText === 'CE') {
                clearAll();
            } else if (button.innerText === 'C') {
                clear();
            } else if (button.innerText === 'DEL') {
                deleteNumber();
            } else if (button.innerText === '=') {
                calculate();
            } else {
                chooseOperation(button.innerText);
            }
            updateDisplay();
        });
    });

    function appendNumber(number) {
        if (number === '.' && currentOperation.includes('.')) return;
        currentOperation = currentOperation.toString() + number.toString();
    }

    function clearAll() {
        currentOperation = '';
        previousOperation = '';
        operation = undefined;
    }

    function clear() {
        currentOperation = '';
    }

    function deleteNumber() {
        currentOperation = currentOperation.toString().slice(0, -1);
    }

    function chooseOperation(op) {
        if (currentOperation === '') return;
        if (previousOperation !== '') {
            calculate();
        }
        operation = op;
        previousOperation = currentOperation;
        currentOperation = '';
    }

    function calculate() {
        let computation;
        const prev = parseFloat(previousOperation);
        const current = parseFloat(currentOperation);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperation = computation;
        operation = undefined;
        previousOperation = '';
    }

    function updateDisplay() {
        currentOperationText.innerText = currentOperation;
        if (operation != null) {
            previousOperationText.innerText = `${previousOperation} ${operation}`;
        } else {
            previousOperationText.innerText = '';
        }
    }
});
