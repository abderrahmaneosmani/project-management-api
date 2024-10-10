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

export interface ProductFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
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
    return saveProduct;
  }

  async findAll(filterOptions?: ProductFilterOptions) {
    let query = this.productModel.find();

    if (filterOptions) {
      const categoryName = filterOptions.category;
      if (categoryName) {
        const category = await this.categoryModel.findOne({
          name: categoryName,
        });
        if (category) {
          query = query.where('category').equals(category._id);
        } else {
          return [];
        }
      }

      if (filterOptions.minPrice !== undefined) {
        query = query.where('price').gte(filterOptions.minPrice);
      }
      if (filterOptions.maxPrice !== undefined) {
        query = query.where('price').lte(filterOptions.maxPrice);
      }
    }

    return query.exec();
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
