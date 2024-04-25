import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('diets')
export class DietsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
