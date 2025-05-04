import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    const reviews = await this.reviewRepository.find({relations:{product:true , user:true}})
    console.log(reviews);
    return reviews;
    
  }

  async findMyReviews(productId : number ,currentUser : UserPayload) {
    const reviews = await this.reviewRepository.find({where:{product:{id:productId},user:{id:currentUser.id}},relations:{product:true , user:true}})
   
    return reviews;
    
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({where:{id} , relations:{user:true , product:true}})
  
    if(!review)
      throw new NotFoundException(`No review ${id} founded`)

    return review
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    
    const{content , rating} = updateReviewDto

    const review = await this.findOne(id);
    review.content = content ? content : review.content;
    review.rating = rating ? rating : review.rating

    return this.reviewRepository.save(review)

  }

  async remove(id: number) {
    const review = await this.findOne(id);

    await this.reviewRepository.remove(review)

  }
}
