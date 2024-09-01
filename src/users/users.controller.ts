import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserRequest } from './users.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse } from '../dtos/api_response.dto';
import { FormatValidationErrors } from '../utils/formatters.utils';
import { validate } from 'class-validator';
import { UpdateContactRequest } from '../contacts/contacts.dto';
import { CustomBody, RequestBody } from '../utils/decorators.utils';
import { LoginRequest } from '../auth/auth.dto';
import { ValidateRequestPayload } from '../utils/utils';

@Controller('api/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  async findAllUsers(): Promise<ApiResponse> {
    const users = await this.usersService.findAll();
    return new ApiResponse({
      code: 200,
      message: 'user(s) retrieved successfully',
      data: users,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ApiResponse> {
    const user = await this.usersService.findById(id);
    return new ApiResponse({
      code: 200,
      message: 'user(s) retrieved successfully',
      data: user,
    });
  }

  @Post()
  // @UseInterceptors(ClassSerializerInterceptor)
  async createUser(
    @Body()
    request: UserRequest,
  ): Promise<ApiResponse> {
    const errs = FormatValidationErrors(
      await validate(plainToInstance(UserRequest, request)),
    );

    if (errs.length != 0) {
      throw new BadRequestException('validation error(s)', {
        cause: JSON.stringify(errs),
      });
    }

    const user = await this.usersService.create(request);
    return new ApiResponse({
      code: 201,
      message: 'user(s) created successfully',
      data: user,
    });
  }
}
