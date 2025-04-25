import { Module } from '@nestjs/common';

import { ExamController } from './exam.controller';
import { ExamRepository } from './exam.repository';
import { ExamService } from './exam.service';

@Module({
  controllers: [ExamController],
  providers: [ExamService, ExamRepository],
})
export class ExamModule {}
