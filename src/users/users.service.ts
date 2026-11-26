
import {
  Injectable,
  ConflictException, NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {


    const email = createUserDto.email.trim().toLowerCase();


    const existingUser = await this.usersRepository.findOneBy({
      email: email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }


    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      12,
    );

    //Creates a User entity in memory
    const user = this.usersRepository.create({
      name: createUserDto.name,
      last_name: createUserDto.last_name,
      date_of_birth: createUserDto.date_of_birth,
      email: email,
      hashed_password: hashedPassword,
      user_role: 'user',
      user_verified_at: null,
      deleted_at: null,
      verification_key: null,
      reset_password_key: null,
    });

    // Saves the user to PostgreSQL
    const savedUser = await this.usersRepository.save(user);

    // Returns only safe user information
    return {
      id: savedUser.id,
      name: savedUser.name,
      last_name: savedUser.last_name,
      email: savedUser.email,
    };
  }

  findAll() {
    return 'This action returns all users';
  }


  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }




  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
