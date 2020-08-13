import './index.css'
import { initialCards, config, formElement } from '../utils/constants.js';
import { Section } from '../Components/Section.js';
import { Card } from '../Components/Card.js';
import { PopupWithImage } from '../Components/PopupWithImage.js'
import FormValidator from '../Components/FormValidator.js';
import { PopupWithForm } from '../Components/PopupWithForm.js';
import { UserInfo } from '../Components/UserInfo.js';

const popupElement = '.popup_element';
const buttonOpenPopupElements = document.querySelector('.profile__button');
const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
const formAddCards = document.querySelector('.popup__form_elements');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');
const title = '.profile__title';
const subtitle = '.profile__subtitle';

const popupImage = new PopupWithImage('.popup_image', '.popup__image', '.popup__figcaption');

const formValidatorProfile = new FormValidator(config, formElement);
const formValidatorElement = new FormValidator(config, formAddCards);

formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                popupImage.open(item.name, item.link);
                popupImage.setEventListeners(item.name, item.link);
            }
        },
            '.template-elements'
        );
        const cardElement = card.generateCard();
        section.addItem(cardElement);
    }
},
    '.elements'
);
section.renderItems();

const userInformation = new UserInfo(title, subtitle);

const popupWithFormProfile = new PopupWithForm({
    popupSelector: '.popup_profile',
    handleFormSubmit: data => 
        userInformation.setUserInfo(data),
},
    '.popup__form');
popupWithFormProfile.setEventListeners();

const popupWithFormCards = new PopupWithForm({
    popupSelector: popupElement,
    handleFormSubmit: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                popupImage.open(item.name, item.link)
                popupImage.setEventListeners(item.name, item.link);
            }
        },
            '.template-elements'
        );
        const cardElement = card.generateCard();
        section.addItem(cardElement);
    }
});
popupWithFormCards.setEventListeners();

buttonOpenPopupProfile.addEventListener("click", () => {
    const userInfo = userInformation.getUserInfo()
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.info;
    formValidatorProfile.resetForm();
    popupWithFormProfile.open();
});

buttonOpenPopupElements.addEventListener("click", () => {
    popupWithFormCards.open();
    formValidatorElement.resetForm();
});