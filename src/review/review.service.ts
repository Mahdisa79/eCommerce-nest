import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository : Repository<Review>,
    private productService : ProductService,
    private userService : UserService,

  ){}
  async create(createReviewDto: CreateReviewDto , currentUser : UserPayload) {
    const product = await this.productService.findOne(createReviewDto.productId);
    const user = await this.userService.findOne(currentUser.id);

    //prevent create review
    const allOrdersDetails = user.orders.map(order => order.orderDetails).flat()
    const productFond = allOrdersDetails.find(orderDetail =>orderDetail.product.id === product.id)
    if(!productFond)
      throw new BadRequestException('you most buy product to review')

    // You are Buy Product
    const review = new Review();
    review.content = createReviewDto.content
    review.rating = createReviewDto.rating
    review.product = product
    review.user = user

    return this.reviewRepository.save(review)


  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
