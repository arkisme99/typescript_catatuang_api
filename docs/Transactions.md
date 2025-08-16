# Transactions API Spec

- [Get Transactions](#get-transactions)
- [Search Transactions](#search-transactions)
- [Create Transactions](#create-transactions)
- [Update Transactions](#update-transactions)
- [Delete Transactions](#delete-transactions)

---

**Request Body:**

```json
{
  "transaction_date": "2025-07-29",
  "category_id": 1,
  "user_id": 1,
  "description": "Gaji Bulan Juli 2025",
  "month": 7,
  "year": 2025,
  "amount": 15955650.35
}
```

**Data Response:**

```json
{
  "id": 2,
  "transaction_date": "2025-07-29",
  "category_id": 1,
  "user_id": 1,
  "description": "Gaji Bulan Juli 2025",
  "month": 7,
  "year": 2025,
  "amount": "15955650.35",
  "type": "income",
  "created_at": "2025-01-01",
  "updated_at": "2025-01-01"
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

## Get Transactions

#### Endpoint : GET `/api/transactions/:id`

**Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get Data Success",
  "data": {} // Data response
}
```

- [Back To Top](#transactions-api-spec)

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
  "data": [], // Data Response
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

- [Back To Top](#transactions-api-spec)

## Create Transactions

#### Endpoint : POST `/api/transactions`

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

- [Back To Top](#transactions-api-spec)

## Update Transactions

#### Endpoint : PUT `/api/transactions/:id`

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
  "data": {} // Data Response
}
```

- [Back To Top](#transactions-api-spec)

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

- [Back To Top](#transactions-api-spec)
