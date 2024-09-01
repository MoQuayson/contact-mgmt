import { UserEntity } from '../database/entities/user.entity';
import { AppDataSource } from '../app.datasource';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor() {}

  private manager = AppDataSource.manager.getRepository(UserEntity);

  async findAll(): Promise<UserEntity[]> {
    return await this.manager.find();
  }
  async findById(id: string): Promise<UserEntity> {
    return await this.manager.findOneBy({ id: id });
  }
  async findByEmail(email: string): Promise<UserEntity> {
    return await this.manager.findOneBy({ email: email });
  }
  async create(user: UserEntity): Promise<UserEntity> {
    return await this.manager.save(user);
  }
  async updateById(user: UserEntity): Promise<UserEntity> {
    return await this.manager.save(user);
  }
  async deleteById(id: string): Promise<any> {
    return await this.manager.delete({ id: id });
  }
}
