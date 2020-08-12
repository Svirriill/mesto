import { Popup } from "./Popup.js";
import { config, formElement } from '../utils/constants.js';
import FormValidator from './FormValidator.js';

const formValidatorProfile = new FormValidator(config, formElement);

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

    formValidatorProfile.resetForm();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement = this._popup.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = this._getInputValues()
      this._handleFormSubmit(data);
      this.close();
    });
  }
}