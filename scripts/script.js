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

let popup = document.querySelector('.popup');
let popupFigure = document.querySelector('.popup_image')
let popupProfile = document.querySelector('.popup_profile');
let popupElement = document.querySelector('.popup_element');
let buttonOpenPopupElements = document.querySelector('.profile__button');
let buttonOpenPopup = document.querySelector('.profile__button-edit');
let buttonSavePopup = document.querySelector('.popup__button');
let buttonSavePopupElements = document.querySelector('.popup__button_elements');
let buttonClosePopup = document.querySelector('.popup__esc');
let buttonClosePopupElements = document.querySelector('.popup__esc_elements');
let buttonClosePopupImage = document.querySelector('.popup__esc_image');
let buttonOpenPopupImage = document.querySelector('.popup__image_opened');
let formElement = document.querySelector('.popup__form');
let formImage = document.querySelector('.popup__figure_form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_info');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let popupImage = document.querySelector('.popup__image');
let popupFigcaption = document.querySelector('.popup__figcaption');


const templateElements = document.querySelector('.template-elements');
const elementList = document.querySelector('.elements');
let formElements = document.querySelector('.popup__form_elements');
let nameElement = formElements.querySelector('.popup__input_type_name-element');
let linkElement = formElements.querySelector('.popup__input_type_src-element');
let titleElement = document.querySelector('.element__title');
let srcElement = document.querySelector('.element__image');


function addCard(formElements) {
    const element = templateElements.content.cloneNode(true);
    element.querySelector('.element__title').textContent = formElements.name;
    element.querySelector('.element__image').src = formElements.link;

    element.querySelector('.element__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button_like');
    })

    addCardListeners(element);
    elementList.prepend(element);
}

function deleteCard(e) {
  const element = e.target.closest('.element');
  element.remove();
};

initialCards.forEach(formElements => {
    addCard(formElements);

})

function popupToggle (popup) {
    popup.classList.toggle('popup_opened');
    nameInput.setAttribute('value', 'Жак-Ив Кусто');
    jobInput.setAttribute('value', 'Исследователь океана');
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
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
    formElements.name = nameElement.value;
    formElements.link = linkElement.value;
    nameElement.value = '';
    linkElement.value = '';
    addCard(formElements);
}

let formSubmitFigure = (evt) => {
    evt.preventDefault();
    popupToggle(popupFigure);
    titleElement.value = popupFigcaption.name;
    srcElement.value = popupImage.link;
}

buttonOpenPopup.addEventListener('click', () => popupToggle(popupProfile));
buttonClosePopup.addEventListener('click', () => popupToggle(popupProfile));
buttonOpenPopupElements.addEventListener('click', () => popupToggle(popupElement));
buttonClosePopupElements.addEventListener('click', () => popupToggle(popupElement));
buttonOpenPopupImage.addEventListener('click', () => popupToggle(popupFigure));
buttonClosePopupImage.addEventListener('click', () => popupToggle(popupFigure));
buttonSavePopup.addEventListener('click', formSubmitHandler);
buttonSavePopupElements.addEventListener('click', formSubmitElements);
formElement.addEventListener('submit', formSubmitHandler);
formElements.addEventListener('submit', formSubmitElements);
formImage.addEventListener('submit', formSubmitFigure);

function addCardListeners(element) {
    element.querySelector('.element__button-delete').addEventListener('click', deleteCard);
}