import './index.css';

import {closePopup, openPopup} from './utils.js';
import {handleAddElement, handleEditProfileForm, editProfileImage} from './modal.js';
import {createElementToElements} from './card.js';
import {enableValidation, handleSubmitButton} from './validate.js';
import {getUserInfo, getCardsInfo, patchUserInfo} from './api.js'

const elementsOnline = document.querySelector('.elements');
const popupEditProfile = document.querySelector('#popupEditProfile');
const nameInput = popupEditProfile.querySelector('[name="profile-name"]');
const captionInput = popupEditProfile.querySelector('[name="profile-caption"]');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const profileImage = document.querySelector('.profile__avatar');
const popupPlace = document.querySelector('#popupNewPlace');
const blockAvatar = document.querySelector('.profile__avatar-container');
const popupEditAvatar= document.querySelector('#popupPatchAvatar');

export let profile;

// настройки для валидации
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

getUserInfo()
    .then((result) => {
        profileName.textContent = result.name;
        profileCaption.textContent= result.about; 
        profileImage.src = result.avatar;
        profile = result;
        // после того как получили профиль, можем добавлять карточки
        getCardsInfo()
        .then((result) => {
            result.forEach(element => elementsOnline.prepend(createElementToElements(element.name, element.link, element._id, element.owner._id, element.likes)));
        })
});

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

// события для изменения картинки профиля
blockAvatar.addEventListener('click', function () {
    openPopup(popupEditAvatar);
});
popupEditAvatar.addEventListener('submit', editProfileImage); 

//подключаем валидацию
enableValidation(settings);