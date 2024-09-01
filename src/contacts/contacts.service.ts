import { BadRequestException, Injectable } from '@nestjs/common';
import { ContactRepository } from '../repositories/contact.repository';
import {
  ContactDto,
  CreateContactRequest,
  UpdateContactRequest,
} from './contacts.dto';
import { ContactEntity } from '../database/entities/contact.entity';
import { GenerateUUID } from '../utils/generator.utils';

@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactRepository) {}

  async findAll(): Promise<ContactDto[]> {
    const data = [];
    const contacts = await this.contactRepository.findAll();
    contacts.forEach(function (contact) {
      data.push(new ContactDto(contact));
    });

    return data;
  }

  async findById(id: string): Promise<ContactDto> {
    const contact = await this.contactRepository.findById(id);
    return new ContactDto(contact);
  }

  async addNewContact(request: CreateContactRequest): Promise<ContactDto> {
    let contact = new ContactEntity();
    contact.id = GenerateUUID();
    contact.type = request.type;
    contact.value = request.value;
    contact.userId = request.userId;
    contact.createdAt = new Date();
    contact = await this.contactRepository.insert(contact);
    return new ContactDto(contact);
  }

  async updateById(
    contactId: string,
    request: UpdateContactRequest,
  ): Promise<ContactDto> {
    let contact = await this.contactRepository.findById(contactId);
    if (contact == null) {
      throw new BadRequestException('contact does not exist');
    }

    contact.type = request.type;
    contact.value = request.value;
    contact.updatedAt = new Date();

    contact = await this.contactRepository.updateById(contact);
    return new ContactDto(contact);
  }

  async deleteContact(id: string): Promise<boolean> {
    return await this.contactRepository.deleteById(id);
  }
}
