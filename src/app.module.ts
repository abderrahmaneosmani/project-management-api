import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/management')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    mongoose.connection.on('connected', () => {
      Logger.debug('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      Logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      Logger.debug('Disconnected from MongoDB');
    });
  }
}
