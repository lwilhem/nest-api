import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ShopsModule } from './shops/shops.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    ShopsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
