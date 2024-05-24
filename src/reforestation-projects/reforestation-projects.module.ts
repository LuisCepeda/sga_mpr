import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ReforestationProjectsService } from './reforestation-projects.service';
import { ReforestationProjectsController } from './reforestation-projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReforestationProjectSchema, ReforestationProject } from '../database/schemas/reforestation-project.schema'
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  controllers: [ReforestationProjectsController],
  providers: [ReforestationProjectsService],
  imports: [MongooseModule.forFeature([{ name: ReforestationProject.name, schema: ReforestationProjectSchema }])]
})
export class ReforestationProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('reforestation-projects')
  }
}
