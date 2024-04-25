import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsEntity } from './brands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandsEntity])],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
