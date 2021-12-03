// подключет всю валидацию на странице, используя settings:
export const enableValidation = (settings) => {
    // показываем ошибку по полю
    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(settings.errorClass);
    };

    // скрываем ошибку по полю
    const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.classList.remove(settings.errorClass);
        errorElement.textContent = '';
    }; 

    // проверяем валидность поля
    const isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    }; 

    // если какое-то из полей не валидно - возвращает true
    const hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => { 
            return !inputElement.validity.valid;
        })
    }; 

    // управление доступностью кнопки
    const handleSubmitButton = (submitButton, inputList) => {
        if (hasInvalidInput(inputList)) {
            submitButton.disabled = true;     
            submitButton.classList.add(settings.inactiveButtonClass);
        } else {
            submitButton.disabled = false; 
            submitButton.classList.remove(settings.inactiveButtonClass);
        }   
    }

    // добавляет всем инпутам слушателей
    const setEventListeners = (formElement) => {
        const buttonElement = formElement.querySelector(settings.submitButtonSelector);
        // поля внутри формы
        const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                isValid(formElement, inputElement);
                handleSubmitButton(buttonElement, inputList);
            });
        });
        // включаем/выключаем кнопку по умолчанию
        handleSubmitButton(buttonElement, inputList);
    }; 
    // ищем все формы
    const formsList = document.querySelectorAll(settings.formSelector);
    formsList.forEach(element => {
        element.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(element); 
    });
}; 