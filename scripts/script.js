let popup = document.querySelector('.popup');
let popupProfile = document.querySelector('.popup_profile');
let popupElement = document.querySelector('.popup_element');
let buttonOpenPopupElements = document.querySelector('.profile__button');
let buttonOpenPopup = document.querySelector('.profile__button-edit');
let buttonSavePopup = document.querySelector('.popup__button');
let buttonSavePopupElements = document.querySelector('.popup__button_elements');
let buttonClosePopup = document.querySelector('.popup__esc');
let buttonClosePopupElements = document.querySelector('.popup__esc_elements');
let formElement = document.querySelector('.popup__form');
let formElements = document.querySelector('.popup__form_elements');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_info');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let nameElement = document.querySelector('.popup__input_type_name-element');
let imgElement = document.querySelector('.popup__input_type_src-element');
let titleElement = document.querySelector('.element__title');
let srcElement = document.querySelector('.element__image');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const templateElements = document.querySelector('.template-elements').content;
const elementList = document.querySelector('.elements');

function addCard(item) {
    const element = templateElements.cloneNode(true);
    element.querySelector('.element__title').textContent = item.name;
    element.querySelector('.element__image').src = item.link;
    elementList.prepend(element);
}

initialCards.forEach(item => {
    addCard(item);
})


function popupToggle (popup) {
    popup.classList.toggle('popup_opened');
    nameInput.setAttribute('value', 'Жак-Ив Кусто');
    jobInput.setAttribute('value', 'Исследователь океана');
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    nameElement.value = titleElement.textContent;
    imgElement.link = srcElement.src;
}

let formSubmitHandler = (evt) => {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    popupToggle(popupProfile);
}

let formSubmitElements = (evt) => {
    evt.preventDefault();
    popupToggle(popupElement);
}

buttonOpenPopup.addEventListener('click', () => popupToggle(popupProfile));
buttonOpenPopupElements.addEventListener('click', () => popupToggle(popupElement));
buttonClosePopup.addEventListener('click', () => popupToggle(popupProfile));
buttonClosePopupElements.addEventListener('click', () => popupToggle(popupElement));
buttonSavePopup.addEventListener('click', formSubmitHandler);
buttonSavePopupElements.addEventListener('click', formSubmitElements);
formElement.addEventListener('submit', formSubmitHandler);
formElements.addEventListener('submit', formSubmitElements);