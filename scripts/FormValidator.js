export default class FormValidator {

    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputList = config.inputList;
        this._buttonElement = config.buttonElement;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputElement = config.inputElement;
        this._errorElement = config.errorElement;
        this._formElement = formElement;
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputElement);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorElement);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputElement);
        errorElement.classList.remove(this._errorElement);
        errorElement.textContent = '';
    };

    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState = (inputList, inactiveButtonElement) => {
        if (this._hasInvalidInput(inputList)) {
            inactiveButtonElement.classList.add(this._inactiveButtonClass);
            inactiveButtonElement.setAttribute('disabled', true);
        } else {
            inactiveButtonElement.classList.remove(this._inactiveButtonClass);
            inactiveButtonElement.removeAttribute('disabled');
        }
    };

    _setEventListeners = () => {
        const buttonElement = this._formElement.querySelector(this._buttonElement);
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputList));
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._hideInputError(inputElement);
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    resetForm = () => {
    const inputList = this._formElement.querySelectorAll(this._inputList);
    inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
    }
}