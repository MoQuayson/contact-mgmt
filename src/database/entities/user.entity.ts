import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserRole } from '../../enums/user_role.enum';
import { EntityBase } from './entity';
import { ContactEntity } from './contact.entity';

@Entity('users')
export class UserEntity extends EntityBase {
  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  lastName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: true,
  })
  phone: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 100,
    default: UserRole.User,
  })
  role: string;

  @Column({ name: 'password', length: 100, nullable: false })
  password: string;

  contacts: ContactEntity[];
}
