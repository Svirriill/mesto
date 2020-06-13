let popup = document.querySelector('.popup');
let buttonOpenPopup = document.querySelector('.profile-info__button');
let buttonSavePopup = document.querySelector('.popup__container-button');
let buttonClosePopup = document.querySelector('.popup__container-esc');
let formElement = document.querySelector('.popup__container-form');
let nameInput = document.querySelector('.popup__container-name');
let jobInput = document.querySelector('.popup__container-text');

let popupAdd = function (value) {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', 'Жак-Ив Кусто');
    jobInput.setAttribute('value', 'Исследователь океана');
}

let popupRemove = function () {
    popup.classList.remove('popup_opened');
}


let formSubmitHandler = function (evt) {
    evt.preventDefault();
    let title = document.querySelector('.profile-info__title');
    let subtitle = document.querySelector('.profile-info__subtitle');
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    popupRemove();
}

buttonOpenPopup.addEventListener('click', popupAdd);
buttonClosePopup.addEventListener('click', popupRemove);
buttonSavePopup.addEventListener('click', formSubmitHandler);
formElement.addEventListener('submit', formSubmitHandler);