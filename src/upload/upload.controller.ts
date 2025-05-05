import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'node:path';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { UploadService } from './upload.service';
import { AuthGuard } from 'src/cores/guards/auth.guard';
@Controller(`${API_VERSION}/uploads`)
@UseGuards(AuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/products/:productId')
  @UseInterceptors(FilesInterceptor('files',5,{
    storage:diskStorage({
      destination: function (req, file, cb) {
        
        cb(null, path.join(__dirname ,'..' , '..' ,'uploads','products'))
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      }
    })
  }))


  async uploadManyFile(
    
  @Param('productId',ParseIntPipe) productId:number,  
  @UploadedFiles( new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1048576 }),
      new FileTypeValidator({ fileType: 'image/*' }),
    ],
  }),) files: Array<Express.Multer.File>) {
    // console.log({type,entityId,file});
    // await this.uploadService.upload(type,entityId,file);
    console.log('files:',files);
    await this.uploadService.uploadMany(files,productId)
    return {
      message : 'success'
    }
  }
  


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

 
  // @Post('/products/:productId')
  // @UseInterceptors(FilesInterceptor('files',5,{
  //   storage:diskStorage({
  //     destination: function (req, file, cb) {
        
  //       cb(null, path.join(__dirname ,'..' , '..' ,'uploads','products'))
  //     },
  //     filename: function (req, file, cb) {
  //       const uniqueSuffix = Date.now();
  //       cb(null, `${uniqueSuffix}-${file.originalname}`);
  //     }
  //   })
  // }))


  // async uploadManyFile(
    
  // @Param('productId',ParseIntPipe) productId:number,  
  // @UploadedFiles( new ParseFilePipe({
  //   validators: [
  //     new MaxFileSizeValidator({ maxSize: 1048576 }),
  //     new FileTypeValidator({ fileType: 'image/*' }),
  //   ],
  // }),) files: Array<Express.Multer.File>) {
  //   // console.log({type,entityId,file});
  //   // await this.uploadService.upload(type,entityId,file);
  //   console.log('files:',files);
  //   await this.uploadService.uploadMany(files,productId)
  //   return {
  //     message : 'success'
  //   }
  // }
  

}
