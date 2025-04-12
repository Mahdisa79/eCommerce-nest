import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  
  constructor(
    @InjectRepository(Category)
    private categoryRepository : Repository<Category>,
  
   ){}

  async create(createCategoryDto: CreateCategoryDto) {
    let parentCategory : Category = null;
    if(createCategoryDto.parentId)
      parentCategory = await this.findOne(createCategoryDto.parentId)

    const category = new Category();

    category.parent = parentCategory ? parentCategory : null ;
    Object.assign(category , createCategoryDto)

    return this.categoryRepository.save(category)
  }

  async findAll() {
    const categories = await this.categoryRepository.find({where:{parent:IsNull()},relations:{children:true}});
    console.log(categories);
    
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({where:{id},relations:{children:true}});
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
