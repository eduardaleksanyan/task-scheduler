import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesEntity } from './cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity])],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
