import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dishTypes')
export class DishTypesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
