import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterDto } from './dtos/register-dto.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Controller, Get } from '@common/decorators/http.decorator';
import { UserInfo } from '@common/types';
import { Request } from '@nestjs/common';
import { SystemRole } from '@common/constants';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

}
