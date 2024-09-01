import { ContactEntity } from '../database/entities/contact.entity';
import {
  Contains,
  IS_UUID,
  IsNotEmpty,
  Length,
  ValidateIf,
} from 'class-validator';
import { IsUUID } from '../validations/validation-decorators.utils';
import { IsValidContactType } from '../validations/contact-type.decorators';

export class ContactDto {
  id: string;
  type: string;
  value: string;
  user: string;
  userId: string;
  createdAt: string;

  constructor(contact: ContactEntity) {
    this.id = contact.id;
    this.type = contact.type;
    this.value = contact.value;
    this.userId = contact.userId;
    this.createdAt = contact.createdAt;
  }
}

export class CreateContactRequest {
  @IsNotEmpty({
    message: 'contact_type cannot be empty. must be phone or email',
  })
  @IsValidContactType()
  type: string;
  @IsNotEmpty({ message: 'value cannot be empty' })
  @Length(5, 30, { message: 'value must be between 5 to 30' })
  value: string;
  @IsNotEmpty({ message: (o) => `${o.property} cannot be empty` })
  @IsUUID()
  userId: string;
}

export class UpdateContactRequest extends CreateContactRequest {
  // @IsNotEmpty({ message: (o) => `${o.property} cannot be empty` })
  // @IsUUID()
  // id: string;
}
