import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    example: 'F. Scott Fitzgerald',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'The year the book was published',
    example: 1925,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  published_year?: number;

  @ApiProperty({
    description: 'The genre of the book',
    example: 'Fiction',
    required: false,
  })
  @IsOptional()
  @IsString()
  genre?: string;
}
