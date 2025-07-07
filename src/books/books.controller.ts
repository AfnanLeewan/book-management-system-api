import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Validation failed.',
  })
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of books retrieved successfully.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.booksService.findAll(paginationDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search books by title or author' })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully.',
  })
  @ApiQuery({
    name: 'q',
    required: true,
    type: String,
    description: 'Search query',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  async search(
    @Query('q') query: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return await this.booksService.search(query, paginationDto);
  }

  @Get('author/:author')
  @ApiOperation({ summary: 'Get books by author' })
  @ApiResponse({
    status: 200,
    description: 'Books by author retrieved successfully.',
  })
  @ApiParam({
    name: 'author',
    required: true,
    type: String,
    description: 'Author name',
  })
  async findByAuthor(
    @Param('author') author: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return await this.booksService.findByAuthor(author, paginationDto);
  }

  @Get('genre/:genre')
  @ApiOperation({ summary: 'Get books by genre' })
  @ApiResponse({
    status: 200,
    description: 'Books by genre retrieved successfully.',
  })
  @ApiParam({
    name: 'genre',
    required: true,
    type: String,
    description: 'Genre name',
  })
  async findByGenre(
    @Param('genre') genre: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return await this.booksService.findByGenre(genre, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Book retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Book ID (UUID)',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({
    status: 200,
    description: 'Book updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Validation failed.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Book ID (UUID)',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({
    status: 204,
    description: 'Book deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Book ID (UUID)',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.booksService.remove(id);
  }
}
