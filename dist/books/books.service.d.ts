import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { BooksQueryDto } from './dto/books-query.dto';
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class BooksService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(queryDto: BooksQueryDto): Promise<PaginatedResult<Book>>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
    remove(id: string): Promise<void>;
    findByAuthor(author: string, paginationDto: PaginationDto): Promise<PaginatedResult<Book>>;
    findByGenre(genre: string, paginationDto: PaginationDto): Promise<PaginatedResult<Book>>;
    search(query: string, paginationDto: PaginationDto): Promise<PaginatedResult<Book>>;
}
