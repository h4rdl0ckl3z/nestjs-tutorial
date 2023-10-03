import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './model/dto/create-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';
import { User } from './model/entities/user.entity';
import * as bcrypt from 'bcrypt';

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
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
