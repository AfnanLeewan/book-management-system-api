import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(book);
  }

  async findAll(queryDto: BooksQueryDto): Promise<PaginatedResult<Book>> {
    const { page = 1, limit = 10, search } = queryDto;
    const skip = (page - 1) * limit;

    if (search) {
      // If search is provided, use the search functionality
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

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, updateBookDto);
    return await this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }

  async findByAuthor(
    author: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Book>> {
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

  async findByGenre(
    genre: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Book>> {
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

  async search(
    query: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Book>> {
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
}
