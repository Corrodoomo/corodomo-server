import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

import { BaseRecordDto } from './common.dto';

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

export class RefreshUserDto {
  @ApiProperty()
  accessToken: string;
}

export class SignedOutUserDto {
  @ApiProperty()
  message: string;
}

export class SignedUpUserDto extends BaseRecordDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  emailVerified: string;
}
