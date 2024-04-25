import { IsString } from 'class-validator';

export class SearchTermDto {
  @IsString()
  q: string;
}
