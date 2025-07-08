import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { BooksQueryDto } from './dto/books-query.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<import("./entities/book.entity").Book>;
    findAll(queryDto: BooksQueryDto): Promise<import("./books.service").PaginatedResult<import("./entities/book.entity").Book>>;
    search(query: string, paginationDto: PaginationDto): Promise<import("./books.service").PaginatedResult<import("./entities/book.entity").Book>>;
    findByAuthor(author: string, paginationDto: PaginationDto): Promise<import("./books.service").PaginatedResult<import("./entities/book.entity").Book>>;
    findByGenre(genre: string, paginationDto: PaginationDto): Promise<import("./books.service").PaginatedResult<import("./entities/book.entity").Book>>;
    findOne(id: string): Promise<import("./entities/book.entity").Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<import("./entities/book.entity").Book>;
    remove(id: string): Promise<void>;
}
