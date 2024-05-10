import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ReforestationProjectsModule } from './reforestation-projects/reforestation-projects.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.development.local',
    isGlobal: true
  }), ReforestationProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
