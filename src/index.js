import './index.css';

import {closePopup, openPopup} from './utils.js';
import {handleAddElement, handleEditProfileForm} from './modal.js';
import {createElementToElements} from './card.js';
import {enableValidation, handleSubmitButton} from './validate.js';

const elementsOnline = document.querySelector('.elements');
const popupEditProfile = document.querySelector('#popupEditProfile');
const nameInput = popupEditProfile.querySelector('[name="profile-name"]');
const captionInput = popupEditProfile.querySelector('[name="profile-caption"]');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const popupPlace = document.querySelector('#popupNewPlace');
// настройки для валидации
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};
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

popupEditProfile.addEventListener('submit', handleEditProfileForm); 

// добавляем открытие поп-апа редактирования
document.querySelector('.profile__edit-button').addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    captionInput.value = profileCaption.textContent;  
    openPopup(popupEditProfile);
})

// добавляем событие на добавление карточки
document.querySelector('.profile__batton-box').addEventListener('click', function () { 
    openPopup(popupPlace);
    // по умолчанию выключаем кнопку
    const submitButton = popupPlace.querySelector('.popup__submit-button');
    submitButton.disabled = true;
    submitButton.classList.add('popup__submit-button_inactive');
})

popupPlace.addEventListener('submit', handleAddElement); 

 // для крестиков нужно добавить событие
document.querySelectorAll('.popup').forEach(popupElement =>
    popupElement.querySelector('.popup__icon-container').addEventListener('click', function () {
        closePopup(popupElement);
    })
)

//подключаем валидацию
enableValidation(settings);

// создаем карточки отображаем на странице
initialCards.forEach(element => elementsOnline.prepend(createElementToElements(element.name,element.link)));
