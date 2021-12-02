// добавляет картинке сердца смену картинки по клику 
function addHandlerClickOnHeart(element) {
    element.addEventListener('click', function () {
        if (element.src.includes('/vendor/images/heart.svg')) {
            element.src = './vendor/images/FullHeart.svg';
        }
        else {
            element.src = './vendor/images/heart.svg';
        }
    }); 
}

// закрытие поп-апа
function closePopup(popup) {
    popup.classList.remove('popup_condition_opened');
    console.log
}

// открытие поп-апа
function openPopup(popup) {
    popup.classList.add('popup_condition_opened');
}

// найдем элементы поп-апа с открытой карточкой
const popupElement = document.querySelector('#popupImage');
const popupImage = popupElement.querySelector('.popup__image');
const popupCaption = popupElement.querySelector('.popup__caption');
const elementsOnline = document.querySelector('.elements');

// функция создает карточку в elements
function createElementToElements(elemTitle='', elemSrc=''){
    // копируем шаблон
    const elementsTemplate = document.querySelector('#element-of-elements').content;
    const elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
    // наполняем содержимым
    const elementsImage = elementsElement.querySelector('.elements__image'); 
    elementsImage.src = elemSrc;
    elementsImage.alt = elemTitle;
    elementsElement.querySelector('.elements__caption').textContent = elemTitle;
    //добавим попап-эвент
    elementsImage.addEventListener('click', function () {
        popupImage.src = elemSrc;    
        popupCaption.textContent = elemTitle;    
        openPopup(popupElement);
    })
    // добавляем клик на сердце
    addHandlerClickOnHeart(elementsElement.querySelector('.elements__heart-image'));
    // добавляем удаление при нажатии на кнопку удаления
    elementsElement.querySelector('.elements__delete-button').addEventListener('click', function () {
        elementsElement.remove();
    }); 
    return elementsElement; 
}

// добавляем событие на изменение профиля
const popupEditProfile = document.querySelector('#popupEditProfile');
const nameInput = popupEditProfile.querySelector('[name="profile-name"]');
const captionInput = popupEditProfile.querySelector('[name="profile-caption"]');

const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

function handleEditProfileForm (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileCaption.textContent = captionInput.value;
    // нужно закрыть форму
    closePopup(popupEditProfile);
}

popupEditProfile.addEventListener('submit', handleEditProfileForm); 

// добавляем открытие этого поп-апа
document.querySelector('.profile__edit-button').addEventListener('click', function () {  
    openPopup(popupEditProfile);
})

// добавляем событие на добавление карточки
const popupPlace = document.querySelector('#popupNewPlace');
const namePlaceInput = popupPlace.querySelector('[name="image-name"]');
const linkPlaceInput = popupPlace.querySelector('[name="image-link"]');

function handleAddElement (evt) {
    evt.preventDefault(); 
    if (namePlaceInput.value === '' || linkPlaceInput.value === '' ) {
        alert('Вы не заполнили данные для добавления карточки');
    } else {
        elementsOnline.prepend(createElementToElements(namePlaceInput.value, linkPlaceInput.value));
        // нужно закрыть форму
        closePopup(popupPlace);
    }
}

// добавляем открытие этого поп-апа
document.querySelector('.profile__batton-box').addEventListener('click', function () { 
    // очистим поля
    popupPlace.querySelectorAll('.popup__field').forEach(element => element.value = '');  
    // откроем поп-ап
    openPopup(popupPlace);
})

popupPlace.addEventListener('submit', handleAddElement); 

 // для крестиков нужно добавить событие
document.querySelectorAll('.popup').forEach(popupElement =>
    popupElement.querySelector('.popup__icon-container').addEventListener('click', function () {
        closePopup(popupElement);
    })
)
// добавляем предопределенные карточки
const initialCards = [
    {
        name: 'Лондон',
        link: 'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        name: 'Жираф',
        link: 'https://images.unsplash.com/photo-1610186355675-ccfb7dcbd513?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=482&q=80'
    },
    {
        name: 'Веллингтон',
        link: 'https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        name: 'Мельбурн',
        link: 'https://images.unsplash.com/photo-1602559227639-3bba8ce496df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        name: 'Осло',
        link: 'https://images.unsplash.com/photo-1608914876485-4e48b8d4b6c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        name: 'Киев',
        link: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
]; 

// создаем карточки отображаем на странице
initialCards.forEach(element => elementsOnline.prepend(createElementToElements(element.name,element.link)));

// закрытие поп-апа по клику
document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') == true) {
       // closePopup(document.querySelector('.popup_condition_opened'));
    }
})

// закрытие поп-апа по кнопке esc
document.addEventListener('keydown', function (evt) {
    popup = document.querySelector('.popup_condition_opened');
    if (evt.key = 'esc' && popup) {
        //closePopup(popup);
    }
})

//в а л и д а ц и я

settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: '.popup__submit-button_inactive',
    inputErrorClass: '.popup__field_type_error',
    errorClass: '.popup__field-error_active'
}

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
        submitButton.disabled = false;     
        submitButton.classList.remove(settings.inactiveButtonClass);
    } else {
        submitButton.disabled = true; 
        submitButton.classList.add(settings.inactiveButtonClass);
    }   
}

// добавляет всем инпутам слушателей
const setEventListeners = (formElement) => {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    // поля внутри формы
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            evt.preventDefault();
            isValid(formElement, inputElement);
            handleSubmitButton(buttonElement, inputList);
        });
    });
    // включаем/выключаем кнопку по умолчанию
    handleSubmitButton(buttonElement, inputList);
}; 

// подключет всю валидацию на странице, на вход подается объект вида:
//{
//    formSelector: '.popup__form',
//    inputSelector: '.popup__field',
//    submitButtonSelector: '.popup__submit-button',
//    inactiveButtonClass: 'popup__submit-button_inactive',
//    inputErrorClass: 'popup__field_type_error',
//    errorClass: 'popup__field-error_active'
//}
const enableValidation = () => {
    // ищем все формы
    const formsList = document.querySelectorAll(settings.formSelector);
    formsList.forEach(element => {
        element.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(element); 
    });
}; 

//подключаем валидацию
enableValidation();