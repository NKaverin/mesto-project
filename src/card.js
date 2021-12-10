import {openPopup} from './utils.js';
import {profile} from './index.js';
import {deleteCard, deleteLikeCard, putLikeCard} from './api';
const fullHeartImage = new URL('../vendor/images/FullHeart.svg', import.meta.url);
const emptyHearttImage = new URL('../vendor/images/heart.svg', import.meta.url);
const popupElement = document.querySelector('#popupImage');
const popupImage = popupElement.querySelector('.popup__image');
const popupCaption = popupElement.querySelector('.popup__caption');


function isLiked(likes) {
    let isLiked = false;
        likes.forEach(likeElement => {
            if (likeElement._id == profile._id){
                isLiked = true;
            }
        });
    return isLiked
}
// добавляет картинке сердца смену картинки по клику 
function addHandlerClickOnHeart(element, likes=[], cardId, elementsLikesCount) {
    element.addEventListener('click', function () {  
        const alredyLiked = isLiked(likes);
        if (element.src.includes(emptyHearttImage)) {
            putLikeCard(cardId)
            .then((result) => {
                element.src = fullHeartImage;
                elementsLikesCount.textContent = result.likes.length;
            })           
        }
        else {
            deleteLikeCard(cardId)
            .then((result) => {
                elementsLikesCount.textContent = result.likes.length;
                element.src = emptyHearttImage;
            })
        }
    }); 
}

// функция создает карточку в elements
export function createElementToElements(elemTitle='', elemSrc='', elemId='', ownerId='', likes=[]){
    // копируем шаблон
    const elementsTemplate = document.querySelector('#element-of-elements').content;
    const elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
    // наполняем содержимым
    const elementsImage = elementsElement.querySelector('.elements__image'); 
    const elementsLikesCount = elementsElement.querySelector('.elements__like-count'); 
    const elementsHeartImage = elementsElement.querySelector('.elements__heart-image');
    elementsImage.src = elemSrc;
    elementsImage.alt = elemTitle;
    elementsLikesCount.textContent = likes.length;
    elementsElement.querySelector('.elements__caption').textContent = elemTitle;
    
    //добавим попап-эвент
    elementsImage.addEventListener('click', function () {
        popupImage.src = elemSrc;    
        popupCaption.textContent = elemTitle;    
        openPopup(popupElement);
    })
    // красим лайк
    if (isLiked(likes)) {
        elementsHeartImage.src = fullHeartImage;
    }
    // добавляем клик на сердце
    addHandlerClickOnHeart(elementsHeartImage, likes, elemId, elementsLikesCount);
    // добавляем удаление при нажатии на кнопку удаления
    if (profile && ownerId == profile._id) {
        elementsElement.querySelector('.elements__delete-button').addEventListener('click', function () {
            deleteCard(elemId);
            elementsElement.remove();
        }); 
    } else {
        // иначе не показываем кнопку удаления
        elementsElement.querySelector('.elements__delete-button').classList.add('elements__delete-button_inactive');
    }
    return elementsElement; 
}
