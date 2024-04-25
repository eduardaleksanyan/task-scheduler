import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsEntity } from './brands.entity';
import { Repository } from 'typeorm';
import { findWithLike } from '../../utils/search.utils';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandsEntity)
    private brandsRepository: Repository<BrandsEntity>,
  ) {}

  async findByName(words: string[]): Promise<BrandsEntity[] | []> {
    return findWithLike(this.brandsRepository, words, 'name');
  }
}
