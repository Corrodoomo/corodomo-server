import { User } from '@modules/database/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

import { BaseRecordDto } from '@common/dtos/common.dto';

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

export class SignInOAuthDto {
  @ApiProperty({ example: 'f291098d' })
  @IsNotEmpty()
  @IsString()
  idToken: string;
}

export class SignInQRCodeDto {
  @ApiProperty({ example: '230583' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  qrToken: string;
}

export class UserDto extends BaseRecordDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(user: User) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.emailVerified = user.emailVerified;
    this.createdAt = user.createdAt?.toISOString();
    this.updatedAt = user.updatedAt?.toISOString();
  }
}
