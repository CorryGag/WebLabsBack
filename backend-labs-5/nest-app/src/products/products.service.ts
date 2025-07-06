
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ){}

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.productsRepository, {
      sortableColumns: ['id', 'name', 'description'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name', 'description'],
      select: ['*'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT]
      },
    });
  }

  findProductsByCategory(category_id: number, query: PaginateQuery){
    return paginate(query, this.productsRepository, {
      sortableColumns: ['id', 'name', 'description'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name', 'description'],
      select: ['*'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT]
      },
      where: {
        category_id: category_id,
      }
    });
  }

  findOne(id: number) {
    return this.productsRepository.findOneBy({id});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
