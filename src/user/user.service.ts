import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'model/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // private dataSource:DataSource
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async createMany(users: User[]) {
    try {
      for (let i = 0; i < users.length; i++) this.userRepository.save(users[i]);
    } catch (err) {
      throw err;
    }
  }

  async updateMany(users: User[]) {
    try {
      for (let i = 0; i < users.length; i++) this.userRepository.save(users[i]);
    } catch (err) {
      throw err;
    }
  }
}
