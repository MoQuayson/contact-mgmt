import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseFilters,
  Headers,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginRequest } from './auth.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FormatValidationErrors } from '../utils/formatters.utils';
import { HttpExceptionFilter } from '../http-exception.filter';
import { AuthService } from './auth.service';
import { ApiResponse } from '../dtos/api_response.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtClaim } from '../dtos/jwt-claim.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('sign-in')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async signIn(@Body() request: LoginRequest): Promise<ApiResponse> {
    //console.log(request);

    const errs = FormatValidationErrors(
      await validate(plainToInstance(LoginRequest, request)),
    );

    if (errs.length != 0) {
      throw new BadRequestException('validation error(s)', {
        cause: JSON.stringify(errs),
      });
    }

    const isAuthenticated = await this.authService.authenticateUser(request);

    if (!isAuthenticated) {
      throw new UnauthorizedException('invalid credentials. try again later');
    }

    const user = await this.userService.findByEmail(request.email);
    const claim: JwtClaim = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    user.token = await this.jwtService.signAsync(claim);
    const resp: ApiResponse = {
      code: 200,
      message: 'user authenticated',
      data: user,
    };
    return resp;
  }

  @Get('current-user')
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@Headers('authorization') authHeader) {
    console.log(authHeader);

    if (authHeader == null) {
      throw new UnauthorizedException('user not authenticated');
    }

    return await this.authService.getAuthenticatedUser(authHeader);
  }
}
