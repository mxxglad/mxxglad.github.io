exchangeRate(); // тут я вызываю асинхронную функцию, которая читает API и делает всякое другое после

const selectFirst = document.querySelector('.currency-1'); //просто записываю нужные элементы страницы в переменные
const selectSecond = document.querySelector('.currency-2');

const buttonSwap = document.querySelector('.swap');

const input = document.querySelector('.input-value');
const display = document.querySelector('.display-value');

async function exchangeRate() {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'); // три строчки обработки апи
    const data = await response.json();

    //далее делаю массив из апи в алфавитном порядке по названию валюты (а было по коду)
    let arrayCurrencyName = [];
    for (let i = 0; i < data.length; i++) {
        arrayCurrencyName.push(data[i].txt);
    }
    arrayCurrencyName.sort();

    let arrayCurrencyCode = [];
    for (let i = 0; i < data.length; i++) {
        arrayCurrencyCode.push(data[i].cc);
    }

    let arrayCurrencyRate = [];
    for (let i = 0; i < arrayCurrencyName.length; i++) {
        arrayCurrencyRate.push(data[i].rate);
    }
    
    arrayCurrencyName.push('Гривня');
    arrayCurrencyCode.push('UAH');
    arrayCurrencyRate.push('1');


    for (let i = 0; i < data.length; i++) {
        let ind = arrayCurrencyName.indexOf(data[i].txt); //в переменную записываю индекс элемента из алфавитного массива, который равняется первому(а потом и не первому) элементу валюты из апи
        arrayCurrencyCode[ind] = arrayCurrencyCode[0 + i]; //тут перемещаю этот код элемента с таким индексом в начало массива кодов
    }

    for (let i = 0; i < data.length; i++) {
        let ind = arrayCurrencyName.indexOf(data[i].txt);
        arrayCurrencyRate[ind] = arrayCurrencyRate[0 + i];
    }



    //тут заполняю селекты 
    for (let i = 0; i < arrayCurrencyName.length; i++) {
        var option = document.createElement('option');
        option.className = 'option';
        option.innerText = arrayCurrencyName[i];
        option.value = arrayCurrencyCode[i];
        selectFirst.appendChild(option);
    }
    
    // ставлю гривну первой в первом селекте
    let options = selectFirst.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === "UAH") {
            options[i].setAttribute("selected", "selected");
        }
    }

    for (let i = 0; i < arrayCurrencyName.length; i++) {
        var option = document.createElement('option');
        option.className = 'option';
        option.innerText = arrayCurrencyName[i];
        option.value = arrayCurrencyCode[i];
        selectSecond.appendChild(option);
    }


    //тут заполняю таблицу
    const table = document.querySelector('.exchange-table');

    for (let i = 0; i < arrayCurrencyName.length; i++) {
        var tr = document.createElement('tr');
        tr.className = 'tr';
        table.appendChild(tr);

        var td1 = document.createElement('td');
        td1.className = 'td1';
        td1.innerText = arrayCurrencyName[i];
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.className = 'td2';
        td2.innerText = arrayCurrencyCode[i];
        tr.appendChild(td2);
        var td3 = document.createElement('td');
        td3.className = 'td3';
        td3.innerText = arrayCurrencyRate[i];
        tr.appendChild(td3);
    }


    setInterval(function () {
        //пишу курс к гривне в параграфах

        const rate1 = document.querySelector('.display-rate-1');
        const rate2 = document.querySelector('.display-rate-2');

        var currentCurrency1 = selectFirst.value;
        var currentCurrency2 = selectSecond.value;

        let currentIndex1 = 0;
        let currentIndex2 = 0;

        for (currentIndex1; currentIndex1 < arrayCurrencyRate.length; currentIndex1++) {
            if (arrayCurrencyCode[currentIndex1] === currentCurrency1) {
                break;
            }
        }
        rate1.innerText = 'Курс до гривні: ' + arrayCurrencyRate[currentIndex1];

        for (currentIndex2; currentIndex2 < arrayCurrencyRate.length; currentIndex2++) {
            if (arrayCurrencyCode[currentIndex2] === currentCurrency2) {
                break;
            }
        }
        rate2.innerText = 'Курс до гривні: ' + arrayCurrencyRate[currentIndex2];




        // рассчёт курса в инпутах
        if (input.value == '') display.value = '';
        else display.value = (input.value * arrayCurrencyRate[currentIndex1] / arrayCurrencyRate[currentIndex2]).toFixed(2);

    }, 1);
}


//ну и кнопка смены валют туда-сюда

buttonSwap.onclick = function () {
    let select_swapValue = selectFirst.value;
    selectFirst.value = selectSecond.value;
    selectSecond.value = select_swapValue;

    let input_swapValue = input.value;
    input.value = display.value;
    display.value = input_swapValue;
};





