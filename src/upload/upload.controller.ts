import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { diskStorage } from 'multer';
import * as path from 'node:path';
@Controller(`${API_VERSION}/uploads`)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}


  //['products' , 'users']
  @Post(':type')
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
  uploadFile(@UploadedFile( new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1048576 }),
      new FileTypeValidator({ fileType: 'image/*' }),
    ],
  }),) file: Express.Multer.File) {
    return {
      message : 'success'
    }
  }

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
