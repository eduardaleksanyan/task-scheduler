import { Module } from '@nestjs/common';
import { DishTypesService } from './dishTypes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishTypesEntity } from './dishTypes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DishTypesEntity])],
  providers: [DishTypesService],
  exports: [DishTypesService],
})
export class DishTypesModule {}
