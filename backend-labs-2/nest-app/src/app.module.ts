import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedOnStartService } from './seeds/seeder.service';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pg',
      port: 5432,
      username: 'pguser',
      password: 'password',
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Category, Product]),
    CategoriesModule, 
    ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    SeedOnStartService
  ],
})
export class AppModule {}
