import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDto, UserRequest } from './users.dto';
import { UserRepository } from '../repositories/user.repository';
import { ContactRepository } from '../repositories/contact.repository';
import { UserEntity } from '../database/entities/user.entity';
import { GenerateUUID } from '../utils/generator.utils';
import { ContactEntity } from '../database/entities/contact.entity';
import { ContactType } from '../enums/contact_type.enum.';
import { genSalt, hash } from 'bcrypt';

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

  async create(request: UserRequest): Promise<UserDto> {
    let user = new UserEntity();
    try {
      let hashedDefaultPassword = '';
      hash('password', await genSalt(), (err, hash) => {
        if (err) {
          // Handle error
          throw new InternalServerErrorException('failed to create user');
        }

        hashedDefaultPassword = hash;
      });
      user.id = GenerateUUID();
      user.firstName = request.firstName;
      user.lastName = request.lastName;
      user.email = request.email;
      user.password = hashedDefaultPassword;
      user.createdAt = new Date();

      if (request.phone != null && request.phone.length > 0) {
        user.phone = request.phone;
      }

      user = await this.userRepository.create(user);
      const contact = new ContactEntity();

      if (request.phone != null && user.phone.length > 0) {
        contact.id = GenerateUUID();
        contact.userId = user.id;
        contact.type = ContactType.Phone;
        contact.value = user.phone;
        contact.createdAt = new Date();
        await this.contactRepository.insert(contact);
      }

      if (request.email != null && user.email.length > 0) {
        contact.id = GenerateUUID();
        contact.userId = user.id;
        contact.type = ContactType.Email;
        contact.value = user.email;
        contact.createdAt = new Date();
        await this.contactRepository.insert(contact);
      }

      return new UserDto().withUserEntity(user);
    } catch (e) {
      console.log(e);
      await this.userRepository.deleteById(user.id);
      throw new InternalServerErrorException('failed to create user');
    }
  }
}
