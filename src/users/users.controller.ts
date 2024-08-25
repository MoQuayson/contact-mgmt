import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';
import { instanceToPlain } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async findAllUsers(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    //console.log(users);

    return users;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.findById(id);
    return user;
  }
}
