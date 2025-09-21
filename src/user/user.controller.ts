import { Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueryDto } from './dto/user-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('seed')
  async seedEmployees() {
    return this.userService.insertDummyData();
  }

  @Get()
  async getUsers(@Query() query: UserQueryDto) {
    return await this.userService.getUsers(query)
  }
}
