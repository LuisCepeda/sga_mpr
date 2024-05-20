import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import mongodb from '../constants/mongodb'

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: mongodb.DATABASE_NAME })
    ],
    controllers: [],
    providers: []
})

export class DatabaseModule { }