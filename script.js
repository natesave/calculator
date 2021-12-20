//declares variables to be stored for operations
let numArray = [0];
let x;
let y;
let operator;
let z;

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
        let num = add(x, y);
        let z = checkResultSize(num);
        screen.textContent = z;
        operator = '';
        return z;
    } else if (operator === '-') {
        let num = subtract(x, y);
        let z = checkResultSize(num);
        screen.textContent = z;
        operator = '';
        return z;
    } else if (operator === '*') {
        let num = multiply(x, y);
        let z = checkResultSize(num);
        screen.textContent = z;
        operator = '';
        return z;
    } else if (operator === '/') {        
        let num = divide(x, y);
        let z = checkResultSize(num);
        screen.textContent = z;
        operator = '';
        return z;
    };
};

function checkArraySize(arr) { //limits the size of number clicked so that there is no overflow on the display
    if (arr.length > 11) {
        numArray = arr.slice(0, 11);
        return arr;
    };
};

function checkResultSize(num) { //limits the size of the result of an operation so that there is no overflow on the display
    if (num.toString().length > 11) {
        let noDec = num.toFixed(); //finds how many digits before decimal point
        let dec = 11 - (noDec.toString().length) //allows for specific number of decimal points according to how many digits
        return num.toFixed(dec);
    } else {
        return num;
    };
};

function findX() {
    if (x == undefined || x == '') { //if there is no previous x, new array will be x
        x = +numArray.join('');
        return x;
    } else if (x != undefined && y != undefined) { //for a previously clicked operation, the result of the operation will be the next x
        x = operate(operator, x, y);
        return x;
    };
};

function findY() {
    if (x != undefined) { //only finds y if there is an existing value for x
        y = +numArray.join('');
    };
};

function checkOperation() {
    if (x == undefined) {
        x = +numArray.join('');
        numArray = [];
    } else if (x != undefined && numArray.length > 0) {
        y = +numArray.join('');
        x = operate(operator, x, y);
        numArray = [];
    };
};

function equalsSign() { //checks if x and y are defined for operation
    if (x == undefined || typeof y != 'number' || y == 0) {
        screen.textContent = 'ERROR';
    } else {
        screen.textContent = operate(operator, x, y);
        x = operate(operator, x, y);
        numArray = [];
        operator = undefined;
        return x;
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

function posOrNeg() {
    if (x == undefined && y == undefined || x == '' && y == '') {
        numArray.unshift('-');
        screen.textContent *= -1;
    } else if (x != undefined && x != '' && y == undefined || x != undefined && x != '' && y == '') {
        if (numArray.length > 0) {
            numArray.unshift('-');
            screen.textContent *= -1;
        } else if (numArray.length == 0) {
            numArray.unshift('-');
            screen.textContent = '-0';
        };
    };
};

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        checkArraySize(numArray);
        numArray.push(Number(button.id)); //adds the number clicked on the calculator to numArray
        screen.textContent = +numArray.join(''); //displays the number on the calculator screen
    });
}); 

oper.forEach((sign) => {
    sign.addEventListener('click', () => {
        checkOperation();
        operator = sign.textContent;
    });
});

equals.addEventListener('click', () => {
    findY();
    equalsSign();
});

clear.addEventListener('click', () => {
    numArray = [];
    x = undefined;
    y = undefined;
    operator = undefined;
    screen.textContent = 0;
});

decimal.addEventListener('click', () => {
    addDecimal();
});

pos_neg.addEventListener('click', () => {
    console.log(numArray.length);
    posOrNeg();
});

// things to add:
// add backspace
// add keyboard support
