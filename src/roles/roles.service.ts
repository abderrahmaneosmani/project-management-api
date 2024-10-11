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
    const roles = await this.roleModel.find().exec();
    if (!roles) throw new Error('error occur on role');
    return roles;
  }

  async findOne(id: string) {
    const role = await this.roleModel.findOne({
      id,
    });
    if (!role) {
      throw new NotFoundException('role not found');
    }
    return role;
  }
  async findByCode(code: string) {
    const roleDocument = await this.roleModel
      .findOne({
        code,
      })
      .lean()
      .exec();

    if (!roleDocument) {
      throw new Error('error occur');
    }

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

  async remove(id: string) {
    const deleteRole = await this.roleModel.findByIdAndDelete(id);
    if (deleteRole) {
      return `The Role ${id} was successfully deleted`;
    } else {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
  }
}
