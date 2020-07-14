  const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorElement);
};

const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputElement);
    errorElement.classList.remove(config.errorElement);
    errorElement.textContent = '';
};

const isValid = (config, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(config, formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (config, inputList, inactiveButtonElement) => {
    if (hasInvalidInput(inputList)) {
        inactiveButtonElement.classList.add(config.inactiveButtonClass);
        inactiveButtonElement.setAttribute('disabled', true);
    } else {
        inactiveButtonElement.classList.remove(config.inactiveButtonClass);
        inactiveButtonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement, config) => {
    const buttonElement = formElement.querySelector(config.buttonElement);
    const inputList = Array.from(formElement.querySelectorAll(config.inputList));
    toggleButtonState(config, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            hideInputError(config, formElement, inputElement);
            isValid(config, formElement, inputElement);
            toggleButtonState(config, inputList, buttonElement);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, config);
    });
};