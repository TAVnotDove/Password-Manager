# Backend API Documentation

This is the API documentation where you will be able to find information on all the endpoints for the "Pssword Manager" project.

<br>

The base URL is: `localhost:3030/user` and all requests are done to it.

Below is a list of all endpoints, methods, accepted values, accepted headers and results  
All the information is structured in the same way:

```
/route [METHOD]
>auth info / headers

Request body

Response

Status code table
```

---

## Auth

> All routes _except /register and /login_ require `key` and `user` in the headers for authorization!

Unauthorized access will return an error code and will not provide access to the internal data

<br>

| Status |     Code     |     Response      |
| :----: | :----------: | :---------------: |
|  401   | Unauthorized |   'Invalid key'   |
|  401   | Unauthorized | 'No key provided' |

---

## User

All actions related to the user and not his data

<br>

## /register [POST]

Accepts a json object with an email and password:

```json
{
  "email": "stefano",
  "password": "123456789"
}
```

And it returns a key:

```json
{
  "key": "70LMZ6nF089Nb0KEyoLww1LFq8mW30qZe3iFpm3JJ0ZJ0UFS"
}
```

| Status |         Code          |            Response            |
| :----: | :-------------------: | :----------------------------: |
|  201   |        Created        |       {key : 'somekey'}        |
|  403   |       Forbidden       |    'User already in exists'    |
|  500   | Internal Server Error | 'Error while hashing password' |

<br>
  
> Remeber to set a header `key` with the provided key and a header `user` with the provided email!

---

## /login [POST]

Same as register, accepts a json object with an email and password

<br>

Returns the key for the user

<br>

| Status |         Code          |             Response             |
| :----: | :-------------------: | :------------------------------: |
|  201   |        Created        |        {key : 'somekey'}         |
|  401   |     Unauthorized      |         'Wrong password'         |
|  404   |       Not Found       |      'User does not exist'       |
|  500   | Internal Server Error | 'Error while comparing password' |

<br>
> Remeber to set a header `key` with the provided key and a header `user` with the provided email!

---

## /update [PUT]

> Requires auth headers `key` and `user`

<br>

Accepts a json object containing the new name:

```json
{
  "email": "stefano"
}
```

OR only a password

```json
{
  "password": "123456789"
}
```

<br>

Returns only a ststus code

| Status |         Code          |            Response            |
| :----: | :-------------------: | :----------------------------: |
|  200   |          OK           |        'Email updated'         |
|  201   |        Created        |       {key : 'somekey'}        |
|  403   |       Forbidden       |    'User already in exists'    |
|  403   |       Forbidden       |  'You cant update like that'   |
|  500   | Internal Server Error | 'Error while hashing password' |

---

## /delete [DELETE]

> Requires auth headers `key` and `user`

<br>

Does not require anything in the body

Returns a status code

| Status | Code |    Response    |
| :----: | :--: | :------------: |
|  200   |  OK  | 'User deleted' |

---

## Passwords

All actions related to the passwords of the logged in user

<br>

## /passwords [GET]

> Requires auth headers `key` and `user`

<br>

Does not require anything in the body

<br>

Returns a list of all passwords for the current user:

```json
{
  "f9b12b91-680d-4857-85a0-48a2ec75248f": {
    "_id": "f9b12b91-680d-4857-85a0-48a2ec75248f",
    "url": "google.com",
    "description": "my google account yeyaa",
    "email": "stefano@gamermail.com",
    "name": "stefano",
    "password": "123456789"
  },
  "02bfc0d9-911d-4e3f-afdd-34c7933bf566": {
    "_id": "02bfc0d9-911d-4e3f-afdd-34c7933bf566",
    "url": "facebook.com",
    "description": "my favorite place!!",
    "email": "stefano@gamermail.com",
    "name": "stefano",
    "password": "246813579"
  }
}
```

| Status | Code |  Response   |
| :----: | :--: | :---------: |
|  200   |  OK  | JSON object |

---

## /password/:id [GET]

> Requires auth headers `key` and `user`

<br>

Does not require anything in the body
The url paramater `id` refers to the ID of a password.

<br>

Returns a list of all passwords for the current user:

```json
{
  "f9b12b91-680d-4857-85a0-48a2ec75248f": {
    "_id": "f9b12b91-680d-4857-85a0-48a2ec75248f",
    "url": "google.com",
    "description": "my google account yeyaa",
    "email": "stefano@gamermail.com",
    "name": "stefano",
    "password": "123456789"
  },
  "02bfc0d9-911d-4e3f-afdd-34c7933bf566": {
    "_id": "02bfc0d9-911d-4e3f-afdd-34c7933bf566",
    "url": "facebook.com",
    "description": "my favorite place!!",
    "email": "stefano@gamermail.com",
    "name": "stefano",
    "password": "246813579"
  }
}
```

| Status | Code |  Response   |
| :----: | :--: | :---------: |
|  200   |  OK  | JSON object |

---

## /password/create [POST]

> Requires auth headers `key` and `user`

<br>

Accepts a json file with the contents of the password  
The `email` and `password` feilds are mandatory, everything else is optional

```json
{
  "url": "facebook.com",
  "description": "my favorite place!!",
  "email": "stefano@gamermail.com",
  "name": "stefano",
  "password": "246813579"
}
```

<br>

Retuns only a status code

| Status |    Code     |        Response        |
| :----: | :---------: | :--------------------: |
|  201   |   Created   |    'Entry created'     |
|  400   | Bad Request |   'No user provided'   |
|  400   | Bad Request | 'No password provided' |

---

## /password/update [PATCH]

> Requires auth headers `key` and `user`

<br>

Accepts a json file with the password ID and updated info of the password  
The `ID` and `updates` feilds are mandatory, everything else is optional

```json
{
  "id": "f9b12b91-680d-4857-85a0-48a2ec75248f",
  "updates": {
    "url": "NOT google.com",
    "name": "NOT stefano",
    "password": "987654321"
  }
}
```

<br>

Retuns only a status code

| Status |    Code     |          Response          |
| :----: | :---------: | :------------------------: |
|  200   |     OK      | 'Password details updated' |
|  400   | Bad Request |    'Nothing to update'     |
|  410   |    Gone     |    'Password not found'    |

---

## /password/delete [DELETE]

> Requires auth headers `key` and `user`

<br>

Accepts a json file with the password ID:

```json
{
  "id": "f9b12b91-680d-4857-85a0-48a2ec75248f"
}
```

<br>

Retuns only a status code

| Status | Code |       Response       |
| :----: | :--: | :------------------: |
|  200   |  OK  |   'Entry deleted'    |
|  410   | Gone | 'Password not found' |

---

<br> <br>

## Author

Contact in if you find bugs.

GitHub: [GameBear64](https://github.com/GameBear64)
