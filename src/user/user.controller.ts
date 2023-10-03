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
    const user = await this.userService.hashPassword(createUserDto);
    return this.userService.create(user);
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
    const user = await this.userService.hashPassword(updateUserDto);
    return this.userService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
