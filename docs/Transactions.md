# Transactions API Spec

- [Get Transaction](#get-transaction)
- [Search Transaction](#search-transaction)
- [Create Transaction](#create-transaction)
- [Update Transaction](#update-transaction)
- [Delete Transaction](#delete-transaction)

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

## Get Transactions

#### Endpoint : GET `/api/transactions/:id`

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get Data Success",
  "data": {
    "id": 2,
    "transaction_date": "2025-07-29",
    "category_id": 1,
    "description": "Gaji Bulan Juli 2025",
    "amount": 25000000,
    "type": "income"
  }
}
```

---

## Search Transactions

#### Endpoint : GET `/api/transactions`

**Query Parameter :**

- transaction_date : string, Transactions transaction_date, optional
- description : string, Transactions description, optional
- amount : number, Transactions amount, optional
- type : string, Transactions type (income/expense), optional
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
      "id": 2,
      "transaction_date": "2025-07-29",
      "category_id": 1,
      "description": "Gaji Bulan Juli 2025",
      "amount": 25000000,
      "type": "income"
    },
    {
      "id": 3,
      "transaction_date": "2025-07-30",
      "category_id": 2,
      "description": "Token Listrik Bulan Agustus 2025",
      "amount": 350000,
      "type": "expense"
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

## Create Transactions

#### Endpoint : POST `/api/transactions`

**Request Header :**

- X-API-TOKEN : token

**Request Body :**

```json
{
  "transaction_date": "2025-07-29",
  "category_id": 1,
  "description": "Gaji Bulan Juli 2025",
  "amount": 25000000,
  "type": "income",
  "user_id": 1
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Create Data Success",
  "data": {
    "id": 2,
    "transaction_date": "2025-07-29",
    "category_id": 1,
    "description": "Gaji Bulan Juli 2025",
    "amount": 25000000,
    "type": "income"
  }
}
```

---

## Update Transactions

#### Endpoint : PUT `/api/transactions/:id`

**Request Header :**

- X-API-TOKEN : token

**Request Body :**

```json
{
  "transaction_date": "2025-07-29",
  "category_id": 1,
  "description": "Gaji Bulan Juli 2025",
  "amount": 25000000,
  "type": "income"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Update Data Success",
  "data": {
    "id": 2,
    "transaction_date": "2025-07-29",
    "category_id": 1,
    "description": "Gaji Bulan Juli 2025",
    "amount": 25000000,
    "type": "income"
  }
}
```

---

## Delete Transactions

#### Endpoint : DELETE `/api/transactions/:id`

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
