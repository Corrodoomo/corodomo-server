import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class ReviewProductDto {
	@IsInt()
	@Min(1)
	@Max(5)
	@ApiProperty()
	score: number;
}
