# ICON Membership Drive API v2 Documentation

Base URL: `http://localhost:3000/api/v2`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Role-Based Access Control

- **guest**: Public access (no authentication required)
- **member**: Basic member access
- **admin**: Administrative privileges
- **superuser**: Super admin access via secret key

### Superuser Authentication

For superuser access, include the secret key in headers:

```
secret_key: <SECRET_KEY>
```

---

## Authentication Endpoints

### POST /auth/login

Authenticate a member and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "member": {
    "_id": "...",
    "name": "John Doe",
    "year": "2nd Year",
    "course": "BSCS",
    "email": "user@example.com",
    "role": "member",
    "joinedAt": "2025-08-19T13:41:43.211Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials

---

## Member Endpoints

### GET /members

Retrieve all members with optional filtering (Admin only).

**Authentication Required:** Admin

**Query Parameters:**
- `filter` (object, optional): Filter criteria for member data

**Filter Operators:**
- `eq`: Equals (default for simple values)
- `gte`: Greater than or equal to
- `lte`: Less than or equal to

**Filter Examples:**

Filter by year:
```
GET /members?filter[year]=2
```

Filter by multiple criteria:
```
GET /members?filter[year]=2&filter[course]=BSCS
```

Filter by date range (joined after a specific date):
```
GET /members?filter[joinedAt][gte]=2025-01-01
```

Filter by year and date range:
```
GET /members?filter[year]=3&filter[joinedAt][gte]=2025-01-01&filter[joinedAt][lte]=2025-12-31
```

Filter by payment status:
```
GET /members?filter[status]=Paid
```

**Response (200 OK):**
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    "year": "2nd Year",
    "course": "BSCS",
    "email": "user@example.com",
    "role": "member",
    "joinedAt": "2025-08-19T13:41:43.211Z",
    "__v": 0
  }
]
```

**Error Responses:**
- `401` - Authentication required
- `403` - Admin access required
- `500` - Internal server error

### POST /members

Create a new member.

**Authentication Required:** Guest, Admin, or Superuser

**Request Body:**
```json
{
  "name": "John Doe",
  "year": "2nd Year",
  "course": "BSCS",
  "email": "user@example.com",
  "password": "password123",  // Admin only
  "role": "member"            // Admin only
}
```

**Notes:**
- `password` and `role` fields can only be set by administrators
- If not provided by admin, `role` defaults to "member"
- Public registration (guest access) only allows basic member info

**Response (201 Created):**
```json
{
  "_id": "...",
  "name": "John Doe",
  "year": "2nd Year",
  "course": "BSCS",
  "email": "user@example.com",
  "role": "member",
  "joinedAt": "2025-08-19T13:41:43.211Z",
  "__v": 0
}
```

**Error Responses:**
- `403` - Only admins can set password or role
- `409` - Email already exists
- `500` - Internal server error

### GET /members/count

Get the total number of registered members.

**Authentication Required:** Guest (public access)

**Response (200 OK):**
```json
{
  "count": 42
}
```

**Error Responses:**
- `500` - Internal server error

### GET /members/export/csv

Export all members data as CSV file (Admin only).

**Authentication Required:** Admin

**Response (200 OK):**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="members.csv"

Name,Year,Course,Email,Joined At
"John Doe","2nd Year","BSCS","user@example.com","2025-08-19T13:41:43.211Z"
```

**Error Responses:**
- `401` - Authentication required
- `403` - Admin access required
- `500` - Internal server error

---

## Payment Endpoints

### GET /payments

Retrieve all payments with optional filtering (Admin only).

**Authentication Required:** Admin

**Query Parameters:**
- `filter` (object, optional): Filter criteria for payment data using same filtering system as members

**Response (200 OK):**
```json
[
  {
    "_id": "...",
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "year": 3,
      "course": "BSCS",
      "role": "member"
    },
    "amount": 500,
    "paymentMethod": "Digital",
    "status": "Paid",
    "transactionId": "TXN123456789",
    "remarks": "Membership fee payment",
    "screenshot": "1724441234567-screenshot.jpg",
    "createdAt": "2025-08-23T10:30:00.000Z"
  }
]
```

**Error Responses:**
- `401` - Authentication required
- `403` - Admin access required
- `500` - Internal server error

### GET /payments/:id

Retrieve a specific payment by ID (Admin only).

**Authentication Required:** Admin

**Response (200 OK):**
```json
{
  "_id": "...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "year": 3,
    "course": "BSCS",
    "role": "member"
  },
  "amount": 500,
  "paymentMethod": "Digital",
  "status": "Paid",
  "transactionId": "TXN123456789",
  "remarks": "Membership fee payment",
  "screenshot": "1724441234567-screenshot.jpg",
  "createdAt": "2025-08-23T10:30:00.000Z"
}
```

**Error Responses:**
- `401` - Authentication required
- `403` - Admin access required
- `404` - Payment not found
- `500` - Internal server error

### POST /payments

Create a new payment record.

**Authentication Required:** Member or Admin

**Request Body:**
```json
{
  "user": "66c123456789abcd12345678",  // Member ObjectId
  "amount": 500,
  "paymentMethod": "Digital",
  "transactionId": "TXN123456789",
  "remarks": "Membership fee payment"
}
```

**Notes:**
- For Digital payments, screenshot upload is required
- Payment status automatically set based on payment method:
  - Digital: "Pending" (requires verification)
  - Cash: "Unpaid" (requires manual confirmation)

**Response (201 Created):**
```json
{
  "_id": "...",
  "user": "66c123456789abcd12345678",
  "amount": 500,
  "paymentMethod": "Digital",
  "status": "Pending",
  "transactionId": "TXN123456789",
  "remarks": "Membership fee payment",
  "createdAt": "2025-08-23T10:30:00.000Z"
}
```

**Error Responses:**
- `400` - Missing required fields
- `401` - Authentication required
- `500` - Internal server error

### PUT /payments/:id

Update a payment record (Admin only).

**Authentication Required:** Admin

**Request Body:**
```json
{
  "status": "Paid",
  "remarks": "Payment verified and approved"
}
```

**Response (200 OK):**
```json
{
  "_id": "...",
  "user": "66c123456789abcd12345678",
  "amount": 500,
  "paymentMethod": "Digital",
  "status": "Paid",
  "transactionId": "TXN123456789",
  "remarks": "Payment verified and approved",
  "screenshot": "1724441234567-screenshot.jpg",
  "createdAt": "2025-08-23T10:30:00.000Z"
}
```

**Error Responses:**
- `401` - Authentication required
- `403` - Admin access required
- `404` - Payment not found
- `500` - Internal server error

---

## Filtering Implementation

The API supports MongoDB-style filtering on the GET /members and GET /payments endpoints through query parameters.

### Filter Query Structure

Filters are passed as query parameters using the `filter` object notation:

**Simple Equality:**
```
?filter[fieldName]=value
```
Translates to MongoDB: `{ fieldName: { $eq: value } }`

**Comparison Operators:**
```
?filter[fieldName][operator]=value
```
Translates to MongoDB: `{ fieldName: { $operator: value } }`

### Supported Operators

- `eq`: Exact match (default for simple values)
- `gte`: Greater than or equal to
- `lte`: Less than or equal to

### Implementation Details

**Parse Function (`routeUtil.js`):**
- Converts URL query parameters to MongoDB filter objects
- Adds `$` prefix to comparison operators
- Wraps simple values in `$eq` operator
- Validates operators against allowed list

**Controller (`memberController.js`):**
- Parses filters using `parseFilters` utility
- Passes validated filters to service layer
- Logs applied filters for debugging

**Controller (`paymentController.js`):**
- Uses same filtering system for payment queries
- Supports filtering by payment status, method, amount, etc.

**Service (`memberService.js`):**
- Applies filters directly to MongoDB `find()` query
- Maintains default sorting by `joinedAt` (newest first)

**Service (`paymentService.js`):**
- Applies filters to payment queries with user population
- Returns payment data with populated member information

### Filter Examples

**By Course:**
```
GET /members?filter[course]=BSCS
// MongoDB: { course: { $eq: "BSCS" } }
```

**By Year Range:**
```
GET /members?filter[year][gte]=2&filter[year][lte]=4
// MongoDB: { year: { $gte: 2, $lte: 4 } }
```

**By Join Date:**
```
GET /members?filter[joinedAt][gte]=2025-01-01
// MongoDB: { joinedAt: { $gte: "2025-01-01" } }
```

**Multiple Filters:**
```
GET /members?filter[year]=3&filter[course]=BSIT
// MongoDB: { year: { $eq: 3 }, course: { $eq: "BSIT" } }
```

**Payment Filter Examples:**

**By Payment Status:**
```
GET /payments?filter[status]=Paid
// MongoDB: { status: { $eq: "Paid" } }
```

**By Payment Method:**
```
GET /payments?filter[paymentMethod]=Digital
// MongoDB: { paymentMethod: { $eq: "Digital" } }
```

**By Amount Range:**
```
GET /payments?filter[amount][gte]=100&filter[amount][lte]=1000
// MongoDB: { amount: { $gte: 100, $lte: 1000 } }
```

**By Date Range:**
```
GET /payments?filter[createdAt][gte]=2025-08-01
// MongoDB: { createdAt: { $gte: "2025-08-01" } }
```

---

## Data Models

### Member Schema

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5]
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'member'],
    default: 'member'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Payment Schema

```javascript
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Digital']
  },
  status: {
    type: String,
    required: true,
    enum: ['Unpaid', 'Paid', 'Pending'],
    default: function() {
      if (this.paymentMethod === 'Digital') {
        return 'Pending';
      } else {
        return 'Unpaid';
      }
    }
  },
  transactionId: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: true
  }
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message description",
  "message": "Detailed error information"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## Rate Limiting

Currently no rate limiting is implemented. Consider implementing rate limiting for production use.

---

## Security Notes

1. **Passwords are currently stored in plain text** - Implement password hashing before production
2. **JWT tokens expire in 4 hours**
3. **CORS is enabled** - Configure appropriately for production
4. **Input validation** is performed on required fields
5. **Role-based access control** restricts sensitive operations

---

## Development URLs

- **API Base:** http://localhost:3000/api/v2
- **Student Registration:** http://localhost:3000/student
- **Admin Dashboard:** http://localhost:3000/admin
- **Database UI (Mongo Express):** http://localhost:8081

---

## Docker Setup

The API runs in a Docker container with the following services:
- **Backend:** Node.js application (Port 3000)
- **Database:** MongoDB (Port 27017)
- **Database UI:** Mongo Express (Port 8081)

Start with: `docker compose up --build`