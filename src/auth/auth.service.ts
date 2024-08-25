import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequest } from './auth.dto';
import { compare } from 'bcrypt';
import { GetJwtSecret } from '../utils/utils';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(request: LoginRequest): Promise<boolean> {
    const user = await this.userRepository.findByEmail(request.email);
    if (user == null) {
      return false;
    }
    return await compare(request.password, user.password);
  }

  async getAuthenticatedUser(authHeader: string): Promise<any> {
    try {
      const token = this.extractBearerTokenFromHeader(authHeader);
      console.log('token: ', token);
      const payload = await this.jwtService.verifyAsync(token, {
        secret: GetJwtSecret(),
      });

      console.log('payload: ', payload);
      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractBearerTokenFromHeader(authHeader: string): string | undefined {
    const [type, token] = authHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
