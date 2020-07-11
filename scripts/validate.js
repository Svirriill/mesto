const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, inactiveButtonElement) => {
    if (hasInvalidInput(inputList)) {
        inactiveButtonElement.classList.add('popup__button_inactive');
        inactiveButtonElement.setAttribute('disabled', true);
    } else {
        inactiveButtonElement.classList.remove('popup__button_inactive');
        inactiveButtonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement) => {
    const buttonElement = formElement.querySelector('.popup__button');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (config) => {
    const {formElement, inputList, buttonElement, inactiveButtonClass, inputElement, errorElement} = config;
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation({
    formElement: '.popup__form',
    inputList: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputElement: 'popup__input_type_error',
    errorElement: 'popup__input-error_active'
  });