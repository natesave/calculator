let add = (x, y) => x + y;
let subtract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide =  (x, y) => x / y;

function operate(operator, x, y) {
    if(operator === "+") {
        return add(x, y);
    } else if (operator === "-") {
        return subtract(x, y);
    } else if (operator === "*") {
        return multiply(x, y);
    } else if (operator === "/") {
        return divide(x, y);
    } else {
        return "Not valid inputs."
    }
}
