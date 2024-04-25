import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DietsEntity } from './diets.entity';
import { Repository } from 'typeorm';
import { findWithLike } from '../../utils/search.utils';

@Injectable()
export class DietsService {
  constructor(
    @InjectRepository(DietsEntity)
    private dietsRepository: Repository<DietsEntity>,
  ) {}

  async findByName(words: string[]): Promise<DietsEntity[] | []> {
    return findWithLike(this.dietsRepository, words, 'name');
  }
}
