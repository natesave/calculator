let operator;
let x;
let y;
let xArray = [];
let yArray = [];

//basic math functions
let add = (x, y) => x + y;
let subtract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide = (x, y) => x / y;

//function called when pressing equals sign, taking in the operator, first number (x) and second number (y)
function operate(operator, x, y) {
    if(operator === '+') {
        return add(x, y);
    } else if (operator === '-') {
        return subtract(x, y);
    } else if (operator === '*') {
        return multiply(x, y);
    } else if (operator === '/') {
        return divide(x, y);
    };
};

const screen = document.querySelector('#calcScreen');
const buttons = document.querySelectorAll('.number');
const oper = document.querySelectorAll('.operator')
const equals = document.querySelector('.equal')

buttons.forEach((button) => { //linking number buttons for actions
    button.addEventListener('click', () => {
        xArray.push(Number(button.id)); //adds the number clicked on the calculator to the xArray
        screen.textContent = +xArray.join(''); //displays the number on the calculator screen
    });
});

oper.forEach((sign) => { //linking operator buttons for actions
    sign.addEventListener('click', () => {
    operator = sign.textContent; //holds  operator chosen to be used later in the operator function
    x = +xArray.join(''); //holds number to be used later in the operate function
    console.log(operator);
    console.log(x);
    });
});

equals.addEventListener('click', () => { //linking equal button for operating
    operate(operator, x, y);
});
