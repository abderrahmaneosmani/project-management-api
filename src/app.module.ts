import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { MigrationService } from './migration/migration.service';
import { MigrationModule } from './migration/migration.module';
import mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ProductsModule,
    CategoriesModule,
    UsersModule,

    AuthModule,
    RolesModule,
    MigrationModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService, MigrationService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly migrationService: MigrationService) {}

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

    this.migrationService.runMigration();
  }
}
