type PropertyParams = 'city' | 'brand' | 'diet' | 'dishTypes';

export interface UnionParams {
  source_id: number;
  name: string;
  type: PropertyParams;
}

export interface ResultParams {
  id: number;
  name: string;
}
