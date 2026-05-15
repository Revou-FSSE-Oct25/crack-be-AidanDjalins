# Chinoss Coffeeshop — Backend Specification

## Project Overview

This is the backend system for Chinoss, a coffeeshop web application. The frontend already exists. This backend serves the frontend's data needs: authentication, product listings, inquiry and event booking submissions, transaction history, and location data for a Leaflet map.

No online transactions take place. The backend does not handle payments.

---

## Tech Stack

- Framework: NestJS
- ORM: Prisma
- Database: PostgreSQL, deployed on Supabase
- API Documentation: Swagger (via @nestjs/swagger)
- Deployment: Railway
- Auth: JWT (JSON Web Tokens)

---

## Folder Architecture

```
src/
  auth/
  users/
  products/
  transactions/
  locations/
  inquiries/
    dto/
      create-inquiry.dto.ts
      update-inquiry.dto.ts
    inquiries.controller.ts
    inquiries.module.ts
    inquiries.service.ts
  common/
    guards/
    interceptors/
    filters/
    pipes/
  prisma/
prisma/
  schema.prisma
  seed.ts
.env
```

---

## Database Schemas

### User
- id (UUID, primary key)
- email (unique, required)
- password (hashed, required)
- name (string, required)
- role (enum: CUSTOMER, ADMIN)
- createdAt
- updatedAt
- inquiries: Inquiry[]

### Product
- id (UUID, primary key)
- name (string, required)
- description (string)
- price (decimal, required)
- imageUrl (string)
- category (string)
- isAvailable (boolean, default: true)
- createdAt
- updatedAt

### Transaction
- id (UUID, primary key)
- userId (foreign key → User)
- totalAmount (decimal, required)
- status (enum: COMPLETED, CANCELLED)
- createdAt
- items: TransactionItem[]

### TransactionItem
- id (UUID, primary key)
- transactionId (foreign key → Transaction)
- productId (foreign key → Product)
- quantity (integer, required)
- priceAtPurchase (decimal, required)

### Location
- id (UUID, primary key)
- name (string, required)
- latitude (float, required)
- longitude (float, required)
- address (string)
- description (string)

### Inquiry
- id (UUID, primary key)
- name (string, required)
- email (string, required)
- phone (string, required)
- type (enum: QUESTION, COMPLAINT, EVENT, required)
- message (string, required)
- eventDate (string, optional — only relevant when type is EVENT)
- userId (foreign key → User, optional — null if submitted by unauthenticated user)
- user: User (relation)
- createdAt

---

## API Endpoints

### Auth
- POST /auth/register — Register a new user (role defaults to CUSTOMER)
- POST /auth/login — Authenticate a user; return a JWT

### Users
- GET /users/me — Get current logged-in user profile (protected)
- PATCH /users/me — Update current user profile (protected); accepts name field

### Products
- GET /products — Get all available products (public)
- GET /products/:id — Get a single product by ID (public)
- POST /products — Create a product (admin only)
- PATCH /products/:id — Update a product (admin only)
- DELETE /products/:id — Delete a product (admin only)

### Transactions
- GET /transactions/me — Get all transactions for the logged-in user (protected)
- POST /transactions — Create a new transaction (admin or POS use, protected)

### Locations
- GET /locations — Get all location coordinates (public)
- POST /locations — Add a location (admin only)
- PATCH /locations/:id — Update a location (admin only)
- DELETE /locations/:id — Delete a location (admin only)

### Inquiries
- POST /inquiries — Submit an inquiry (public; if user is authenticated, userId is attached automatically)
- GET /inquiries/me — Get all inquiries belonging to the logged-in user (protected)
- PATCH /inquiries/:id — Update an inquiry's message and/or eventDate (protected; owner or admin only; returns 403 if neither, 404 if not found)
- DELETE /inquiries/:id — Delete an inquiry (protected; owner or admin only; returns deleted record)

---

## Authentication and Authorization

- Use JWT for authentication
- JWT payload: { sub: userId, email, role }
- Access token expiry: 7 days
- Guards:
  - JwtAuthGuard — protects routes that require login
  - RolesGuard — protects routes that require ADMIN role
  - OptionalJwtAuthGuard — used on POST /inquiries to attach userId when available without blocking unauthenticated requests
- Roles decorator to annotate admin-only routes

---

## User Roles

- CUSTOMER: can log in, view products, view their own transactions, submit and manage their own inquiries
- ADMIN: full access, including product management, location management, all transactions, and all inquiries

Admin users are routed to an admin dashboard on the frontend. The backend enforces this via role-based access control.

---

## Inquiry Authorization Rules

- POST /inquiries: public. If a valid JWT is present, userId is attached. If not, userId is null.
- GET /inquiries/me: requires valid JWT. Returns only inquiries belonging to the requesting user.
- PATCH /inquiries/:id: requires valid JWT. Only the inquiry owner or an ADMIN may update. Updatable fields: message, eventDate only.
- DELETE /inquiries/:id: requires valid JWT. Only the inquiry owner or an ADMIN may delete.

---

## Middleware and Validation

- Use class-validator and class-transformer for all DTOs
- Global ValidationPipe with whitelist: true and forbidNonWhitelisted: true
- Global exception filter for consistent error response format
- All error responses follow this shape:
  ```json
  {
    "statusCode": 400,
    "message": "Validation failed",
    "error": "Bad Request"
  }
  ```

---

## Environment Variables

```
# Database connection string (PostgreSQL via Supabase)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"

# Test database (SQLite for e2e tests)
DATABASE_URL_TEST="file:./test.db"

# JWT secret key — use a long, random string in production
JWT_SECRET="chinoss-super-secret-jwt-key-dev"

# JWT token expiry
JWT_EXPIRES_IN="7d"

PORT=[port number]
FRONTEND_URL=http://localhost:[port number]
```

---

## CORS Configuration

- Allow requests from the frontend origin (set via FRONTEND_URL env variable)
- Methods: GET, POST, PATCH, DELETE
- Allow credentials: true

---

## Database Seeding

Seed the database with:
- 1 admin user
- 5 regular customer users
- 10 products across at least 3 categories (Coffee, Tea, Pastries) with prices in IDR (Rupiah)
- 5 sample transactions tied to customer users
- 5 location entries with lat/long coordinates for the Leaflet map representing Chinoss branches in Pekanbaru and Duri, Riau
- Sample inquiries of each type (QUESTION, COMPLAINT, EVENT) tied to customer users

---

## Swagger Documentation

- Mount Swagger at /api/docs
- Document all endpoints with request body schemas, response types, and auth requirements
- Use @ApiTags, @ApiBearerAuth, @ApiOperation, and @ApiResponse decorators throughout

---

## Development Phases

1. Initialize NestJS project and define folder architecture
2. Set up Prisma with Supabase PostgreSQL and define all schemas
3. Implement Auth module: register, login, JWT strategy, guards
4. Implement Products module: full CRUD, role protection
5. Implement Transactions module: create and read by user
6. Implement Locations module: full CRUD, admin protection for writes
7. Implement Users module: profile read and update
8. Implement Inquiries module: create (public with optional auth), read by user, update and delete by owner or admin
9. Add global validation, error handling, and exception filters
10. Configure CORS
11. Set up Swagger documentation
12. Seed the database
13. Test all endpoints
14. Deploy to Railway
15. Finalize and review API documentation

---

## Notes

- Passwords must be hashed with bcrypt before storing
- Never return the password field in any user response
- Transaction data is created by a cashier or POS system in the physical coffeeshop. Customers do not initiate transactions through the website. This is a fictional project for display purposes.
- Location data represents multiple physical Chinoss coffeeshop branches, each with a name, lat/long, and address. The frontend Leaflet map reads this to display all branch pins.
- Keep the Location schema flexible in case more branches are added later
- Inquiry type EVENT should include an optional eventDate field. The frontend conditionally shows date input when Event Inquiry is selected.
- Product prices are stored and returned in IDR (Indonesian Rupiah) as decimal values. Example: 35000 represents Rp 35.000.
- The OptionalJwtAuthGuard is used on POST /inquiries to support both authenticated and unauthenticated submissions without blocking either.
- JWT expiry was updated from 1h to 7d to match the frontend cookie expiry of 7 days.