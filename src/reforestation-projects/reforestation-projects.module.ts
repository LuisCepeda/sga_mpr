import { Module } from '@nestjs/common';
import { ReforestationProjectsService } from './reforestation-projects.service';
import { ReforestationProjectsController } from './reforestation-projects.controller';

@Module({
  controllers: [ReforestationProjectsController],
  providers: [ReforestationProjectsService],
})
export class ReforestationProjectsModule {}
