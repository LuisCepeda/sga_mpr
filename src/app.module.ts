import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
//import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module'
import { MongooseModule } from '@nestjs/mongoose';
import { ReforestationProjectsModule } from './reforestation-projects/reforestation-projects.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.development.local',
    isGlobal: true
  }), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
