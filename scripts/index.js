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
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');
const templateElements = document.querySelector('.template-elements');
const elementList = document.querySelector('.elements');
const formElements = document.querySelector('.popup__form_elements');
const nameElement = formElements.querySelector('.popup__input_type_name-element');
const linkElement = formElements.querySelector('.popup__input_type_src-element');

const config = {
    formSelector: '.popup__form',
    inputList: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputElement: 'popup__input_type_error',
    errorElement: 'popup__input-error_active'
}

function addCard(formElements) {
    const element = templateElements.content.cloneNode(true);
    const elementImage = element.querySelector('.element__image');

    element.querySelector('.element__title').textContent = formElements.name;
    elementImage.src = formElements.link;
    elementImage.alt = formElements.name;

    addCardListeners(element);

    return element;
}

function generateCard(element) {
    elementList.prepend(element);
}

function deleteCard(e) {
    const element = e.target.closest('.element');
    element.remove();
}

initialCards.forEach(formElements => {
    const element = addCard(formElements);
    generateCard(element);
});

const deleteErrorValidation = (popup, config) => {
    const formElement = popup.querySelector(config.formSelector);
    const inputList = popup.querySelectorAll(config.inputList);
    inputList.forEach((inputElement) => {
        hideInputError(config, formElement, inputElement);
    });
};

function popupToggle(popup) {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        enableValidation(config);
    } else {
        const popupForm = document.querySelector('.popup__form');
        popupForm.reset();
        deleteErrorValidation(popup, config);
    }
}

function saveProfileInfo() {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    popupToggle(popupProfile);
}

function formSumitProfileInfo(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    popupToggle(popupProfile);
}

function openToggleElement() {
    popupToggle(popupElement);
    formElements.reset();
}

function saveCardsInfo() {
    formElements.name = nameElement.value;
    formElements.link = linkElement.value;
    popupToggle(popupElement);
}

const formSubmitCards = (evt) => {
    evt.preventDefault();
    saveCardsInfo();
    const element = addCard(formElements);
    generateCard(element);
}

function openPopupCards(evt) {
    const element = evt.target.closest('.element__image');
    popupImage.src = element.src;
    popupFigcaption.textContent = element.alt;
    popupToggle(popupFigure);
}

function overlayCloseProfile(evt) {
    if (evt.target.classList.contains('popup')) {
        popupToggle(popupProfile);
    }
}

function overlayCloseElement(evt) {
    if (evt.target.classList.contains('popup')) {
        popupToggle(popupElement);
    }
}

function overlayCloseFigure(evt) {
    if (evt.target.classList.contains('popup')) {
        popupToggle(popupFigure);
    }
}

function popupRemoveEsc(evt) {
    const escCode = 27;
    if (evt.keyCode !== escCode) {
        return;
    }
    const openedPopup = document.querySelector('.popup_opened')
    if (openedPopup) {
        popupToggle(openedPopup);
    }
}

buttonOpenPopupProfile.addEventListener('click', saveProfileInfo);
buttonClosePopupProfile.addEventListener('click', () => popupToggle(popupProfile));
buttonOpenPopupElements.addEventListener('click', openToggleElement);
buttonClosePopupElements.addEventListener('click', () => popupToggle(popupElement));
buttonClosePopupImage.addEventListener('click', () => popupToggle(popupFigure));
popupProfile.addEventListener('click', overlayCloseProfile);
popupElement.addEventListener('click', overlayCloseElement);
popupFigure.addEventListener('click', overlayCloseFigure);
document.addEventListener('keydown', popupRemoveEsc);
formElement.addEventListener('submit', formSumitProfileInfo);
formElements.addEventListener('submit', formSubmitCards);

function likeToggle(e) {
    e.target.classList.toggle('element__button_like');
}

function addCardListeners(element) {
    element.querySelector('.element__delete_button').addEventListener('click', deleteCard);

    element.querySelector('.element__button').addEventListener('click', likeToggle);

    element.querySelector('.element__image').addEventListener('click', openPopupCards);
}
