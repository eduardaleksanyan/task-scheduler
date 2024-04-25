import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DishTypesEntity } from './dishTypes.entity';
import { Repository } from 'typeorm';
import { findWithLike } from '../../utils/search.utils';

@Injectable()
export class DishTypesService {
  constructor(
    @InjectRepository(DishTypesEntity)
    private dishTypesRepository: Repository<DishTypesEntity>,
  ) {}

  async findByName(words: string[]): Promise<DishTypesEntity[] | []> {
    return findWithLike(this.dishTypesRepository, words, 'name');
  }
}
