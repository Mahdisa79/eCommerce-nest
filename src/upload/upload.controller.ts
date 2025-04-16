import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'node:path';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { UploadService } from './upload.service';
@Controller(`${API_VERSION}/uploads`)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}


  //['products' , 'users']
  @Post(':type/:entityId')
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination: function (req, file, cb) {
        const {type} = req.params;
        cb(null, path.join(__dirname ,'..' , '..' ,'uploads',type))
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      }
    })
  }))


  async uploadFile(@Param('type') type:string,
  @Param('entityId',ParseIntPipe)entityId : number,
  @UploadedFile( new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1048576 }),
      new FileTypeValidator({ fileType: 'image/*' }),
    ],
  }),) file: Express.Multer.File) {
    // console.log({type,entityId,file});
    await this.uploadService.upload(type,entityId,file);
    return {
      message : 'success'
    }
  }

  
}
