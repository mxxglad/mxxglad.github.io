const input = document.querySelector('input');
const fillList = document.querySelector('#fill');
const addButton = document.querySelector('#add');
const resetButton = document.querySelector('#reset');
const rememberButton = document.querySelector('#remember')

addButton.onclick = function () {
    if (input.value !== '') {
        let li = document.createElement('li');
        li.textContent = input.value;
        fillList.appendChild(li);


        let liArray = document.querySelectorAll('li');

        input.value = '';
        document.querySelector('p').textContent = '';
        resetButton.style.display = 'block';
        rememberButton.style.display = 'block';    

        resetButton.onclick = function () {
            liArray.forEach(function (li) {
                li.remove();
            })
            resetButton.style.display = 'none';
            rememberButton.style.display = 'none';
            document.querySelector('p').textContent = 'Список пуст';
        };


        rememberButton.onclick = function () {
            let groceries = [];
            for (let i = 0; i < liArray.length; i++){
                groceries.push(liArray[i].textContent)
            }
            console.log(groceries)
            window.localStorage.setItem('name', JSON.stringify(groceries));

        }
    }
}


const saveButton = document.querySelector('#saved')
const lastList = document.querySelector('#last')

saveButton.onclick = function () {
    let groceriesGot = JSON.parse(localStorage.getItem('name'));
    console.log(groceriesGot);
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




