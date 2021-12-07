// закрытие поп-апа
export function closePopup(popup) {
    if (popup) {
        popup.classList.remove('popup_condition_opened');
        popup.removeEventListener('keydown', closePopupOnEsc);
        popup.removeEventListener('click', closePopupOnClick);
    }
}

// открытие поп-апа
export function openPopup(popup) {
    if (popup) {
        popup.classList.add('popup_condition_opened');
        popup.addEventListener('keydown', closePopupOnEsc);
        popup.addEventListener('click', closePopupOnClick);
    }
}

// закрытие поп-апа по клику
function closePopupOnClick(evt) {
    if (evt.target.classList.contains('popup') == true) {
        closePopup(document.querySelector('.popup_condition_opened'));
    }
}

// закрытие поп-апа по кнопке esc
function closePopupOnEsc(evt) {
    if (evt.key == 'Escape' && popup) {
        const popup = document.querySelector('.popup_condition_opened');
        closePopup(popup);
    }
}
