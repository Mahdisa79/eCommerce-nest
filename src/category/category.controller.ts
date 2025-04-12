import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { AuthGuard } from 'src/cores/guards/auth.guard';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { ResponseCategoryNotChildrenDto } from './dto/response-category-not-children.dto';

@Controller(`${API_VERSION}/categories`)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  @TransformDTO(ResponseCategoryNotChildrenDto)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @TransformDTO(ResponseCategoryDto)
  findAll() {
    // const categories = await this.categoryService.findAll();
    // return {message : 'Get all categories' , data :categories }
    return this.categoryService.findAll();
  }

  @Get(':id')
  @TransformDTO(ResponseCategoryDto)
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @TransformDTO(ResponseCategoryNotChildrenDto)
  async update(@Param('id' , ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {

    return this.categoryService.update(id,updateCategoryDto)
  }


  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
