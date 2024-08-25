import { classToPlain, Expose, Transform, Type } from 'class-transformer';
import { UserEntity } from '../database/entities/user.entity';
import { UserRole } from '../enums/user_role.enum';

export class UserDto {
  id: string;
  @Expose({ name: 'first_name' })
  firstName: string;
  @Expose({ name: 'last_name' })
  lastName: string;
  email: string;
  phone: string;
  role: string;
  @Expose({ name: 'num_contacts' })
  numContacts: number;
  token: string;
  @Expose({ name: 'created_at' })
  createdAt: string;

  withUserEntity(
    user: UserEntity,
    numContacts?: number,
    token?: string,
  ): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;
    dto.email = user.email;
    dto.phone = user.phone;
    dto.role = user.role;
    dto.numContacts = numContacts;
    dto.token = token;
    dto.createdAt = user.createdAt;
    return dto;
  }
}
