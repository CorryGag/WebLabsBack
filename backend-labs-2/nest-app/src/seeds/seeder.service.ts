
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { DatabaseSeeder } from './seeder';

@Injectable()
export class SeedOnStartService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    const count = await this.categoryRepository.count();

    if (count === 0) {
      console.log('The database is empty - we are starting the seeding...');
      const seeder = new DatabaseSeeder(this.categoryRepository, this.productRepository);
      await seeder.drop();
      await seeder.seed();
      console.log('The sitting is complete.');
    } else {
      console.log('The database has data — the session was skipped.');
    }
  }
}
