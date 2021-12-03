// закрытие поп-апа
export function closePopup(popup) {
    popup.classList.remove('popup_condition_opened');
}

// открытие поп-апа
export function openPopup(popup) {
    popup.classList.add('popup_condition_opened');
}