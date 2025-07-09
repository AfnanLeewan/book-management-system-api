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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./entities/book.entity");
let BooksService = class BooksService {
    bookRepository;
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async create(createBookDto) {
        const book = this.bookRepository.create(createBookDto);
        return await this.bookRepository.save(book);
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, search } = queryDto;
        const skip = (page - 1) * limit;
        if (search) {
            return this.search(search, { page, limit });
        }
        const [data, total] = await this.bookRepository.findAndCount({
            skip,
            take: limit,
            order: {
                created_at: 'DESC',
            },
        });
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    async update(id, updateBookDto) {
        const book = await this.findOne(id);
        Object.assign(book, updateBookDto);
        return await this.bookRepository.save(book);
    }
    async remove(id) {
        const book = await this.findOne(id);
        await this.bookRepository.remove(book);
    }
    async findByAuthor(author, paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const [data, total] = await this.bookRepository.findAndCount({
            where: { author },
            skip,
            take: limit,
            order: {
                created_at: 'DESC',
            },
        });
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findByGenre(genre, paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const [data, total] = await this.bookRepository.findAndCount({
            where: { genre },
            skip,
            take: limit,
            order: {
                created_at: 'DESC',
            },
        });
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async search(query, paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const queryBuilder = this.bookRepository.createQueryBuilder('book');
        const [data, total] = await queryBuilder
            .where('book.title LIKE :query OR book.author LIKE :query', {
            query: `%${query}%`,
        })
            .skip(skip)
            .take(limit)
            .orderBy('book.created_at', 'DESC')
            .getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map