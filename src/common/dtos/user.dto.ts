import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

import { InsertResult } from './http.dto';
import { IdDto } from './id.dto';

export class SignInUserDto {
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
}

export class SignedInUserDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken?: string;
}

export class SignedUpUserDto extends InsertResult {
  @ApiProperty()
  @Type(() => IdDto)
  raw: IdDto;

  constructor(id: string) {
    super(1);
    this.raw = { id };
  }
}
