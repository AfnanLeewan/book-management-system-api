import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksService } from './books/books.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BooksService],
})
export class AppModule {}
