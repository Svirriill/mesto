export class Card {
  constructor({ data, handleCardClick }, containerSelector) {
    this._name = data.name;
    this._link = data.link;
    this._containerSelector = containerSelector;
    this._handleCardClick = handleCardClick;
    // console.log(handleCardClick, data, containerSelector);
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._containerSelector).content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;
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
    this._setDeleteListener();
    this._setLikeListener();
    this._element.querySelector('.element__image').addEventListener("click", this._handleCardClick);
  }
}