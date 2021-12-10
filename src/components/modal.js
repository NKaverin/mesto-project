import {closePopup} from './utils.js';
import {createElementToElements} from './card.js';
import {patchUserInfo, putNewCard, patchUserAvatar} from './api.js'

const popupEditProfile = document.querySelector('#popupEditProfile');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const nameInput = popupEditProfile.querySelector('[name="profile-name"]');
const captionInput = popupEditProfile.querySelector('[name="profile-caption"]');
const elementsOnline = document.querySelector('.elements');
const popupPlace = document.querySelector('#popupNewPlace');
const namePlaceInput = popupPlace.querySelector('[name="image-name"]');
const linkPlaceInput = popupPlace.querySelector('[name="image-link"]');
const avatarLink= document.querySelector('#avatar-link');
const profileImage = document.querySelector('.profile__avatar');
const popupEditAvatar= document.querySelector('#popupPatchAvatar');
const submitButtonEditProfile = popupEditProfile.querySelector('.popup__submit-button');
const submitButtonAddElement = popupPlace.querySelector('.popup__submit-button');
const submitButtonProfileImage = popupEditAvatar.querySelector('.popup__submit-button');

export function handleEditProfileForm (evt) {
    handleSubmitButton(submitButtonEditProfile, true);
    patchUserInfo(nameInput.value, captionInput.value)
    .then((result) => {
        profileName.textContent = nameInput.value;
        profileCaption.textContent = captionInput.value;   
        // нужно закрыть форму
        closePopup(popupEditProfile);    
    })
    .catch ((error) => {
        console.log(error)
    })
    .finally(result => {
        handleSubmitButton(submitButtonEditProfile, false);
    });

}

export function handleAddElement (evt) {
    handleSubmitButton(submitButtonAddElement, true);
    putNewCard(namePlaceInput.value, linkPlaceInput.value)
    .then((result) => {
        elementsOnline.prepend(createElementToElements(result.name, result.link, result._id, result.owner._id, result.likes));
        // нужно закрыть форму
        closePopup(popupPlace);
            // очистим поля
        namePlaceInput.value = '';
        linkPlaceInput.value = '';
    })
    .catch ((error) => {
        console.log(error)
    })
    .finally(result => {
        handleSubmitButton(submitButtonAddElement, false);
    });
}

export function editProfileImage(evt) {
    handleSubmitButton(submitButtonProfileImage, true);
    patchUserAvatar(avatarLink.value)
    .then(result => {
        profileImage.src = result.avatar;
        closePopup(popupEditAvatar);
        avatarLink.value = '';
    })
    .catch ((error) => {
        console.log(error)
    })
    .finally(result => {
        handleSubmitButton(submitButtonProfileImage, false);
    });
}

function handleSubmitButton(submitButton, needToSave) {
    if (needToSave) {
        submitButton.textContent = 'Сохранение...';
    } else {
        submitButton.textContent = 'Сохранить';
    }
}