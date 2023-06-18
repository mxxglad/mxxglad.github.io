const addButton = document.querySelector('.form__button')

const inputTitle = document.querySelector('#title')
const inputDesc = document.querySelector('#desc')

let divCards = document.querySelector('.cards');

let cardList = JSON.parse(localStorage.getItem('cards')) || [];



for (let i = 0; i < cardList.length; i++){
    let divCard = document.createElement('div')
    divCard.classList.add('card');

    let divTitle = document.createElement('div')
    divTitle.classList.add('title');

    let title = document.createElement('h3')
    title.textContent = cardList[i].cardTitle;

    let deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')

    let deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fa-sharp', 'fa-solid', 'fa-xmark');

    deleteButton.appendChild(deleteIcon)
    divTitle.appendChild(title)
    divTitle.appendChild(deleteButton)
    divCard.appendChild(divTitle);

    let divDesc = document.createElement('div')
    divDesc.classList.add('desc')

    let p = document.createElement('p');
    p.textContent = cardList[i].cardDescription;

    divDesc.appendChild(p);
    divCard.appendChild(divDesc);

    divCards.appendChild(divCard);
}





addButton.onclick = function (event) {
    event.preventDefault();


    let divCard = document.createElement('div')
    divCard.classList.add('card');

    let divTitle = document.createElement('div')
    divTitle.classList.add('title');

    let title = document.createElement('h3')
    title.textContent = inputTitle.value;

    let deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')

    let deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fa-sharp', 'fa-solid', 'fa-xmark');

    deleteButton.appendChild(deleteIcon)
    divTitle.appendChild(title)
    divTitle.appendChild(deleteButton)
    divCard.appendChild(divTitle);

    let divDesc = document.createElement('div')
    divDesc.classList.add('desc')

    let p = document.createElement('p');
    p.textContent = inputDesc.value;

    divDesc.appendChild(p);
    divCard.appendChild(divDesc);

    divCards.appendChild(divCard);

    let cardInfo = {
        'cardTitle': title.textContent,
        'cardDescription': p.textContent,
    }

    cardList.push(cardInfo);
    localStorage.setItem('cards', JSON.stringify(cardList));


    inputTitle.value = ''; 
    inputDesc.value = ''; 



}


setInterval(function(){
    const deleteButtons = document.querySelectorAll('.delete')
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].onclick = function () {
            let card = this.closest('.card')
            let storageData = JSON.parse(localStorage.getItem('cards'))
            storageData.splice(i, 1)
            localStorage.setItem('cards', JSON.stringify(storageData))
            console.log(localStorage)
            card.remove();
        }
    }
},1)


