import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}
  create(createRoleDto: CreateRoleDto) {
    const role = new this.roleModel(createRoleDto);
    return role.save();
  }

  async findAll() {
    return await this.roleModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }
  async findByCode(code: string) {
    const roleDocument = await this.roleModel
      .findOne({
        code,
      })
      .lean()
      .exec();

    return roleDocument;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .lean()
      .exec();

    if (!updatedRole) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return updatedRole;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
