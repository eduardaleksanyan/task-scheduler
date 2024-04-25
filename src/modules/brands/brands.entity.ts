import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('brands')
export class BrandsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
