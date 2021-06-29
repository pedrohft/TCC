import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import SpecificService from './SpecificService';
import Worker from './Worker';

@Entity('service')
class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => SpecificService, (specificService) => specificService.service)
  specific_service: SpecificService[];

  @Column()
  name: string;

  @Column()
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Service;
