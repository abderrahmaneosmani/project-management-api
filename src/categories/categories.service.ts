import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = new this.categoryModel(createCategoryDto);
      return category.save();
    } catch (error) {
      throw new Error();
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel
        .find()
        .populate('products')
        .exec();

      return categories;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    const checkCategory = await this.categoryModel.findOne({
      _id: id,
    });

    if (!checkCategory) {
      throw new NotFoundException(`the category ${id} not found`);
    }
    return checkCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updateCategory = await this.categoryModel
        .findByIdAndUpdate(id, updateCategoryDto, { new: true })
        .exec();

      return updateCategory;
    } catch (error) {
      throw Error(error);
    }
  }

  async remove(id: string) {
    const deleteCategory = await this.categoryModel.findByIdAndDelete(id);
    if (deleteCategory) {
      return `The Category ${id} was successfully deleted`;
    } else {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }
}
