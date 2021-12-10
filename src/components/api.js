const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
    header : {
        authorization: 'edb337f4-5eff-4c15-9f71-2df3692653d4',
        'Content-Type': 'application/json'
    }
}

// проверка результата ответа
function checkResult(result) {
    if (result.ok) {
        return result.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}
// получаем информацию о пользователе 
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.header
    })
    .then(res => {
        return checkResult(res);
    })
}

// получаем информацию о карточках
export function getCardsInfo() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.header 
    })
    .then(res => { 
        return checkResult(res);
    })
}

// меняем имя и информацию о пользователе
export function patchUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.header,
        body: JSON.stringify({
            name,
            about
        })
    })  
    .then(res => {
        return checkResult(res)
    })
}

// ставим лайк карточке
export function putLikeCard(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.header   
    })
    .then(res => {
        return checkResult(res)
    })
}

// убираем лайк у карточки
export function deleteLikeCard(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.header,   
    })
    .then(res => {
        return checkResult(res)
    })
}

// меняем аватар
export function patchUserAvatar(avatar) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me/avatar', {
        method: 'PATCH',
        headers: config.header,
        body: JSON.stringify({
            avatar
        })
    })   
    .then(res => {
        return checkResult(res)
    })  
}

// добавляем карточку
export function putNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.header,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })  
    .then(res => {
        return checkResult(res);
    })   
}

// удаляем карточку
export function deleteCard(card_id) {
    return fetch(`${config.baseUrl}/cards/${card_id}`, {
        method: 'DELETE',
        headers: config.header
    })  
    .then(res => {
        return checkResult(res);
    })   
}