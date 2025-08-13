# User API Spec

- [Get User](#get-user)
- [Search User](#search-user)
- [Create User](#create-user)
- [Update User](#update-user)
- [Delete User](#delete-user)

---

**Error Response (4xx / 5xx):**

```json
{
  "success": false,
  "message": "Something Errors",
  "errors": null
}
```

---

## Get User

#### Endpoint : GET `/api/users/:id`

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get Data Success",
  "data": {
    "id": 2,
    "name": "Lorem Ipsum",
    "email": "lorem@example.com",
    "avatar": null
  }
}
```

---

## Search User

#### Endpoint : GET `/api/users`

**Query Parameter :**

- name : string, user name, optional
- email : string, user email, optional
- page : number, default 1
- size : number, default 10

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get Data Success",
  "data": [
    {
      "id": 1,
      "name": "Jhon Doe",
      "email": "Jhon Doe@example.com",
      "avatar": null
    },
    {
      "id": 2,
      "name": "Lorem Ipsum",
      "email": "lorem@example.com",
      "avatar": null
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

---

## Create User

#### Endpoint : POST `/api/users`

**Request Header :**

- X-API-TOKEN : token

**Request Body :**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "avatar": null
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Create Data Success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null,
    "created_at": "2025-08-01 10:00:01",
    "updated_at": "2025-08-01 10:00:01"
  }
}
```

---

## Update User

#### Endpoint : PUT `/api/users/:id`

**Request Header :**

- X-API-TOKEN : token

**Request Body :**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Update Data Success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Delete User

#### Endpoint : DELETE `/api/users/:id`

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Delete Data Success",
  "data": null
}
```

---
