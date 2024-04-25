import { Module } from '@nestjs/common';
import { SearchTermService } from './searchTerm.service';
import { SearchTermController } from './searchTerm.controller';

@Module({
  imports: [],
  controllers: [SearchTermController],
  providers: [SearchTermService],
})
export class SearchTermModule {}
