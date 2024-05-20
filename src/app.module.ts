import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { ReforestationProjectsModule } from './reforestation-projects/reforestation-projects.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.development.local',
    isGlobal: true
  }), DatabaseModule, ReforestationProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
