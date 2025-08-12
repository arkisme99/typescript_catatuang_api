# Reports API Spec

- [Summary By Date](#summary-by-date)

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

## Summary By Date

#### Endpoint : GET `/api/reports/summary`

**Query Parameter :**

- start_date : string, start date from transaction date, default : now
- end_date : string, end date from transaction date, default : now

  **Request Header :**

- X-API-TOKEN : token

**Success Response (200):**

```json
{
  "success": true,
  "message": "Get Data summary report by date success",
  "data": {
    "start_date": "2025-01-01",
    "end_date": "2025-08-31",
    "total_income": 10000000,
    "total_expense": 3500000,
    "balance": 6500000
  }
}
```

---
