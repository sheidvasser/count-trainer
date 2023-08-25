let minimum = document.querySelector('#minimum');
let maximum = document.querySelector('#maximum');
let select = document.querySelector('#select');
let TaskAmount = document.querySelector('#amount');
let button = document.querySelector('.button');
let taskWrapper = document.querySelector('.tasks');
let submitBtnWrapper = document.querySelector('.submit');

// Поля для более простого доступа к мин и макс значениям, текущему количеству повторов и к проверке результата решения примера.
let CurrentAmount;
let minimumN;
let maximumN;
let Result;

function GenerateBtnClick() {
    CurrentAmount = 0;
    Result = "";
    minimumN = Number(minimum.value);
    maximumN = Number(maximum.value);
    let sign = select.options[select.selectedIndex].text;
    if(minimumN != 0 && maximumN != 0 && minimumN <= maximumN) { TaskGenerate(minimumN, maximumN, sign); }
}

// Cобытие клика на кнопку Generate
button.addEventListener('click', () => {
    GenerateBtnClick();
})

// Событие нажатия сочетания клавиш Ctrl + Enter
document.addEventListener('keydown', function(event) {
    if (event.code == 'Enter' && (event.ctrlKey || event.metaKey)) {
        GenerateBtnClick();
    }
});  

// Функция, которая перестраивает шаблон с примером, полем ввода ответа и сообщением о выполнении примера
function FormGenerate(){
    taskWrapper.innerHTML = `
        <div class="tasks__wrapper">
            <p>Task №${CurrentAmount + 1}<p>
            <label class="tasks__item" for="tasksInput">${localStorage.num1} ${select.options[select.selectedIndex].text} ${localStorage.num2 < 0 ? '(' : ''} ${localStorage.num2} ${localStorage.num2 < 0 ? ')' : ''} = <label>
            <input type="number" id="tasksInput" class="tasks__input" placeholder="Answer">
            <div class="checking"><p>${Result}<p></div>
        </div>
        `;
    document.querySelector('.tasks__input').focus();
    submitBtnWrapper.innerHTML = '<button class="submit__button">checkout<br><br><span class="emphasized">enter<span></button>';
}

// Функция, которая генерирует примеры
function TaskGenerate(min, max, sign){
    localStorage.num1 = Math.floor(Math.random() * (max + 1 - min) + min);
    localStorage.num2 = Math.floor(Math.random() * (max + 1 - min) + min);
    FormGenerate();
}

function CheckoutBtnClick() {
    let UserInput = Number(document.querySelector('.tasks__input').value);
    let sign = select.options[select.selectedIndex].text;
    CheckAnswer(UserInput, sign);
}

// Событие на клик по кнопке проверки решения примера
submitBtnWrapper.addEventListener('click', ()=>{
    CheckoutBtnClick()
})

// Событие на нажатие клавиши Enter для проверки примера
document.addEventListener('keydown', function(event) {
    if ((event.code == 'Enter' && (!event.ctrlKey)) && (event.code == 'Enter' && (!event.metaKey))) {
        let isThereInput = document.getElementById('tasksInput')
        if (document.getElementById('tasks').contains(isThereInput)) {
            CheckoutBtnClick();
        }
    }
});

// Функция, которая проверяет правильно ли решен пример.
function CheckAnswer(UserAnswer, Sign){
    let RightAnswer;
    switch(Sign){
        case '+': RightAnswer = Number(localStorage.num1) + Number(localStorage.num2); break;
        case '-': RightAnswer = localStorage.num1 - localStorage.num2; break;
        case '*': RightAnswer = localStorage.num1 * localStorage.num2; break;
        case '/': RightAnswer = localStorage.num1 / localStorage.num2; 
                  RightAnswer = RightAnswer.toFixed(2); break;
    }

    if (RightAnswer == UserAnswer) {
        Result = 'Right';
    } else if (document.querySelector('.tasks__input').value == '') {
        Result = 'Enter your answer';
    } else {
        Result = 'Mistake';
    }

    FormGenerate();
    
    if (TaskAmount.value - 1 > CurrentAmount) {
        if (Result == 'Right'){
            CurrentAmount += 1;
            TaskGenerate(minimumN, maximumN, Sign);
        }
    }
    else {
        if (Result == 'Right') {
            taskWrapper.innerHTML = ``;
            submitBtnWrapper.innerHTML = '';
        } else {
            CurrentAmount += 0;
        }
    }
}