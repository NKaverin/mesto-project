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


export function handleEditProfileForm (evt) {
    const submitButton = popupEditProfile.querySelector('.popup__submit-button');
    handleSubmitButton(submitButton, true);
    patchUserInfo(nameInput.value, captionInput.value)
    .then((result) => {
        profileName.textContent = nameInput.value;
        profileCaption.textContent = captionInput.value;   
        // нужно закрыть форму
        closePopup(popupEditProfile);    
    })
    .finally(result => {
        handleSubmitButton(submitButton, false);
    });

}

export function handleAddElement (evt) {
    const submitButton = popupPlace.querySelector('.popup__submit-button');
    handleSubmitButton(submitButton, true);
    putNewCard(namePlaceInput.value, linkPlaceInput.value)
    .then((result) => {
        elementsOnline.prepend(createElementToElements(result.name, result.link, result._id, result.owner._id, result.likes));
        // нужно закрыть форму
        closePopup(popupPlace);
    })
    .finally(result => {
        handleSubmitButton(submitButton, false);
    });
    // очистим поля
    namePlaceInput.value = '';
    linkPlaceInput.value = '';
}

export function editProfileImage(evt) {
    const submitButton = popupEditAvatar.querySelector('.popup__submit-button');
    handleSubmitButton(submitButton, true);
    patchUserAvatar(avatarLink.value)
    .then(result => {
        profileImage.src = result.avatar;
        closePopup(popupEditAvatar);
        avatarLink.value = '';
    })
    .finally(result => {
        handleSubmitButton(submitButton, false);
    });
}

function handleSubmitButton(submitButton, needToSave) {
    if (needToSave) {
        submitButton.textContent = 'Сохранение...';
    } else {
        submitButton.textContent = 'Сохранить';
    }

}