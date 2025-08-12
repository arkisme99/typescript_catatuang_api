# Category API Spec

- [Get Category](#get-category)
- [Search Category](#search-category)
- [Create Category](#create-category)
- [Update Category](#update-category)
- [Delete Category](#delete-category)

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

## Get Category

#### Endpoint : GET `/api/categories/:id`

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get Data Success",
  "data": {
    "id": 2,
    "name": "Gaji Kantor",
    "type": "income",
    "images": null
  }
}
```

---

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
  "data": [
    {
      "id": 1,
      "name": "Gaji Kantor",
      "type": "income",
      "images": null
    },
    {
      "id": 2,
      "name": "Tagihan Listrik",
      "type": "expense",
      "images": null
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

## Create Category

#### Endpoint : POST `/api/categories`

**Request Header :**

- X-API-TOKEN : token

**Request Body :**

```json
{
  "name": "Gaji Kantor",
  "type": "income",
  "images": null
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Create Data Success",
  "data": {
    "id": 1,
    "name": "Gaji Kantor",
    "type": "income",
    "images": null
  }
}
```

---

## Update Category

#### Endpoint : PUT `/api/categories/:id`

**Request Header :**

- X-API-TOKEN : token

**Request Body :**

```json
{
  "name": "Gaji Kantor",
  "type": "income",
  "images": null
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Update Data Success",
  "data": {
    "id": 1,
    "name": "Gaji Kantor",
    "type": "income",
    "images": null
  }
}
```

---

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

---
