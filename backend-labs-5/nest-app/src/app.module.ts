import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedOnStartService } from './seeds/seeder.service';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

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
    ProductsModule,
    KeycloakConnectModule.register({
      authServerUrl: 'http://keycloak:8080',
      realm: 'Tkachuk',
      clientId: 'nest-client',
      secret: '3kSjymqQOo2kvF22hXxXTs6jnVYpE2S0'
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedOnStartService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ],
})
export class AppModule {}