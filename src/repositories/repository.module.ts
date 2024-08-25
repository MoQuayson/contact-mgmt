import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ContactRepository } from './contact.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [UserRepository, ContactRepository],
  exports: [UserRepository, ContactRepository],
})
export class RepositoryModule {}
