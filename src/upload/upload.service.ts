import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class UploadService {
  constructor(private productService:ProductService){

  }

  async upload(type :string,entityId:number,file:Express.Multer.File) {
    if(type === 'products'){
      const product = await this.productService.findOne(entityId);
      product.image = file.filename;
      await this.productService.save(product)
    }
  }


}
