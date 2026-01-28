import { Injectable } from '@nestjs/common';
import { CreateAuthentificationDto } from './dto/create-authentification.dto';
import { UpdateAuthentificationDto } from './dto/update-authentification.dto';

@Injectable()
export class AuthentificationService {
  create(createAuthentificationDto: CreateAuthentificationDto) {
    return 'This action adds a new authentification';
  }

  findAll() {
    return `This action returns all authentification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentification`;
  }

  update(id: number, updateAuthentificationDto: UpdateAuthentificationDto) {
    return `This action updates a #${id} authentification`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentification`;
  }
}
