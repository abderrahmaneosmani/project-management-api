import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { role, ...userDto } = createUserDto;

    const roleDocument = await this.roleService.findByCode(role);

    if (!roleDocument) {
      throw new BadRequestException(`Role with code "${role}" not found`);
    }
    const newUser = new this.userModel({
      ...userDto,
      role: roleDocument._id,
    });
    return newUser.save();
  }

  findAll() {
    return this.userModel.find().populate('role').exec();
  }

  async findOne(id: string) {
    return await this.userModel
      .findOne({ _id: id })
      .populate('role')
      .lean()
      .exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).populate('role').lean().exec();
  }
}
