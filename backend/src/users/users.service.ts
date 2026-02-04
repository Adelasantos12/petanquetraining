import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role', 'isActive'],
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const { email, password } = userData;
    this.logger.log(`Attempting to create user: ${email}`);

    try {
      const hashedPassword = await bcrypt.hash(password || '', 10);
      const user = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });
      const savedUser = await this.usersRepository.save(user);
      this.logger.log(`User created successfully: ${email} (${savedUser.id})`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Failed to create user ${email}: ${error.message}`);
      if (error.code === '23505') {
        throw new ConflictException('El correo electrónico ya está registrado');
      }
      throw error;
    }
  }
}
