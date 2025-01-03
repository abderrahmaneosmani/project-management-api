import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { RolesService } from 'src/roles/roles.service';
import { cryptPassword } from 'src/utils/crypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { role, ...userDto } = createUserDto;

      const roleDocument = await this.roleService.findByCode(role);
      const existUser = await this.userModel.findOne({
        $or: [{ username: userDto.username }, { email: userDto.email }],
      });
      if (existUser) {
        throw new BadRequestException(
          'User with this email or username already exists',
        );
      }

      if (!roleDocument) {
        throw new BadRequestException(`Role with code "${role}" not found`);
      }
      const hashPass = await cryptPassword(userDto.password);
      userDto.password = hashPass;
      const newUser = new this.userModel({
        ...userDto,
        role: roleDocument._id,
      });
      return newUser.save();
    } catch (error) {
      throw new Error('error  when create user');
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().populate('role').exec();
      if (!users) throw new Error('error');
      return users;
    } catch (error) {
      new Error('error on find user by id');
    }
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findOne({ _id: id })
      .populate('role')
      .lean()
      .exec();

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
    } catch (error) {
      throw new Error('error occur on update');
    }
  }

  async remove(id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    if (deleteUser) {
      return `The User ${id} was successfully deleted`;
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
  async findUserByEmail(email: string) {
    const user = await this.userModel
      .findOne({ email })
      .populate('role')
      .lean()
      .exec();
    if (!user) {
      throw new Error(`user not found with ${email}`);
    }
    return user;
  }
}
