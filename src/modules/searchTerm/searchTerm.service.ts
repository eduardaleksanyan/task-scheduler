import { Injectable } from '@nestjs/common';
import { SearchTermDto } from './dto/SearchTermDto';
import { skipWordList } from '../../constants/search.constants';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ResultParams, UnionParams } from './types/search.types';

@Injectable()
export class SearchTermService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async search(query: SearchTermDto): Promise<ResultParams[]> {
    const wordList = this.splitQuery(query.q);

    const result = await this.getData(wordList);

    return this.transformResult(result);
  }

  private getData(wordList: string[]): Promise<UnionParams[]> {
    return this.entityManager.query(
      'SELECT "source_id", "name", "type" FROM search_all_entities($1)',
      [wordList],
    );
  }

  private transformResult(result: UnionParams[]) {
    const groupedByType = this.groupByType(result);
    return this.createCombinations(groupedByType);
  }

  private groupByType(items: UnionParams[]) {
    return items.reduce((acc, item) => {
      const type = item.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    }, {});
  }

  private createCombinations(types): ResultParams[] {
    const keys = Object.keys(types);
    const results = [];

    function generateCombination(index, currentCombination) {
      if (index === keys.length) {
        results.push(currentCombination);
        return;
      }

      const key = keys[index];
      types[key].forEach((item) => {
        generateCombination(index + 1, {
          ...currentCombination,
          [key]: { id: item.source_id, name: item.name },
        });
      });
    }

    generateCombination(0, {});
    return results;
  }

  private splitQuery(query: string): string[] {
    const tokens = query.split(/\s+/);
    return tokens.filter((token) => !skipWordList.includes(token));
  }
}
