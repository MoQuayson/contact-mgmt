import { Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';
import { UserRepository } from '../repositories/user.repository';
import { ContactRepository } from '../repositories/contact.repository';

@Injectable()
export class UsersService {
  constructor(
    private contactRepository: ContactRepository,

    private userRepository: UserRepository,
  ) {}

  async findAll(): Promise<UserDto[]> {
    //const users = await this.usersRepository.find();
    const users = await this.userRepository.findAll();
    const dto = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const numContacts = await this.contactRepository.countByUserId(user.id);
      dto.push(new UserDto().withUserEntity(user, numContacts));
    }

    return dto;
  }

  async findById(id: string): Promise<any> {
    const user = await this.userRepository.findById(id);
    const numContacts = await this.contactRepository.countByUserId(user.id);
    return new UserDto().withUserEntity(user, numContacts);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return new UserDto().withUserEntity(user);
  }
}
