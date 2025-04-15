import { CategoryService } from './../category/category.service';
import { Product } from 'src/product/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository : Repository<Product>,
    private categoryService : CategoryService,

  
   ){}


  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(createProductDto.categoryId);
    const product = new Product();
    product.category = category;
    product.offerPrice = createProductDto.offerPrice ? createProductDto.offerPrice : null;
    Object.assign(product,createProductDto);
    return this.productRepository.save(product);
  }

  async findAll() {

    const products = await this.productRepository.find({relations:{category:true}});
    return products
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({where:{id},relations:{category:true}});
    if(!product) throw new NotFoundException(`Product With Id ${product} Not Found`)
    return product
   }

   async findOneBySlug(slug: string) {
    const product = await this.productRepository.findOne({where:{slug},relations:{category:true}});
    if(!product) throw new NotFoundException(`Product With slug ${product} Not Found`)
    return product
   }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
