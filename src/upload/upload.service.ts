import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ProductService } from 'src/product/product.service';
import { ProductGalleriesService } from 'src/product-galleries/product-galleries.service';

@Injectable()
export class UploadService {
  constructor(private productService:ProductService,private galleryService:ProductGalleriesService){

  }

  async upload(type :string,entityId:number,file:Express.Multer.File) {
    if(type === 'products'){
      const product = await this.productService.findOne(entityId);
      product.image = file.filename;
      await this.productService.save(product)
    }
  }

  async uploadMany(files:Array<Express.Multer.File> , productId:number){

    const product = await this.productService.findOne(productId);
    // console.log(product);
    
    for(const file of files){
      await this.galleryService.create(file.filename,product)

    }
  }

}
