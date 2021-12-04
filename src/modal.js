import {closePopup} from './utils.js';
import {createElementToElements} from './card.js';

const popupEditProfile = document.querySelector('#popupEditProfile');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const nameInput = popupEditProfile.querySelector('[name="profile-name"]');
const captionInput = popupEditProfile.querySelector('[name="profile-caption"]');
const elementsOnline = document.querySelector('.elements');

export function handleEditProfileForm (evt) {
    profileName.textContent = nameInput.value;
    profileCaption.textContent = captionInput.value;
    // нужно закрыть форму
    closePopup(popupEditProfile);
}

const popupPlace = document.querySelector('#popupNewPlace');
const namePlaceInput = popupPlace.querySelector('[name="image-name"]');
const linkPlaceInput = popupPlace.querySelector('[name="image-link"]');

export function handleAddElement (evt) {
    elementsOnline.prepend(createElementToElements(namePlaceInput.value, linkPlaceInput.value));
    // нужно закрыть форму
    closePopup(popupPlace);
    // очистим поля
    namePlaceInput.value = '';
    linkPlaceInput.value = '';
}