import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';

import Orphanage from './Orphanage';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar'
  })
  path: string;

  @ManyToOne(() => Orphanage,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  orphanage: Orphanage;
}