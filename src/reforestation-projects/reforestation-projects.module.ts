import { Module } from '@nestjs/common';
import { ReforestationProjectsService } from './reforestation-projects.service';
import { ReforestationProjectsController } from './reforestation-projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReforestationProjectSchema, ReforestationProject } from '../database/schemas/reforestation-project.schema'

@Module({
  controllers: [ReforestationProjectsController],
  providers: [ReforestationProjectsService],
  imports: [MongooseModule.forFeature([{ name: ReforestationProject.name, schema: ReforestationProjectSchema }])]
})
export class ReforestationProjectsModule { }
