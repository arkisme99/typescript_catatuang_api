# Category API Spec

- [Get Category](#get-category)
- [Search Category](#search-category)
- [Create Category](#create-category)
- [Update Category](#update-category)
- [Delete Category](#delete-category)

---

**Request Body:**

```json
{
  "name": "Gaji Kantor",
  "type": "income",
  "images": null
}
```

**Data Response:**

```json
{
  "id": 1,
  "name": "Gaji Kantor",
  "type": "income",
  "images": null,
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

---

## Get Category

#### Endpoint : GET `/api/categories/:id`

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get Data Success",
  "data": {} // Data Response
}
```

- [Back To Top](#category-api-spec)

## Search Category

#### Endpoint : GET `/api/categories`

**Query Parameter :**

- name : string, Category name, optional
- type : string, Category type (income/expense), optional
- page : number, default 1
- size : number, default 10

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get Data Success",
  "data": [], // Data Response
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

- [Back To Top](#category-api-spec)

## Create Category

#### Endpoint : POST `/api/categories`

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
  "data": {} // Data Response
}
```

- [Back To Top](#category-api-spec)

## Update Category

#### Endpoint : PATCH `/api/categories/:id`

**Request Header :**

- X-API-TOKEN : token

**Request Body :**

```json
// Request Body, Optional fields
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Update Data Success",
  "data": {} // Data Response
}
```

- [Back To Top](#category-api-spec)

## Delete Category

#### Endpoint : DELETE `/api/categories/:id`

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

- [Back To Top](#category-api-spec)
