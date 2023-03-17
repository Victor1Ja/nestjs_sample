import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Pet extends BaseEntity {
  @Column()
  name: string;

  @Column()
  breed: string;

  @ManyToMany(() => User, (user) => user.pets)
  owner: User;
}
