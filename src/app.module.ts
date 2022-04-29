import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ShopsModule } from './shops/shops.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    ShopsModule,
    UsersModule,
    FileModule,
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
