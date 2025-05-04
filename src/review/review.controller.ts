import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from 'src/cores/decorators/current-user.decorator';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { AuthGuard } from 'src/cores/guards/auth.guard';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseReviewDto } from './dto/response-review.dto';

@Controller(`${API_VERSION}/reviews`)
@UseGuards(AuthGuard)
@TransformDTO(ResponseReviewDto)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto , @CurrentUser() user : UserPayload) {
    return this.reviewService.create(createReviewDto , user);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('/:productId/me')
  findMyReviews(@Param('productId',ParseIntPipe) productId : number,@CurrentUser() user : UserPayload) {
    return this.reviewService.findMyReviews(productId,user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
