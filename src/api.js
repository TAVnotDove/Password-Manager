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