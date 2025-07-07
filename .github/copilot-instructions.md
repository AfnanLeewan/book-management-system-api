# Copilot Instructions for Book Management Backend

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a NestJS backend project for book management with MySQL database. The project includes:

- CRUD operations for book management
- JWT-based authentication
- MySQL database integration with TypeORM
- Pagination support
- Comprehensive error handling and logging
- Unit testing with Jest
- API documentation with Swagger/OpenAPI

## Development Guidelines

### Code Style
- Use TypeScript for all code
- Follow NestJS best practices and conventions
- Use proper DTOs for data validation
- Implement proper error handling with custom exceptions
- Use dependency injection throughout the application

### Database
- Use TypeORM for database operations
- Create proper entity relationships
- Use migrations for database schema changes
- Implement proper indexing for performance

### Authentication
- Use JWT tokens for authentication
- Implement proper role-based access control
- Secure all API endpoints appropriately

### Testing
- Write unit tests for all services and controllers
- Use Jest for testing framework
- Mock database operations in tests
- Aim for high test coverage

### API Documentation
- Document all endpoints with Swagger decorators
- Provide clear examples for request/response formats
- Include proper error response documentation
