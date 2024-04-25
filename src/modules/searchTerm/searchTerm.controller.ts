import { Controller, Get, Query } from '@nestjs/common';
import { SearchTermService } from './searchTerm.service';
import { SearchTermDto } from './dto/SearchTermDto';
import { ResultParams } from './types/search.types';

@Controller('search-term')
export class SearchTermController {
  constructor(private readonly searchTermService: SearchTermService) {}

  @Get()
  get(@Query() query: SearchTermDto): Promise<ResultParams[]> {
    return this.searchTermService.search(query);
  }
}
