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
const buttonOpenPopupImage = document.querySelector('.popup__image_opened');
const formElement = document.querySelector('.popup__form');
const formImage = document.querySelector('.popup__figure_form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const titleElement = document.querySelector('.element__title');
const srcElement = document.querySelector('.element__image');
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');
const templateElements = document.querySelector('.template-elements');
const elementList = document.querySelector('.elements');
const formElements = document.querySelector('.popup__form_elements');
const nameElement = formElements.querySelector('.popup__input_type_name-element');
const linkElement = formElements.querySelector('.popup__input_type_src-element');

function addCard(formElements) {
    const element = templateElements.content.cloneNode(true);
    element.querySelector('.element__title').textContent = formElements.name;
    element.querySelector('.element__image').src = formElements.link;
    element.querySelector('.element__image').alt = formElements.name;


    addCardListeners(element);

    function generateCard() {
        elementList.prepend(element);
    }
    generateCard();
}

function deleteCard(e) {
  const element = e.target.closest('.element');
  element.remove();
};

function initianRender() {
    initialCards.forEach(formElements => {
        addCard(formElements);
})
}
initianRender();

function popupToggle (popup) {
    popup.classList.toggle('popup_opened');
    nameInput.setAttribute('value', 'Жак-Ив Кусто');
    jobInput.setAttribute('value', 'Исследователь океана');
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

const formSubmitHandler = (evt) => {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;

    popupToggle(popupProfile);
}

const formSubmitElements = (evt) => {
    evt.preventDefault();
    popupToggle(popupElement);
    formElements.name = nameElement.value;
    formElements.link = linkElement.value;
    nameElement.value = '';
    linkElement.value = '';
    addCard(formElements);
}

function formSubmitFigure(evt) {
    const element = evt.target.closest('.element__image');
    popupImage.src = element.src;
    popupFigcaption.textContent = element.alt;
    popupToggle(popupFigure);
}

buttonOpenPopup.addEventListener('click', () => popupToggle(popupProfile));
buttonClosePopup.addEventListener('click', () => popupToggle(popupProfile));
buttonOpenPopupElements.addEventListener('click', () => popupToggle(popupElement));
buttonClosePopupElements.addEventListener('click', () => popupToggle(popupElement));
buttonClosePopupImage.addEventListener('click', () => popupToggle(popupFigure));
buttonSavePopup.addEventListener('click', formSubmitHandler);
buttonSavePopupElements.addEventListener('click', formSubmitElements);
formElement.addEventListener('submit', formSubmitHandler);
formElements.addEventListener('submit', formSubmitElements);


function addCardListeners(element) {
    element.querySelector('.element__button-delete').addEventListener('click', deleteCard);
    
    element.querySelector('.element__button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__button_like');
    })
    
    element.querySelector('.element__image').addEventListener('click', formSubmitFigure);
}