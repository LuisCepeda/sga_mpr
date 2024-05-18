import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { ReforestationProjectsModule } from './reforestation-projects/reforestation-projects.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.development.local',
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.MONGODB_URI),
    ReforestationProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
