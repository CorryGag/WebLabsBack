import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Roles } from 'nest-keycloak-connect';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles({roles: ['Writer']})
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles({roles: ['Viewer']})
  findAll(@Paginate() query: PaginateQuery, @Query('filter.category_id') category_id?: number) {
    if(category_id){
      return this.productsService.findProductsByCategory(category_id, query);
    }
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @Roles({roles: ['Viewer']})
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  @Roles({roles: ['Writer']})
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles({roles: ['Writer']})
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}