import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { EndpointModule } from './endpoint/endpoint.module';
import { Endpoint } from './endpoint/entities/endpoint.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { Permission } from './permissions/entities/permission.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { UploadModule } from './upload/upload.module';
import { ProductGalleriesModule } from './product-galleries/product-galleries.module';
import { ProductGallery } from './product-galleries/entities/product-gallery.entity';
import { VariantsModule } from './variants/variants.module';
import { Variant } from './variants/entities/variant.entity';
import { VariantItemsModule } from './variant-items/variant-items.module';
import { VariantItem } from './variant-items/entities/variant-item.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cart-item.entity';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { ShippingAddress } from './shipping-address/entities/shipping-address.entity';
import { ShippingRuleModule } from './shipping-rule/shipping-rule.module';
import { ShippingRule } from './shipping-rule/entities/shipping-rule.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { OrderDetail } from './order/entities/order-detail.entity';
import { EmailModule } from './email/email.module';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entities/review.entity';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User,Role,Endpoint,Permission,Category,Product,ProductGallery,Variant,VariantItem,Cart,CartItem,ShippingAddress,ShippingRule,Order,OrderDetail,Review],
        synchronize: true,
      }),
      
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    RoleModule,
    EndpointModule,
    PermissionsModule,
    CategoryModule,
    ProductModule,
    UploadModule,
    ProductGalleriesModule,
    VariantsModule,
    VariantItemsModule,
    CartModule,
    ShippingAddressModule,
    ShippingRuleModule,
    OrderModule,
    EmailModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
