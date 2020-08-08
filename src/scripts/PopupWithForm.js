import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ popupSelector,  handleFormSubmit }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
    }
  
    setInputValues(userName, userInfo) {
      const formInputName = this._formElement.querySelector('.popup__input_type_name');
      const formInputProfession = this._formElement.querySelector('.popup__input_type_info');
      formInputName.value = userName;
      formInputProfession.value = userInfo;
    }
  
    _getInputValues() {
      this._inputList = this._popup.querySelectorAll('.popup__input');
      this._formValues = {};
      this._inputList.forEach((input) => this._formValues[input.name] = input.value);
  
      return this._formValues;
    }
  
    close() {
      super.close();
      this._formElement.reset();
      // this._formElement
      //   .querySelectorAll('.popup__input-error')
      //   .forEach((item) => item.textContent = "");
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._formElement = this._popup.querySelector('.popup__form');
      this._formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }