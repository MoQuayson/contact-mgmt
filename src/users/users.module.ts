import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { ContactEntity } from '../database/entities/contact.entity';
import { UserRepository } from '../repositories/user.repository';
import { ContactRepository } from '../repositories/contact.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, ContactRepository],
  exports: [UsersService],
})
export class UsersModule {}
