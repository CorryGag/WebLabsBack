
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

export class DatabaseSeeder implements Seeder {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 5; i++) {
      const category = this.categoryRepository.create({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        image: `https://picsum.photos/200/200?random=${faker.number.int()}`,
      });

      await this.categoryRepository.save(category);

      for (let j = 0; j < 3; j++) {
        const product = this.productRepository.create({
          name: faker.commerce.productName(),
          description: faker.lorem.sentences(2),
          price: parseFloat(faker.commerce.price()),
          image: `https://picsum.photos/200/200?random=${faker.number.int()}`,
          category: category,
          category_id: category.id,
        });

        await this.productRepository.save(product);
      }
    }
  }

  async drop(): Promise<void> {
    await this.productRepository.query('DELETE FROM products');
    await this.categoryRepository.query('DELETE FROM categories');
  }
}
