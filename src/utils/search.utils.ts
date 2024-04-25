import { Repository, ILike } from 'typeorm';

export async function findWithLike(
  repository: Repository<any>,
  words: string[],
  columnName: string,
): Promise<any[] | []> {
  if (words.length === 0) {
    return [];
  }

  const orConditions = words.map((word) => ({
    [columnName]: ILike(`${word}%`),
  }));

  return repository.find({
    where: orConditions,
  });
}
