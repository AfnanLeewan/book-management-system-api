"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const books_service_1 = require("./books.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const books_query_dto_1 = require("./dto/books-query.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let BooksController = class BooksController {
    booksService;
    constructor(booksService) {
        this.booksService = booksService;
    }
    async create(createBookDto) {
        return await this.booksService.create(createBookDto);
    }
    async findAll(queryDto) {
        return await this.booksService.findAll(queryDto);
    }
    async search(query, paginationDto) {
        return await this.booksService.search(query, paginationDto);
    }
    async findByAuthor(author, paginationDto) {
        return await this.booksService.findByAuthor(author, paginationDto);
    }
    async findByGenre(genre, paginationDto) {
        return await this.booksService.findByGenre(genre, paginationDto);
    }
    async findOne(id) {
        return await this.booksService.findOne(id);
    }
    async update(id, updateBookDto) {
        return await this.booksService.update(id, updateBookDto);
    }
    async remove(id) {
        await this.booksService.remove(id);
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new book' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The book has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request. Validation failed.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all books with pagination and optional search',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of books retrieved successfully.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Search query for title or author',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [books_query_dto_1.BooksQueryDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search books by title or author' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Search results retrieved successfully.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'q',
        required: true,
        type: String,
        description: 'Search query',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page',
    }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('author/:author'),
    (0, swagger_1.ApiOperation)({ summary: 'Get books by author' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Books by author retrieved successfully.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'author',
        required: true,
        type: String,
        description: 'Author name',
    }),
    __param(0, (0, common_1.Param)('author')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findByAuthor", null);
__decorate([
    (0, common_1.Get)('genre/:genre'),
    (0, swagger_1.ApiOperation)({ summary: 'Get books by genre' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Books by genre retrieved successfully.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'genre',
        required: true,
        type: String,
        description: 'Genre name',
    }),
    __param(0, (0, common_1.Param)('genre')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findByGenre", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a book by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Book retrieved successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Book not found.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        type: String,
        description: 'Book ID (UUID)',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a book' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Book updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Book not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request. Validation failed.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        type: String,
        description: 'Book ID (UUID)',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a book' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Book deleted successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Book not found.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        type: String,
        description: 'Book ID (UUID)',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "remove", null);
exports.BooksController = BooksController = __decorate([
    (0, swagger_1.ApiTags)('Books'),
    (0, common_1.Controller)('books'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map