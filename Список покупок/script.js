const input = document.querySelector('input');
const fillList = document.querySelector('#fill');
const addButton = document.querySelector('#add');
const clearButton = document.querySelector('#clear');
const rememberButton = document.querySelector('#remember')

addButton.onclick = function () {
    if (input.value !== '') {
        let li = document.createElement('li');
        li.textContent = input.value;
        fillList.appendChild(li);


        let liArray = document.querySelectorAll('#fill li');

        input.value = '';
        document.querySelector('p').textContent = '';
        clearButton.style.display = 'block';
        rememberButton.style.display = 'block';    

        clearButton.onclick = function () {
            liArray.forEach(function (li) {
                li.remove();
            })
            clearButton.style.display = 'none';
            rememberButton.style.display = 'none';
            document.querySelector('p').textContent = 'Список пуст';
        };


        rememberButton.onclick = function () {
            let groceries = [];
            for (let i = 0; i < liArray.length; i++){
                groceries.push(liArray[i].textContent);
                window.localStorage.setItem('name', JSON.stringify(groceries));
            }
        }
    }
}


const savedButton = document.querySelector('#saved')
const lastList = document.querySelector('#last')
const resetButton = document.querySelector('#reset')

savedButton.onclick = function () {
    let groceriesGot = JSON.parse(localStorage.getItem('name'));
    if (groceriesGot !== null) {
        for (let i = 0; i < groceriesGot.length; i++){
        let li = document.createElement('li');
        li.textContent = groceriesGot[i];
        lastList.appendChild(li);
    }

    let liArray = document.querySelectorAll('#last li')

    liArray.forEach(function (li) {
            li.onclick = function () {
                this.style.textDecoration = 'line-through';
            }
        })
    }
    else document.querySelector('#h3').textContent = 'Последний список: Пусто'
}

resetButton.onclick = function () {
    for (let i = 0; i < document.querySelectorAll('#last li').length; i++){
        document.querySelectorAll('#last li')[i].remove();
    }
    window.localStorage.clear();
    console.log(window.localStorage);
    
}




