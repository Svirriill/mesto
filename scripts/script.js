<<<<<<< HEAD
let popup = document.querySelector('.popup');
let buttonOpenPopup = document.querySelector('.profile__button-edit');
let buttonSavePopup = document.querySelector('.popup__button');
let buttonClosePopup = document.querySelector('.popup__esc');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__text');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');


let popupAdd = function (value) {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', 'Жак-Ив Кусто');
    jobInput.setAttribute('value', 'Исследователь океана');
}

let popupRemove = function () {
    popup.classList.remove('popup_opened');
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}


let formSubmitHandler = function (evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    popupRemove();
}

buttonOpenPopup.addEventListener('click', popupAdd);
buttonClosePopup.addEventListener('click', popupRemove);
buttonSavePopup.addEventListener('click', formSubmitHandler);
=======
let popup = document.querySelector('.popup');
let buttonOpenPopup = document.querySelector('.profile__button-edit');
let buttonSavePopup = document.querySelector('.popup__button');
let buttonClosePopup = document.querySelector('.popup__esc');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__text');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');


let popupAdd = function (value) {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', 'Жак-Ив Кусто');
    jobInput.setAttribute('value', 'Исследователь океана');
}

let popupRemove = function () {
    popup.classList.remove('popup_opened');
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}


let formSubmitHandler = function (evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    popupRemove();
}

buttonOpenPopup.addEventListener('click', popupAdd);
buttonClosePopup.addEventListener('click', popupRemove);
buttonSavePopup.addEventListener('click', formSubmitHandler);
>>>>>>> d3c18c58176ce72b1116d92b3b2511c7067753ca
formElement.addEventListener('submit', formSubmitHandler);