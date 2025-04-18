import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductGalleryDto } from './dto/create-product-gallery.dto';
import { UpdateProductGalleryDto } from './dto/update-product-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductGallery } from './entities/product-gallery.entity';
import { Repository } from 'typeorm';
import { ProductModule } from 'src/product/product.module';
import { Product } from 'src/product/entities/product.entity';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

@Injectable()
export class ProductGalleriesService {

  constructor(
    @InjectRepository(ProductGallery)
    private galleryRepository : Repository<ProductGallery>,
  ){}

  create(image:string,product:Product) {
    const gallery = new ProductGallery()

    gallery.image = image;
    gallery.product = product

    return this.galleryRepository.save(gallery)
  }

  async findOne(id: number){
    const gallery = await this.galleryRepository.findOne({where : {id}})

    if(!gallery)
      throw new NotFoundException(`Gallery Image ${id} not Found`);


    return gallery
  }

  async remove(id: number) {

    const gallery = await this.findOne(id);
    const imagePath = path.join(__dirname,'..','..','uploads','products',gallery.image)
    await fs.unlink(imagePath)
    this.galleryRepository.remove(gallery);
  }
}
