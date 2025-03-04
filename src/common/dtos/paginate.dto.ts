import { IsInt, IsPositive, Max, IsString, MaxLength } from 'class-validator';

export class PaginateDto {
	@IsInt()
	page: number = 0;

	@IsInt()
	@IsPositive()
  	@Max(50)
	limit: number = 5;
	
	@IsString()
	@MaxLength(100)
	keyword: string = '';
}
