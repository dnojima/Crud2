import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async createUser(username: string, password: string, role: UserRole) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    return this.usersRepository.save(user);
  }
  async register(
    username: string,
    password: string,
    role: UserRole,
  ): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ username });
    if (existingUser) {
      throw new Error('Usuário já existe');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    return this.usersRepository.save(user);
  }
}
