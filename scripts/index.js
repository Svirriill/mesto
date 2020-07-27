import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupFigure = document.querySelector('.popup_image');
const popupProfile = document.querySelector('.popup_profile');
const popupElement = document.querySelector('.popup_element');
const buttonOpenPopupElements = document.querySelector('.profile__button');
const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
const buttonClosePopupProfile = document.querySelector('.popup__esc');
const buttonClosePopupElements = document.querySelector('.popup__esc_elements');
const buttonClosePopupImage = document.querySelector('.popup__esc_image');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const elementList = document.querySelector('.elements');
const formAddCards = document.querySelector('.popup__form_elements');
const nameElement = formAddCards.querySelector('.popup__input_type_name-element');
const linkElement = formAddCards.querySelector('.popup__input_type_src-element');

const config = {
    formSelector: '.popup__form',
    inputList: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputElement: 'popup__input_type_error',
    errorElement: 'popup__input-error_active'
};

initialCards.forEach(({ name, link }) => {
    const card = new Card(name, link, '.template-elements');
    const cardElement = card.generateCard();
    elementList.prepend(cardElement);
});

const formValidatorProfile = new FormValidator(config, formElement);
const formValidatorElement = new FormValidator(config, formAddCards);
formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();

function popupOpen(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', popupRemoveEsc);        
}

function popupClose(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', popupRemoveEsc);
}

function saveProfileInfo() {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    popupOpen(popupProfile);
    formValidatorProfile.resetForm();
}

function formSumitProfileInfo(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    popupClose(popupProfile);
}

const openToggleElement = () => {
    popupOpen(popupElement);
    formAddCards.reset();
    formValidatorElement.resetForm();
};

const formSubmitCards = (evt) => {
    evt.preventDefault();
    formAddCards.name = nameElement.value;
    formAddCards.link = linkElement.value;
    popupClose(popupElement);
    const link = linkElement.value;
    const name = nameElement.value;
    const card = new Card(name, link, '.template-elements');
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement);
};

function overlayCloseProfile(evt) {
    if (evt.target.classList.contains('popup')) {
        popupClose(popupProfile);
    }
}

function overlayCloseElement(evt) {
    if (evt.target.classList.contains('popup')) {
        popupClose(popupElement);
    }
}

function overlayCloseFigure(evt) {
    if (evt.target.classList.contains('popup')) {
        popupClose(popupFigure);
    }
}

function popupRemoveEsc(evt) {
    const escCode = 27;
    if (evt.keyCode !== escCode) {
        return;
    }
    console.log("HELLO");
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
        popupClose(openedPopup);
    }
}

buttonOpenPopupProfile.addEventListener('click', saveProfileInfo);
buttonClosePopupProfile.addEventListener('click', () => popupClose(popupProfile));
buttonOpenPopupElements.addEventListener('click', openToggleElement);
buttonClosePopupElements.addEventListener('click', () => popupClose(popupElement));
buttonClosePopupImage.addEventListener('click', () => popupClose(popupFigure));
popupProfile.addEventListener('click', overlayCloseProfile);
popupElement.addEventListener('click', overlayCloseElement);
popupFigure.addEventListener('click', overlayCloseFigure);
formElement.addEventListener('submit', formSumitProfileInfo);
formAddCards.addEventListener('submit', formSubmitCards);