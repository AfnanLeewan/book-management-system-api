# Book Management Backend

A comprehensive NestJS backend API for managing books with authentication, built with TypeScript, MySQL, and JWT authentication.

## Features

- 📚 **Complete CRUD Operations** for book management
- 🔐 **JWT Authentication** with user registration and login
- 🏢 **Role-based Access Control** (Admin/User roles)
- 📄 **Pagination Support** for all list endpoints
- 🔍 **Search & Filter** functionality (by title, author, genre)
- 📊 **API Documentation** with Swagger/OpenAPI
- ✅ **Input Validation** with class-validator
- 🧪 **Comprehensive Unit Tests** with Jest
- 🗃️ **MySQL Database** with TypeORM
- 🚀 **Docker Support** (coming soon)

## Tech Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Books (All routes require authentication)
- `GET /api/books` - Get all books (with pagination)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PATCH /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/books/search?q=query` - Search books
- `GET /api/books/author/:author` - Get books by author
- `GET /api/books/genre/:genre` - Get books by genre

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-management-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=book_management
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Create MySQL database**
   ```sql
   CREATE DATABASE book_management;
   ```

5. **Run the application**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

The API will be available at `http://localhost:3000/api`

## API Documentation

Once the application is running, you can access the Swagger documentation at:
`http://localhost:3000/api/docs`

## Database Schema

### Books Table
```sql
CREATE TABLE books (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    published_year INT,
    genre VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Users Table
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    isActive BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Testing

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data Transfer Objects
│   ├── entities/        # User entity
│   ├── guards/          # JWT Auth Guard
│   ├── strategies/      # JWT Strategy
│   └── auth.service.ts  # Authentication service
├── books/               # Books module
│   ├── dto/             # Create/Update DTOs
│   ├── entities/        # Book entity
│   └── books.service.ts # Books service
├── common/              # Shared utilities
│   └── dto/             # Common DTOs (pagination)
├── config/              # Configuration files
│   └── database.config.ts
└── main.ts              # Application entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `3306` |
| `DB_USERNAME` | Database username | `root` |
| `DB_PASSWORD` | Database password | - |
| `DB_DATABASE` | Database name | `book_management` |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | JWT expiration time | `3600s` |
| `PORT` | Application port | `3000` |

## Contact

For questions or support, please contact the development team.
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```