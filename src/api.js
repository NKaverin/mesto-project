// получаем информацию о пользователе 
export function getUserInfo() {
    fetch('https://nomoreparties.co/v4/cohortId/users/me', {
        method: 'GET',
        headers: {
            authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
        }  
    })
    .then(res => { 
        if (res.ok) {
            res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

// получаем информацию о карточках
export function getCardsInfo() {
    fetch('https://nomoreparties.co/v4/cohortId/cards', {
        method: 'GET',
        headers: {
            authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
        }  
    })
    .then(res => { 
        if (res.ok) {
            res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

// меняем имя и информацию о пользователе
export function patchUserInfo(newName, newAbout) {
    fetch('https://nomoreparties.co/v4/cohortId/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    })     
}

// ставим лайк карточке
export function putLikeCard(id) {
    fetch('https://nomoreparties.co/v4/cohortId/cards/likes/cardId', {
        method: 'PUT',
        headers: {
            authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
        },
        body: JSON.stringify({
            _id: id
        })     
    })
    .then(res => { 
        if (res.ok) {
            res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

// убираем лайк у карточки
export function deleteLikeCard(id) {
    fetch('https://nomoreparties.co/v4/cohortId/cards/likes/cardId', {
        method: 'PUT',
        headers: {
            authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
        },
        body: JSON.stringify({
            _id: id
        })     
    })
    .then(res => { 
        if (res.ok) {
            res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

// меняем аватар
export function patchUserAvatar(newAvatar) {
    fetch('https://nomoreparties.co/v4/cohortId/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatar
        })
    })     
}

// добавляем карточку
export function putNewCard(newName, newLink) {
    fetch('https://nomoreparties.co/v4/cohortId/cards ', {
        method: 'PUT',
        headers: {
            authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            link: newLink
        })
    })     
}