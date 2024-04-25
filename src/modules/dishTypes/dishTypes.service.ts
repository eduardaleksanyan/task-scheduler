import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DishTypesEntity } from './dishTypes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DishTypesService {
  constructor(
    @InjectRepository(DishTypesEntity)
    private dishTypesRepository: Repository<DishTypesEntity>,
  ) {}
}
