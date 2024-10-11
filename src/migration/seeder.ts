import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { MigrationService } from './migration.service';

async function runMigration() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const migrationService = app.get(MigrationService);

  try {
    await migrationService.runMigration();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await app.close();
  }
}

runMigration();
