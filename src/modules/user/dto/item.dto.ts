import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class ItemDTO {
  @ApiProperty()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;
}
