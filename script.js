//declares variables to be stored for operations
let operator;
let x;
let y;
let numArray = [];

//basic math operations
let add = (x, y) => x + y;
let subtract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide = (x, y) => x / y;

//function called when pressing equals sign or a second operator
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

const screen = document.querySelector('#calcScreen');
const buttons = document.querySelectorAll('.number');
const oper = document.querySelectorAll('.operator')
const equals = document.querySelector('.equal')
const clear = document.querySelector('#clear')

buttons.forEach((button) => { //links number buttons for actions
    button.addEventListener('click', () => {
        numArray.push(Number(button.id)); //adds the number clicked on the calculator to the numArray
        screen.textContent = +numArray.join(''); //displays the number on the calculator screen
        findY();
    });
}); 

oper.forEach((sign) => { //links operator buttons for actions
    sign.addEventListener('click', () => {
        findX();
        findY();
        operator = '';
        operator = sign.textContent; //stores operator chosen to be used in the operator function
        numArray = []; //resets array to receive new number (y)
    });
});

equals.addEventListener('click', () => { //links equal sign button for operating
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