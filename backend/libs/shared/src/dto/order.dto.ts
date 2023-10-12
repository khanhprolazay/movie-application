import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsNumber()
  @IsNotEmpty()
  price: number
}