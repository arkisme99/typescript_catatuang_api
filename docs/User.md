# User API Spec

- [Get User](#get-user)
- [Search User](#search-user)
- [Create User](#create-user)
- [Update User](#update-user)
- [Delete User](#delete-user)

---

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "avatar": null
}
```

**Data Response:**

```json
{
  "id": 1,
  "username": "johndoe",
  "name": "John Doe",
  "email": null,
  "password": "secret123",
  "avatar": null,
  "created_at": "2025-01-01 10:00:55",
  "updated_at": "2025-01-01 10:00:55"
}
```

**Error Response (4xx / 5xx):**

```json
{
  "success": false,
  "message": "Something Errors",
  "errors": null // null | error (object)
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
  "data": "" //Data Response
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
  "data": [], //Data Response
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
// Request Body
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Create Data Success",
  "data": "" //Data Response
}
```

---

## Update User

#### Endpoint : PATCH `/api/users/:id`

**Request Header :**

- X-API-TOKEN : token

**Request Body :**

```json
// Request Body
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Update Data Success",
  "data": "" //Data Response
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
