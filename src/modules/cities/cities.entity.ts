import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cities')
export class CitiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
