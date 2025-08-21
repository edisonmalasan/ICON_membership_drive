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
GET /members?filter[year]=2nd Year
```

Filter by multiple criteria:
```
GET /members?filter[year]=2nd Year&filter[course]=BSCS
```

Filter by date range (joined after a specific date):
```
GET /members?filter[joinedAt][gte]=2025-01-01
```

Filter by year and date range:
```
GET /members?filter[year]=3rd Year&filter[joinedAt][gte]=2025-01-01&filter[joinedAt][lte]=2025-12-31
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

## Filtering Implementation

The API supports MongoDB-style filtering on the GET /members endpoint through query parameters.

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

**Service (`memberService.js`):**
- Applies filters directly to MongoDB `find()` query
- Maintains default sorting by `joinedAt` (newest first)

### Filter Examples

**By Course:**
```
GET /members?filter[course]=BSCS
// MongoDB: { course: { $eq: "BSCS" } }
```

**By Year Range:**
```
GET /members?filter[year][gte]=2nd Year&filter[year][lte]=4th Year
// MongoDB: { year: { $gte: "2nd Year", $lte: "4th Year" } }
```

**By Join Date:**
```
GET /members?filter[joinedAt][gte]=2025-01-01
// MongoDB: { joinedAt: { $gte: "2025-01-01" } }
```

**Multiple Filters:**
```
GET /members?filter[year]=3rd Year&filter[course]=BSIT
// MongoDB: { year: { $eq: "3rd Year" }, course: { $eq: "BSIT" } }
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
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate']
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