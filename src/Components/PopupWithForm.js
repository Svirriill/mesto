import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => { this._formValues[input.name] = input.value });
    return this._formValues;
  }

  close() {
    super.close();
    this._inputList = this._popup.querySelector('.popup__form');
    this._inputList.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement = this._popup.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = this._getInputValues()
      this._handleFormSubmit(data);
      // блокирую кнопку, т.к. при двойном клике, из-за очистки формы удаляются данные с профиля
      this._formElement.querySelector('.popup__button').setAttribute('disabled', true);
    });
  }
}