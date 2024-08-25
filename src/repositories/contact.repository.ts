import { AppDataSource } from '../app.datasource';
import { Injectable } from '@nestjs/common';
import { ContactEntity } from '../database/entities/contact.entity';

@Injectable()
export class ContactRepository {
  constructor() {}

  private manager = AppDataSource.manager.getRepository(ContactEntity);

  async findAll(): Promise<ContactEntity[]> {
    return await this.manager.find();
  }
  async findById(id: string): Promise<ContactEntity> {
    return await this.manager.findOneBy({ id: id });
  }

  async countByUserId(userId: string) {
    return await this.manager.countBy({ userId: userId });
  }
  async updateById(contact: ContactEntity): Promise<ContactEntity> {
    return await this.manager.save(contact);
  }
  async deleteById(id: string): Promise<any> {
    return await this.manager.delete({ id: id });
  }
}
