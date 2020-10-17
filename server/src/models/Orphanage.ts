import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Images from './Image';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: "varchar"
  })
  name: string;

  @Column({
    type: "decimal",
    scale: 10,
    precision: 2
  })
  latitude: number;

  @Column({
    type: "decimal",
    scale: 10,
    precision: 2
  })
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column({
    type: "varchar"
  })
  opening_hours: string;

  @Column({
    default: false
  })
  open_on_weekends: boolean;

  @OneToMany(() => Images, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn()
  images: Images[];
}