import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsString()
  description: string;
  @IsInt()
  @Min(0.01, { message: 'Price must be greater than zero' })
  @ApiProperty()
  price: number;
  @IsInt()
  @Min(1, { message: 'Stock quantity must be 1 or greater' })
  @ApiProperty()
  stock_quantity: number;
  @IsString()
  @ApiProperty()
  category: string;
  active: boolean;
}
