const input = document.querySelector('input');
const fillList = document.querySelector('#fill');
const addButton = document.querySelector('#add');
const clearButton = document.querySelector('#clear');
const rememberButton = document.querySelector('#remember')

let groceries;

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
            liArray[liArray.length - 1].remove();
            liArray = document.querySelectorAll('#fill li');
            if (liArray.length === 0) {
                clearButton.style.display = 'none';
                rememberButton.style.display = 'none';
                document.querySelector('p').textContent = 'Список пуст';
            }

        };


        rememberButton.onclick = function () {
            groceries = JSON.parse(localStorage.getItem('name')) || [];
            for (let i = 0; i < liArray.length; i++) {
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
    let liArray = document.querySelectorAll('#last li')
    if (liArray.length !== 0) {
        liArray.forEach(function (li) {
            li.remove();
        })
    }
        

let groceriesGot = JSON.parse(localStorage.getItem('name'));
        if (groceriesGot !== null) {
            for (let i = 0; i < groceriesGot.length; i++) {
                let li = document.createElement('li');
                li.textContent = groceriesGot[i];
                lastList.appendChild(li);
            }

            liArray = document.querySelectorAll('#last li')

            liArray.forEach(function (li) {
                let timerId;
                li.onclick = function () {
                    console.log(groceriesGot)
                    if (!this.classList.contains('crossed-out')) {
                        this.classList.add('crossed-out');
                        if (this.classList.contains('crossed-out')) {
                            clearTimeout(timerId);
                            timerId = setTimeout(() => {
                                groceriesGot.splice(groceriesGot.indexOf(this.textContent), 1)
                                this.remove();
                                window.localStorage.setItem('name', JSON.stringify(groceriesGot));
                            }, 5000);
                        }
                    }
                    else {
                        this.classList.remove('crossed-out')
                        clearTimeout(timerId);
                    }

                }
            })
            document.querySelector('#h3').textContent = 'Последний список:';
        }

        else document.querySelector('#h3').innerHTML = 'Последний список пустой';


}

resetButton.onclick = function () {
    console.log(document.querySelectorAll('#last li').length)
    let liArray = document.querySelectorAll('#last li');
    for (let i = 0; i < liArray.length; i++) {
        liArray[i].remove();
    }
    localStorage.clear();
}





