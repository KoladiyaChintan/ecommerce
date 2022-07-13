import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 1.1 Import the mongoose module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/product/product.module'; // 2.1 Import the product module
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/store'), // 1.2 Setup the database
    ProductModule, // 2.2 Add the product module
    AuthModule,
    CartModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
