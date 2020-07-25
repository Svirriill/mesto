export default class Card {
  constructor(name, link, templateElements) {
    this._name = name;
    this._link = link;
    this._templateElements = templateElements;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateElements).content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;
  }

  _setToggleListener() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      document.querySelector('.popup__image').src = this._link;
      document.querySelector('.popup__figcaption').textContent = this._name;
      document.querySelector('.popup_image').classList.toggle('popup_opened');
    });
  }

  _setDeleteListener() {
    this._element.querySelector('.element__delete_button').addEventListener('click', (e) => {
      const element = e.target.closest('.element');
      element.remove();
    });
  }

  _setLikeListener() {
    this._element.querySelector('.element__button_like').addEventListener('click', (e) => {
      e.target.classList.toggle('element__button_like');
    });
  }

  _setEventListeners() {
    this._setToggleListener();
    this._setDeleteListener();
    this._setLikeListener();
  }
}