import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { ContactEntity } from '../database/entities/contact.entity';
import { JwtModule } from '@nestjs/jwt';
import { GetJwtSecret } from '../utils/utils';
import { UsersModule } from '../users/users.module';
import { RepositoryModule } from '../repositories/repository.module';

@Module({
  imports: [
    UsersModule,
    RepositoryModule,
    JwtModule.register({
      global: true,
      secret: GetJwtSecret(),
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
