import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './model/dto/create-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserInterface } from './model/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const username = createUserDto.username;
    const saltOrRounds = 10;
    const passwd = createUserDto.password;
    const password = await bcrypt.hash(passwd, saltOrRounds);
    const name = createUserDto.name;
    const obj = {
      username,
      password,
      name
    }
    return this.userService.create(obj);
  }

  @Get()
  findAll(): Promise<UserInterface[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const username = updateUserDto.username;
    const saltOrRounds = 10;
    const passwd = updateUserDto.password;
    const password = await bcrypt.hash(passwd, saltOrRounds);
    const name = updateUserDto.name;
    const obj = {
      id,
      username,
      password,
      name
    }
    return this.userService.update(+id, obj);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
