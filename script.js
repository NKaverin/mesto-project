// добавляет картинке сердца смену картинки по клику 
function addEventClickOnHeart(element) {
    element.addEventListener('click', function () {
        if (element.src.includes('/vendor/images/heart.svg')) {
            element.src = './vendor/images/Fullheart.svg';
        }
        else {
            element.src = './vendor/images/heart.svg';
        }
    }); 
}

// добавляет ивент открытия поп-апа
function addEventOpenPopup(popupId, popupClassButtonName, clearValues = false, elemtitle = '', elemSrc = '') {
    let elementForPopup;
    if (typeof(popupClassButtonName) === 'string') {
        elementForPopup = document.querySelector('.' + popupClassButtonName)  
    } else {
        elementForPopup = popupClassButtonName;
    }
    elementForPopup.addEventListener('click', function () {
        popupElement = document.querySelector('#' + popupId);
        popupElement.classList.add('popup_condition_opened');
        // для крестика тоже нужно добавить событие
        popupElement.querySelector('.popup__icon-container').addEventListener('click', function () {
            popupElement.classList.remove('popup_condition_opened')
        })
        // очистим поля если надо
        if (clearValues === true) {
            popupElement.querySelectorAll('.popup__field').forEach(element => element.value = '');    
        }
        // меняем картинку и текст на поп-апе 
        console.log(elemSrc !== '');
        if (elemSrc !== '') {
            popupElement.querySelector('.popup__image').src = elemSrc;    
        }
        if (elemSrc !== '') {
            popupElement.querySelector('.popup__caption').textContent = elemtitle;    
        }
    })
}

// добавляет элемент в Elements
function addElementToElements(elemTitle='', elemSrc=''){
    // копируем шаблон
    const elementsTemplate = document.querySelector('#element-of-elements').content;
    const elementsOnline = document.querySelector('.elements');
    const elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
    // наполняем содержимым
    const elementsImage = elementsElement.querySelector('.elements__image'); 
    elementsImage.src = elemSrc;
    elementsImage.alt = elemTitle;
    elementsElement.querySelector('.elements__caption').textContent = elemTitle;
    //добавим попап-эвент
    addEventOpenPopup('popupImage', elementsImage, false, elemTitle, elemSrc);
    // добавляем клик на сердце
    addEventClickOnHeart(elementsElement.querySelector('.elements__heart-image'));
    // добавляем удаление при нажатии на кнопку удаления
    elementsElement.querySelector('.elements__delete-button').addEventListener('click', function () {
        elementsElement.remove();
    }); 
    // отображаем на странице
    elementsOnline.prepend(elementsElement); 
}

// добавляем событие на изменение профиля
const popupEditProfile = document.querySelector('#popupEditProfile');
const nameInput = popupEditProfile.querySelector('[name="profile-name"]');
const captionInput = popupEditProfile.querySelector('[name="profile-caption"]');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__caption').textContent = captionInput.value;
    // нужно закрыть форму
    popupEditProfile.classList.remove('popup_condition_opened');
}

popupEditProfile.addEventListener('submit', formSubmitHandler); 

// добавляем событие на добавление карточки
const popupPlace = document.querySelector('#popupNewPlace');
const namePlaceInput = popupPlace.querySelector('[name="image-name"]');
const linkPlaceInput = popupPlace.querySelector('[name="image-link"]');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    if (namePlaceInput.value === '' || linkPlaceInput.value === '' ) {
        alert('Вы не заполнили данные для добавления карточки');
    } else {
        addElementToElements(namePlaceInput.value, linkPlaceInput.value);
        // нужно закрыть форму
        popupPlace.classList.remove('popup_condition_opened');
    }
}

popupPlace.addEventListener('submit', formSubmitHandler); 

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

initialCards.forEach(element => addElementToElements(element.name,element.link));

// добавляем эвенты на поп-апы
addEventOpenPopup('popupEditProfile','profile__edit-button');
addEventOpenPopup('popupNewPlace','profile__batton-box', true);