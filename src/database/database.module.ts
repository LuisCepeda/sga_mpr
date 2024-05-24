import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import mongodb from '../constants/mongodb'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                return {
                    connectionFactory: (connection) => {
                        if (connection.readyState === 1) {
                            console.log('Database Connected successfully');
                        }
                        connection.on('disconnected', () => {
                            console.log('Database disconnected');
                        })
                        connection.on('error', (error) => {
                            console.log('Database connection failed! for error: ', error);
                        });
                        return connection
                    },
                    uri: process.env.MONGODB_URI
                }
            }
        })
    ],
    controllers: [],
    providers: []
})

export class DatabaseModule { }

