import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Role, ROleSchema } from 'src/roles/schema/role.schema';

@Module({
  imports: [
    UsersModule,
    RolesModule,

    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Role.name,
        schema: ROleSchema,
      },
    ]),
  ],
  providers: [MigrationService],
  exports: [MigrationService],
})
export class MigrationModule {}
