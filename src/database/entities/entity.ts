import { Column } from 'typeorm';

export abstract class EntityBase {
  @Column({ name: 'id', type: 'uuid', primary: true })
  id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: any;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: any;
}
