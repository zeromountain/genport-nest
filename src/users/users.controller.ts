import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

@Controller('user')
@ApiTags('유저 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @ApiOperation({
    summary: '유저 전체 조회',
    description: '유저 전체 조회 API',
  })
  async fetchAllUser() {
    return await this.usersService.fetchAllUsers();
  }

  @Get('/:id')
  @ApiOperation({
    summary: '유저 단일 조회',
    description: '유저 단일 조회 API',
  })
  async fetchUser(@Param('id') id: number) {
    return await this.usersService.fetchUser({ id });
  }

  //----------------- 생성 -----------------------//
  @Post('/')
  @ApiOperation({ summary: '유저 생성', description: '유저 생성 API' })
  async createUser(@Body() createUserInput: CreateUserInput) {
    return await this.usersService.create({ createUserInput });
  }

  //----------------- 업데이트 -----------------------//
  @Patch('/:id')
  @ApiOperation({ summary: '유저 업데이트', description: '유저 업데이트 API' })
  async updateUser(
    @Body() updateUserInput: UpdateUserInput,
    @Param('id') id: string,
  ) {
    return await this.usersService.update({ id, updateUserInput });
  }

  //----------------- 삭제 -----------------------//
  @Delete('/:id')
  @ApiOperation({ summary: '유저 삭제', description: '유저 삭제 API' })
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.delete({ id });
  }
}
