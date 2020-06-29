const popup = document.querySelector('.popup');
const popupFigure = document.querySelector('.popup_image')
const popupProfile = document.querySelector('.popup_profile');
const popupElement = document.querySelector('.popup_element');
const buttonOpenPopupElements = document.querySelector('.profile__button');
const buttonOpenPopup = document.querySelector('.profile__button-edit');
const buttonSavePopup = document.querySelector('.popup__button');
const buttonSavePopupElements = document.querySelector('.popup__button_elements');
const buttonClosePopup = document.querySelector('.popup__esc');
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

function addCard(formElements) {
    const element = templateElements.content.cloneNode(true);
    const elementImage = element.querySelector('.element__image');

    element.querySelector('.element__title').textContent = formElements.name;
    elementImage.src = formElements.link;
    elementImage.alt = formElements.name;

    addCardListeners(element);

    generateCard(element);

    return element;
}

function generateCard(element) {
    elementList.prepend(element);
}

function deleteCard(e) {
    const element = e.target.closest('.element');
    element.remove();
}

function initialRender() {
    initialCards.forEach(formElements => {
        addCard(formElements);
    })
}
initialRender();

function popupToggle(popup) {
    popup.classList.toggle('popup_opened');

}

function enterProfileValue() {
    nameInput.setAttribute('value', 'Жак-Ив Кусто');
    jobInput.setAttribute('value', 'Исследователь океана');
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

function enterCardsValue() {
    formElements.name = nameElement.value;
    formElements.link = linkElement.value;
    nameElement.value = '';
    linkElement.value = '';
    popupToggle(popupElement);
}

const formSubmitCards = (evt) => {
    evt.preventDefault();
    enterCardsValue();
    addCard(formElements);
}

function formSubmitFigure(evt) {
    const element = evt.target.closest('.element__image');
    popupImage.src = element.src;
    popupFigcaption.textContent = element.alt;
    popupToggle(popupFigure);
}

buttonOpenPopup.addEventListener('click', enterProfileValue);
buttonClosePopup.addEventListener('click', () => popupToggle(popupProfile));
buttonOpenPopupElements.addEventListener('click', () => popupToggle(popupElement));
buttonClosePopupElements.addEventListener('click', () => popupToggle(popupElement));
buttonClosePopupImage.addEventListener('click', () => popupToggle(popupFigure));
formElement.addEventListener('submit', formSumitProfileInfo);
formElements.addEventListener('submit', formSubmitCards);

function likeToggle(e) {
    e.target.classList.toggle('element__button_like');
}

function addCardListeners(element) {
    element.querySelector('.element__button-delete').addEventListener('click', deleteCard);

    element.querySelector('.element__button').addEventListener('click', likeToggle);

    element.querySelector('.element__image').addEventListener('click', formSubmitFigure);
}