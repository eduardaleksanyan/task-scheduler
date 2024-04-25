import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DietsEntity } from './diets.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DietsService {
  constructor(
    @InjectRepository(DietsEntity)
    private dietsRepository: Repository<DietsEntity>,
  ) {}
}
