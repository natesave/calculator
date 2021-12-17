//declares variables to be stored for operations
let operator;
let x;
let y;
let numArray = [0];

//basic math operations
let add = (x, y) => (x + y);
let subtract = (x, y) => (x - y);
let multiply = (x, y) => (x * y);
let divide = (x, y) => (x / y);

const screen = document.querySelector('#calcScreen');
const buttons = document.querySelectorAll('.number');
const oper = document.querySelectorAll('.operator');
const equals = document.querySelector('.equal');
const decimal = document.querySelector('#decimal');
const pos_neg = document.querySelector('#pos_neg');
const clear = document.querySelector('#clear');
const back = document.querySelector('#backspace');

//function below is called when pressing equals sign or a second operator
//function takes in the operator, first number (x) and second number (y)
function operate(operator, x, y) {
    if(operator === '+') {
        screen.textContent = add(x, y);
        return add(x, y);
    } else if (operator === '-') {
        screen.textContent = subtract(x, y);
        return subtract(x, y);
    } else if (operator === '*') {
        screen.textContent = multiply(x, y);
        return multiply(x, y);
    } else if (operator === '/') {
        screen.textContent = divide(x, y);
        return divide(x, y);
    };
};

function findY() {
    if (x != undefined) { //if there is an existing value for x, the array will be y
        y = +numArray.join('');
    };
};

function findX() {
    if (x == undefined || x == '') { //if there is no previous x, new array will be x
        x = +numArray.join('');
    } else if (x != undefined && y != undefined) { //if there was a previously clicked operation, new x will be the result of the operation
        x = operate(operator, x, y);
        return x;
    };
};

function equalsSign() { //checks if x and y are defined for operation
    if (x == undefined || x == '' || y == '' ) {
        screen.textContent = 'ERROR';
    } else {
        return operate(operator, x, y);
    };
};

function addDecimal() {
    if (numArray.indexOf('.') > -1) { //doesn't allow for multiple decimal points
        screen.textContent = +numArray.join('');
        return numArray;
    } else if (numArray.length == 0) { //if the number array is empty, it will add a 0 then a decimal point
        numArray.push(0);
        numArray.push('.');
        screen.textContent = +numArray.join('') + '.';
        return numArray;
    } else {
        numArray.push('.');
        screen.textContent = +numArray.join('') + '.';
        return numArray;
    };
};

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        numArray.push(Number(button.id)); //adds the number clicked on the calculator to the numArray
        screen.textContent = +numArray.join(''); //displays the number on the calculator screen
        findY();
    });
}); 

oper.forEach((sign) => {
    sign.addEventListener('click', () => {
        findX();
        findY();
        operator = '';
        operator = sign.textContent; //stores operator chosen to be used in the operator function
        numArray = []; //resets array to receive new number (y)
    });
});

equals.addEventListener('click', () => {
    y = +numArray.join('');
    equalsSign();
});

clear.addEventListener('click', () => {
    numArray = [];
    x = '';
    y = '';
    operator = undefined;
    screen.textContent = 0;
});

decimal.addEventListener('click', () => {
    addDecimal();
});

//order 1. add round numbers up 2. limit screen numbers to 11 3. add negative 4. add backspace
