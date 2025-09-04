# Authentication API Spec

- [Register](#register)
- [Login](#login)
- [Logout](#logout)
- [Profile](#profile)
- [Update Profile](#update-profile)

---

**Request Body:**

```json
{
  "id": 1, //Update API ini digunakan
  "username": "johndoe", //untuk login
  "name": "John Doe", //untuk login
  "email": "john@example.com",
  "password": "secret123"
}
```

**Data Response:**

```json
{
  "id": 1, //Update API ini digunakan
  "username": "johndoe", //untuk login
  "name": "John Doe", //untuk login
  "email": "john@example.com",
  "password": "secret123",
  "token": "asfasfe123123asdfasdf....", //jwt token hanya tampil saat login n refres token
  "created_at": "2025-01-01 10:00:55",
  "updated_at": "2025-01-01 10:00:55"
}
```

**Error Response (4xx / 5xx):**

```json
{
  "success": false,
  "message": "Something Errors",
  "errors": null
}
```

- [Back To Top](#authentication-api-spec)

---

## Register

#### Endpoint : POST `/api/auth/register`

**Request Body :**

```json
//Request Body
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": // Data Response
}
```

---

## Login

#### Endpoint : POST `/api/auth/login`

**Request Body :**

```json
//Request Body [username, password]
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": //Data Response
}
```

- [Back To Top](#authentication-api-spec)

## Logout

#### Endpoint : DELETE `/api/auth/logout`

**Request Header :**

- Authorization: Bearer <token>

**Success Response (200):**

```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

- [Back To Top](#authentication-api-spec)

---

## Profile

#### Endpoint : GET `/api/auth/profile`

**Request Header :**

- Authorization: Bearer <token>

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get User Profile Success",
  "data": //Data Response
}
```

- [Back To Top](#authentication-api-spec)

---

## Update Profile

#### Endpoint : PATCH `/api/auth/profile`

**Request Header :**

- Authorization: Bearer <token>

**Request Body :**

```json
//Request Body, optional
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Update Profile Success",
  "data": //Data response
}
```

- [Back To Top](#authentication-api-spec)

---
