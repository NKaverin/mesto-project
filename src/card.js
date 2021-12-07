import {openPopup} from './utils.js';
const fullHeartImage = new URL('../vendor/images/FullHeart.svg', import.meta.url);
const emptyHearttImage = new URL('../vendor/images/heart.svg', import.meta.url);
const popupElement = document.querySelector('#popupImage');
const popupImage = popupElement.querySelector('.popup__image');
const popupCaption = popupElement.querySelector('.popup__caption');

// добавляет картинке сердца смену картинки по клику 
function addHandlerClickOnHeart(element) {
    element.addEventListener('click', function () {
        if (element.src.includes(emptyHearttImage)) {
            element.src = fullHeartImage;
        }
        else {
            element.src = emptyHearttImage;
        }
    }); 
}

// функция создает карточку в elements
export function createElementToElements(elemTitle='', elemSrc=''){
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
