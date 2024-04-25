import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitiesEntity } from './cities.entity';
import { Repository } from 'typeorm';
import { findWithLike } from '../../utils/search.utils';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CitiesEntity)
    private citiesRepository: Repository<CitiesEntity>,
  ) {}

  async findByName(words: string[]): Promise<CitiesEntity[] | []> {
    return findWithLike(this.citiesRepository, words, 'name');
  }
}
