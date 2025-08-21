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

Retrieve all members (Admin only).

**Authentication Required:** Admin

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