import { UserService } from './user.service';
import { Controller } from '@common/decorators/http.decorator';
import { LessonElasticSearchService } from '@modules/elastic-search/services/lesson-es.service';

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly search: LessonElasticSearchService,
	) {}
}
