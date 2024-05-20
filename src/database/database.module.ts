import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import mongodb from '../constants/mongodb'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: process.env.MONGODB_URI
            })
        })
    ],
    controllers: [],
    providers: []
})

export class DatabaseModule { }