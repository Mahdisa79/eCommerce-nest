import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  
  constructor(
    @InjectRepository(Category)
    private categoryRepository : Repository<Category>,
  
   ){}

  create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();

    Object.assign(category , createCategoryDto)

    return this.categoryRepository.save(category)
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({where:{id}});
    if(!category) throw new NotFoundException(`Category ${id} Not Found`)
    return category; 
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {

    const category = await this.findOne(id);
    Object.assign(category ,updateCategoryDto );
    return this.categoryRepository.save(category);
  }
  

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoryRepository.softRemove(category); 
  }
}
