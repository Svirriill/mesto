import { initialCards, config } from '../utils/constants.js'
import { Section } from './Section.js'
import { Card } from './Card.js';
// import { Popup } from './Popup.js';
// import { UserInfo } from './UserInfo.js'
import { PopupWithImage } from './PopupWithImage.js'
import FormValidator from './FormValidator.js';
import { PopupWithForm } from './PopupWithForm.js';

const popupProfile = '.popup_profile';
const popupElement = '.popup_element';
const buttonOpenPopupElements = document.querySelector('.profile__button');
const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
// const buttonClosePopupProfile = document.querySelector('.popup__esc');
// const buttonClosePopupElements = document.querySelector('.popup__esc_elements');
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
const containerSelector = '.template-elements';



const section = new Section({
    items: initialCards,
    renderer: ({ name, link }) => {
      const card = new Card(name, link, '.template-elements');
      const cardElement = card.generateCard();
      section.addItem(cardElement);
      },
    },
    containerSelector
  );
  section.renderItems();
  
const addItem = function ({ name, link }) {
    const card = new Card(name, link, '.template-elements');
    const cardElement = card.generateCard();
    return cardElement;
}

const renderer = function () {
    const link = linkElement.value;
    const name = nameElement.value;
    const cardElement = addItem({ name, link });
    elementList.prepend(cardElement);
}

initialCards.forEach(({ name, link }) => {
    const card = new Card(name, link, '.template-elements');
    const cardElement = card.generateCard();
    elementList.prepend(cardElement);
});

const popupWithForm = new PopupWithForm({
    popupSelector: popupElement,
    handleFormSubmit: ({ name, link }) => {
        const card = new Card(name, link, '.template-elements');
        const cardElement = card.generateCard();
        elementList.addItem(cardElement);
        popupWithForm.close();
    },
});
popupWithForm.setEventListeners();

const formValidatorProfile = new FormValidator(config, formElement);
const formValidatorElement = new FormValidator(config, formAddCards);
formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.open();

// const userInfo = new UserInfo(title, subtitle);


// const showProfile = function() {
//     const popup = new Popup('.popup_profile')
//     popup.open();
//     popup.setEventListeners();

//     nameInput.value = title.textContent;
//     jobInput.value = subtitle.textContent;
//     const buttonElement = popupProfile.querySelector('.popup__button');
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     formValidatorProfile.resetForm();
// }

// const showElement = function() {
//     const popup = new Popup('.popup_element')
//     popup.open();
//     popup.setEventListeners();

//     formAddCards.reset();
//     const buttonElement = popupElement.querySelector('.popup__button');
//     buttonElement.classList.add(config.inactiveButtonClass);
//     formValidatorElement.resetForm();
// }

// function saveProfileInfo() {
//     nameInput.value = title.textContent;
//     jobInput.value = subtitle.textContent;
//     popupOpen(popupProfile);
//     formValidatorProfile.resetForm();
// }

function formSumitProfileInfo(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;

    // const popup = new Popup ('.popup_profile');
    // popup.close();
}

// const openToggleElement = () => {
//     popupOpen(popupElement);
//     formAddCards.reset();
//     formValidatorElement.resetForm();
// };

const formSubmitCards = (evt) => {
    evt.preventDefault();
    renderer(nameElement.value, linkElement.value)
    // formAddCards.name = nameElement.value;
    // formAddCards.link = linkElement.value;
    // // popupClose(popupElement);
    // const link = linkElement.value;
    // const name = nameElement.value;
    // const card = new Card(name, link, '.template-elements');
    // const cardElement = card.generateCard();
    // document.querySelector('.elements').prepend(cardElement);

    // const popup = new Popup ('.popup_element');
    // popup.close();
};

// function overlayCloseProfile(evt) {
//     if (evt.target.classList.contains('popup')) {
//         popupClose(popupProfile);
//     }
// }

// function overlayCloseElement(evt) {
//     if (evt.target.classList.contains('popup')) {
//         popupClose(popupElement);
//     }
// }

// function overlayCloseFigure(evt) {
//     if (evt.target.classList.contains('popup')) {
//         popupClose(popupFigure);
//     }
// }

// buttonOpenPopupProfile.addEventListener('click', saveProfileInfo);
// buttonClosePopupProfile.addEventListener('click', () => popupClose(popupProfile));
// buttonOpenPopupElements.addEventListener('click', openToggleElement);
// buttonClosePopupElements.addEventListener('click', () => popupClose(popupElement));
// buttonClosePopupImage.addEventListener('click', () => popupClose(popupFigure));

// buttonOpenPopupProfile.addEventListener('click', showProfile);
// buttonOpenPopupElements.addEventListener('click', showElement);

// popupProfile.addEventListener('click', overlayCloseProfile);
// popupElement.addEventListener('click', overlayCloseElement);
// popupFigure.addEventListener('click', overlayCloseFigure);
formElement.addEventListener('submit', formSumitProfileInfo);
formAddCards.addEventListener('submit', formSubmitCards);