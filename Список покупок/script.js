const input = document.querySelector('input');
const list = document.querySelector('ul');
const add = document.querySelector('#add');
const reset = document.querySelector('#reset');

add.onclick = function () {
    if (input.value !== '') {
        let li = document.createElement('li');
        li.textContent = input.value;
        list.appendChild(li);
    }

    let liArray = document.querySelectorAll('li');


    document.querySelector('p').textContent = '';
    reset.style.display = 'block'

    // for (let i = 0; i < lis.length; i++) {
    //     lis[i].onclick = function () {
    //         lis[i].style.textDecoration = 'line-through';
    //     }
    // }

    liArray.forEach(function (li) {
        li.onclick = function () {
            this.style.textDecoration = 'line-through';
        }
    })

    reset.onclick = function () {
        liArray.forEach(function (li) {
            li.remove();
        })
        reset.style.display = 'none';
        document.querySelector('p').textContent = 'Список пуст';
    };
}







