import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './model/dto/create-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/entities/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './model/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserInterface[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }

  async hashPassword(userInterface: UserInterface) {
    const username = userInterface.username;
    const saltOrRounds = 10;
    const passwd = userInterface.password;
    const password = await bcrypt.hash(passwd, saltOrRounds);
    const name = userInterface.name;
    const data = {
      username,
      password,
      name
    }
    return data;
  }
}
