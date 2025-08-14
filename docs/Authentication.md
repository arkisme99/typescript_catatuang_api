# Authentication API Spec

- [Register](#register)
- [Login](#login)
- [Logout](#logout)
- [Profile](#profile)
- [Update Profile](#update-profile)

---

**Error Response (4xx / 5xx):**

```json
{
  "success": false,
  "message": "Invalid email or password",
  "errors": null
}
```

---

## Register

#### Endpoint : POST `/api/auth/register`

**Request Body :**

```json
{
  "username": "johndoe",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "username": "johndoe",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  }
}
```

---

## Login

#### Endpoint : POST `/api/auth/login`

**Request Body :**

```json
{
  "username": "johndoe",
  "password": "secret123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }
}
```

## Logout

#### Endpoint : DELETE `/api/auth/logout`

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

---

## Profile

#### Endpoint : GET `/api/auth/profile`

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get User Profile Success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  }
}
```

---

## Update Profile

#### Endpoint : PATCH `/api/auth/profile`

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

**Success Response (200):**

```json
{
  "success": true,
  "message": "Update Profile Success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secret123",
    "avatar": null
  }
}
```

---
