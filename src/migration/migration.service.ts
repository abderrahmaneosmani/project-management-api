import { Injectable, Logger } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MigrationService {
  constructor(
    private userService: UsersService,
    private roleService: RolesService,
  ) {}

  async runMigration() {
    Logger.debug('start  migration');

    const adminRole = await this.roleService.findByCode('admin');
    if (!adminRole) {
      Logger.debug('start creation role admin');
      await this.roleService.create({
        name: 'admin',
        code: 'admin',
      });
    }
    const adminUser = await this.userService.findUserByEmail('admin@mail.com');

    if (!adminUser) {
      Logger.debug('start creation  admin');

      return await this.userService.create({
        username: 'admin',
        email: 'admin@mail.com',
        password: '123456',
        role: 'admin',
        refreshToken: '',
      });
    }

    Logger.debug('Migration completed.');
  }
}
