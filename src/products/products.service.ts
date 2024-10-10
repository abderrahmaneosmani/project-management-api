import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categories/schema/category.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { category: categoryName, ...productDetails } = createProductDto;

    const category = await this.categoryModel
      .findOne({ name: categoryName })
      .exec();

    if (!category) {
      throw new NotFoundException(`Category "${categoryName}" not found`);
    }

    const product = new this.productModel({
      ...productDetails,
      category: category._id,
    });

    const saveProduct = await product.save();
    await this.categoryModel.findByIdAndUpdate(
      category._id,
      { $push: { products: saveProduct } },
      { new: true, useFindAndModify: false },
    );
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
