import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({ example: 'chou1@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  @IsStrongPassword()
  password: string;
}

export class SignUpUserDto {
  @ApiProperty({ example: 'david21@example.co' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'David@123456' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Johndoe' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  name: string;
}
