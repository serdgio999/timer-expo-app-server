import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ required: true })
  firstName: string;

  @IsString()
  @ApiProperty({ required: true })
  lastName: string;

  @IsEmail()
  @ApiProperty({ required: true })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;
}
