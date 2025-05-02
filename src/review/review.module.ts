import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([Review]),ProductModule , UserModule , JwtModule , ConfigModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
