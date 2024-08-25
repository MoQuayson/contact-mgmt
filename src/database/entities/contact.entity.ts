import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { EntityBase } from './entity';
import { ContactType } from '../../enums/contact_type.enum.';

@Entity('contacts')
export class ContactEntity extends EntityBase {
  @Column({
    name: 'type',
    type: 'varchar',
    nullable: false,
    default: ContactType.Others,
  })
  type: string;

  @Column({ name: 'value', type: 'varchar', length: 150, nullable: false })
  value: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.contacts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
