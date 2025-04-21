import { CategoryService } from './../category/category.service';
import { Product } from 'src/product/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository : Repository<Product>,
    private categoryService : CategoryService,

  
   ){}

   async save(product : Product){
    return this.productRepository.save(product);
   }

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(createProductDto.categoryId);
    const product = new Product();
    product.category = category;
    product.offerPrice = createProductDto.offerPrice ? createProductDto.offerPrice : null;
    Object.assign(product,createProductDto);
    return this.productRepository.save(product);
  }

  // async findAll() {

  //   const products = await this.productRepository.find({relations:{category:true}});
  //   return products
  // }

  public findAll(query: PaginateQuery): Promise<Paginated<Product>> {
    return paginate(query, this.productRepository, {
      sortableColumns: ['id', 'name','price'],
      defaultSortBy: [['price', 'DESC']],
      searchableColumns: ['name', 'shortDescription', 'longDescription'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        shortDescription: [FilterOperator.EQ, FilterSuffix.NOT],
        longDescription: [FilterOperator.EQ, FilterSuffix.NOT]

      },
    })
  }


  async findOne(id: number) {
    const product = await this.productRepository.findOne({where:{id},relations:{category:true}});
    if(!product) throw new NotFoundException(`Product With Id ${product} Not Found`)
    return product
   }

   async findOneBySlug(slug: string) {
    const product = await this.productRepository.findOne({where:{slug},relations:{category:true,variants:{items:true}}});
    if(!product) throw new NotFoundException(`Product With slug ${product} Not Found`)
    return product
   }

  async update(id: number, updateProductDto: UpdateProductDto) {
    
    const product = await this.findOne(id);
    
    
    let category : Category = product.category ;
    if(updateProductDto.categoryId){
      category = await this.categoryService.findOne(updateProductDto.categoryId);
    }

    product.category = category
    
    Object.assign(product,updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.softRemove(product);
  }
}
