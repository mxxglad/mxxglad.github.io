exchangeRate(); // тут я вызываю асинхронную функцию, которая читает API и делает всякое другое после

const selectOtherFirst = document.querySelector('.other__currency-1'); //просто записываю нужные элементы страницы в переменные
const selectOtherSecond = document.querySelector('.other__currency-2');
const selectUah = document.querySelector('.uah__currency-other');
const select = document.querySelector('.uah__currency');

const buttonSwapUah = document.querySelector('.uah__swap');
const buttonSwapOther = document.querySelector('.other__swap');

const inputOther = document.querySelector('.other__input');
const displayOther = document.querySelector('.other__display');
const inputUah = document.querySelector('.uah__input')
const displayUah = document.querySelector('.uah__display')

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
    for (let i = 0; i < data.length; i++) {
        arrayCurrencyRate.push(data[i].rate);
    }


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
        selectOtherFirst.appendChild(option);

    }

    for (let i = 0; i < arrayCurrencyName.length; i++) {
        var option = document.createElement('option');
        option.className = 'option';
        option.innerText = arrayCurrencyName[i];
        selectOtherSecond.appendChild(option);
    }

    for (let i = 0; i < arrayCurrencyName.length; i++) {
        var option = document.createElement('option');
        option.className = 'option';
        option.innerText = arrayCurrencyName[i];
        selectUah.appendChild(option);
    }


    //тут заполняю таблицу
    const table = document.querySelector('.exchange-table');

    for (let i = 0; i < data.length; i++) {
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

        const rateOther1 = document.querySelector('.other__display-currency-1');
        const rateOther2 = document.querySelector('.other__display-currency-2');
        const rateUah = document.querySelector('.uah__rate');
        const rateUahOther = document.querySelector('.uah__rate-other');

        var currentCurrency1 = selectOtherFirst.value;
        var currentCurrency2 = selectOtherSecond.value;
        var currentCurrencyUah = selectUah.value;

        let currentIndex1 = 0;
        let currentIndex2 = 0;
        let currentIndexUah = 0;

        for (currentIndex1; currentIndex1 < data.length; currentIndex1++) {
            if (data[currentIndex1].txt === currentCurrency1) {
                break;
            }
        }
        rateOther1.innerText = 'Курс до гривні: ' + data[currentIndex1].rate;

        for (currentIndex2; currentIndex2 < data.length; currentIndex2++) {
            if (data[currentIndex2].txt === currentCurrency2) {
                break;
            }
        }
        rateOther2.innerText = 'Курс до гривні: ' + data[currentIndex2].rate;


        for (currentIndexUah; currentIndexUah < data.length; currentIndexUah++) {
            if (data[currentIndexUah].txt === currentCurrencyUah) {
                break;
            }
        }

        if (selectUah.value == 'uah') {
            rateUahOther.innerText = '';
        }
        else {
            rateUahOther.innerText = 'Курс до гривні: ' + data[currentIndexUah].rate;
        }


        // рассчёт курса в инпутах
        if (inputOther.value == '') displayOther.value = '';
        else displayOther.value = (inputOther.value * data[currentIndex1].rate / data[currentIndex2].rate).toFixed(2);

        if (inputUah.value == '') displayUah.value = '';
        else displayUah.value = (inputUah.value / data[currentIndexUah].rate).toFixed(2);
    }, 1);
}


//ну и кнопка смены валют туда-сюда

buttonSwapOther.onclick = function () {
    let select_swapValue = selectOtherFirst.value;
    selectOtherFirst.value = selectOtherSecond.value;
    selectOtherSecond.value = select_swapValue;

    let input_swapValue = inputOther.value;
    inputOther.value = displayOther.value;
    displayOther.value = input_swapValue;
};





