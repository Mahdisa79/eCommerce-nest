import { Injectable } from '@nestjs/common';
import { CreateProductGalleryDto } from './dto/create-product-gallery.dto';
import { UpdateProductGalleryDto } from './dto/update-product-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductGallery } from './entities/product-gallery.entity';
import { Repository } from 'typeorm';
import { ProductModule } from 'src/product/product.module';
import { Product } from 'src/product/entities/product.entity';


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

  findAll() {
    return `This action returns all productGalleries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productGallery`;
  }

  update(id: number, updateProductGalleryDto: UpdateProductGalleryDto) {
    return `This action updates a #${id} productGallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} productGallery`;
  }
}
