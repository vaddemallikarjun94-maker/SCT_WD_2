const display = document.getElementById("display");
const equalBtn = document.getElementById("equal");

// Input Parsing
function appendValue(value) {
    display.value += value;
}

// Clear Display
function clearDisplay() {
    display.value = "";
}

// Delete Last Character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate Result
function calculate() {
    try {
        let expression = display.value;

        // Parse Input
        expression = expression.replace(/÷/g, "/");
        expression = expression.replace(/×/g, "*");

        if (expression.trim() === "") {
            throw new Error("Empty Input");
        }

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!isFinite(result)) {
            throw new Error("Invalid Calculation");
        }

        display.value = result;

    } catch (error) {
        display.value = "Error";

        setTimeout(() => {
            display.value = "";
        }, 1500);
    }
}

// Equal Button Event Listener
equalBtn.addEventListener("click", calculate);

// Keyboard Input Handling
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (!isNaN(key)) {
        appendValue(key);
    }

    else if (["+", "-", "*", "/", "%", "."].includes(key)) {
        appendValue(key);
    }

    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }
});
