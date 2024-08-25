import { MigrationInterface, QueryRunner } from 'typeorm';
import { ContactType } from '../../enums/contact_type.enum.';
import { UserEntity } from '../entities/user.entity';
import { UserRole } from '../../enums/user_role.enum';
import { ContactEntity } from '../entities/contact.entity';
import { GenerateUUID } from '../../utils/generator.utils';

export class UserContactsSeeder1724154613182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userId = 'b3cc1210-4919-402d-9c2c-b69ab6ce6ff4';

    const contactDetails = [];
    contactDetails.push(
      { type: ContactType.Phone, value: '0206934539' },
      { type: ContactType.Email, value: 'admin@example.com' },
    );

    const user = new UserEntity();
    user.id = 'b3cc1210-4919-402d-9c2c-b69ab6ce6ff4';
    user.firstName = 'Contact';
    user.lastName = 'Administrator';
    user.email = 'admin@example.com';
    user.phone = '0206934539';
    user.password =
      '$2a$12$4gP/ECwhkrNLJsSUEFtQp.9uKCZojwUlrE1884.hNpoxGPIJ3tf06';
    user.role = UserRole.Admin;
    user.createdAt = new Date();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(user)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(ContactEntity)
      .values(this.getContacts(userId, contactDetails))
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private getContacts(
    userId: string,
    details: { type: ContactType; value: string }[],
  ): ContactEntity[] {
    const contacts = [];
    details.forEach(function (contactDetail) {
      const contact = new ContactEntity();
      contact.userId = userId;
      contact.id = GenerateUUID();
      contact.type = contactDetail.type;
      contact.value = contactDetail.value;
      contact.createdAt = new Date();

      contacts.push(contact);
    });

    return contacts;
  }
}
