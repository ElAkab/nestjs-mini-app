import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { CreateAuthentificationDto } from './dto/create-authentification.dto';
import { UpdateAuthentificationDto } from './dto/update-authentification.dto';

@Controller('authentification')
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}

  @Post()
  create(@Body() createAuthentificationDto: CreateAuthentificationDto) {
    return this.authentificationService.create(createAuthentificationDto);
  }

  @Get()
  findAll() {
    return this.authentificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authentificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthentificationDto: UpdateAuthentificationDto) {
    return this.authentificationService.update(+id, updateAuthentificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authentificationService.remove(+id);
  }
}
