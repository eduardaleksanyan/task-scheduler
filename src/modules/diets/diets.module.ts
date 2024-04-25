import { Module } from '@nestjs/common';
import { DietsService } from './diets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietsEntity } from './diets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DietsEntity])],
  providers: [DietsService],
  exports: [DietsService],
})
export class DietsModule {}
