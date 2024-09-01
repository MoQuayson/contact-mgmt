import { classToPlain, Expose, Transform, Type } from 'class-transformer';
import { UserEntity } from '../database/entities/user.entity';
import { UserRole } from '../enums/user_role.enum';
import { IsUUID } from '../validations/validation-decorators.utils';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';

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

export class UserRequest {
  //@IsUUID({message: (p)=>`${p.property} must be a valid uuid`})
  @IsNotEmpty({ message: (p) => `${p.property} cannot be empty` })
  @Length(3, 100, { message: (p) => `${p.property} must be between 3 and 100` })
  firstName: string;
  @Length(3, 100, { message: (p) => `${p.property} must be between 3 and 100` })
  lastName: string;
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;
  @ValidateIf((o) => o.phone === '' || null)
  @IsNotEmpty({ message: (p) => `${p.property} cannot be empty` })
  @IsMobilePhone(null, {}, { message: 'phone must be a valid mobile number' })
  phone: string | null;
}
