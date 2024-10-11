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

  async findOne(id: string) {
    const checkProduct = await this.productModel.findOne({
      _id: id,
      active: true,
    });

    if (!checkProduct) {
      throw new NotFoundException(`the product ${id} not found`);
    }
    return checkProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    return updateProduct;
  }

  async remove(id: string) {
    const update = await this.productModel.findByIdAndUpdate(
      id,
      { active: false },
      { new: true },
    );

    if (update) {
      return `The product ${id} was successfully deactivated`;
    } else {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
