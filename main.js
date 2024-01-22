const buttonsElements = document.querySelectorAll('[data-button]');
const screenNumber = document.getElementById('screen');
const lilScreenNumber = document.getElementById('lil-screen');

const maxNumberLength = 10;

let buttons = [];
let actualNumber = '';
let lastNumber = '';
let calcType = '';
let isResult = false;

buttonsElements.forEach(button => button.addEventListener('click', () => {buttonClicked(button.dataset.button)}));

function buttonClicked(btn) {
    if(!isNaN(btn) || (btn === '.' && actualNumber !== '' && String(actualNumber).split('').filter(n => n === '.').length === 0)) {
        if(isResult) {
            actualNumber = btn;
            lastNumber = '';
            calcType = '';
            isResult = false;
            lilScreenNumber.innerHTML = '';
        } else {
            actualNumber += String(btn);
        }
    }
    if(['+', '-', '*', '/'].includes(btn)) {
        if(calcType !== '' && lastNumber !== '' && actualNumber !== '') {
            actualNumber = eval(`${lastNumber} ${calcType} ${actualNumber}`);
        }
        if(isResult) {
            lastNumber = screenNumber.innerHTML;
            actualNumber = '';
            isResult = false;
        }
        calcType = btn;
        lastNumber = actualNumber !== '' ? actualNumber : lastNumber;
        actualNumber = '';

        lilScreenNumber.innerHTML = `${lastNumber.length > maxNumberLength ? lastNumber.substring(lastNumber.length-maxNumberLength, lastNumber.length) + '…' : lastNumber} ${calcType}`;
    }
    if(btn === '=' && (lastNumber !== '' && calcType !== '' && actualNumber !== '')) {
        isResult = true;
        lilScreenNumber.innerHTML = `${lastNumber.length > maxNumberLength ? lastNumber.substring(lastNumber.length-maxNumberLength, lastNumber.length) + '…' : lastNumber} ${calcType} ${actualNumber.length > maxNumberLength ? actualNumber.substring(actualNumber.length-maxNumberLength, actualNumber.length) : actualNumber}`;
        actualNumber = eval(`${lastNumber} ${calcType} ${actualNumber}`);
    }
    if(btn === '<') {
        actualNumber = actualNumber.split('');
        actualNumber.pop();
        actualNumber = actualNumber.join('');
        
    }
    if(btn === '%') {
        actualNumber *= .01;
    }
    if(btn === '+/-') {
        actualNumber *= -1;
    }
    if(btn === 'C') {
        actualNumber = '';
        calcType = '';
        lastNumber = '';
        lilScreenNumber.innerHTML = '';
    }

    screenNumber.innerHTML = actualNumber;

    let screenLength = screenNumber.innerHTML.length;

    screenNumber.innerHTML = screenLength > maxNumberLength ?
    screenNumber.innerHTML = screenNumber.innerHTML.substring(screenLength-maxNumberLength, screenLength) + '…' :
    actualNumber;
}