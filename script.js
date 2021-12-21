//declares variables to be stored for operations
let numArray = [];
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
    if (numArray.includes('-') == true) { //if there already is a negative sign in number, remove it
        numArray.shift('-');
        screen.textContent = numArray.join('');
    } else if (screen.textContent == '0' || screen.textContent == '' || numArray.length == 0) { //adds negative even if no numbers were pressed
        numArray.unshift('-');
        screen.textContent = numArray.join('');
    } else if (numArray.join('') > 0) { //if a number was clicked and it's positive, make it negative 
        numArray.unshift('-');
        screen.textContent = numArray.join('');
    } else if (numArray.join('') < 0) { //if a number was clicked and it's negative, make it positive
        numArray.shift('-');
        screen.textCotent = numArray.join('');
    };
};

function backspace() {
    if (numArray.length > 0) {
        numArray.pop();
        screen.textContent = numArray.join('');
    };
};

//the code below are for event listeners for each button
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
    posOrNeg();
});

back.addEventListener('click', () => {
    backspace();
});

//the code below is for keyboard support
document.addEventListener("keydown", (event) => {
    console.log(event.key)
    document.getElementById('+').blur();
    document.getElementById('-').blur();   
    document.getElementById('*').blur();  
    document.getElementById('/').blur();  
    if (event.key == '1') {
        document.getElementById('1').click();
    } 
    if (event.key == '2') {
        document.getElementById('2').click();
    } 
    if (event.key == '3') {
        document.getElementById('3').click();
    } 
    if (event.key == '4') {
        document.getElementById('4').click();
    } 
    if (event.key == '5') {
        document.getElementById('5').click();
    } 
    if (event.key == '6') {
        document.getElementById('6').click();
    } 
    if (event.key == '7') {
        document.getElementById('7').click();
    } 
    if (event.key == '8') {
        document.getElementById('8').click();
    } 
    if (event.key == '9') {
        document.getElementById('9').click();
    } 
    if (event.key == '0') {
        document.getElementById('0').click();
    } 
    if (event.key == '+') {
        document.getElementById('+').click();
        document.getElementById('+').focus();   
    }
    if (event.key == '-') {
        document.getElementById('-').click();
        document.getElementById('-').focus(); 
    }
    if (event.key == '*') {
        document.getElementById('*').click();
        document.getElementById('*').focus();
    }
    if (event.key == '/') {
        document.getElementById('/').click();
        document.getElementById('/').focus();
    }
    if (event.key == 'Enter' || event.key == '=') {
        document.getElementById('=').click();
    }
    if (event.key == '.') {
        document.getElementById('decimal').click();
    }
    if (event.key == 'Backspace' || event.key == 'Delete') {
        document.getElementById('backspace').click();
    }
    if (event.key == 'Escape') {
        document.getElementById('clear').click();
    }
});