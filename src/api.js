const baseUrl = 'http://localhost:3030/user'

export function register(email, password) {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json' 
        },
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export function login(email, password) {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json' 
        },
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export function getPasswords(key, user) {
    return fetch(`${baseUrl}/passwords`, {
        method: 'GET',
        headers: {
            'key': key,
            'user': user
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export function getPassword(key, user, id) {
    return fetch(`${baseUrl}/password/${id}`, {
        method: 'GET',
        headers: {
            'key': key,
            'user': user
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export function createPassword(key, user, url, description, email, name, password) {
    return fetch(`${baseUrl}/password/create`, {
        method: 'POST',
        headers: {
            'key': key,
            'user': user,
            'content-type': 'application/json' 
        },
        body: JSON.stringify({url, description, email, name, password})
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export function deletePassword(key, user, id) {
    return fetch(`${baseUrl}/password/delete`, {
        method: 'DELETE',
        headers: {
            'key': key,
            'user': user,
            'content-type': 'application/json' 
        },
        body: JSON.stringify({id})
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}