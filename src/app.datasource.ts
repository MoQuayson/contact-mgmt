import { UserEntity } from './database/entities/user.entity';
import { ContactEntity } from './database/entities/contact.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

// export const DataSourceConfig = new DataSource({
//   type: 'postgres',
//   // host: process.env.DB_HOST,
//   // port: parseInt(process.env.DB_PORT),
//   // username: process.env.DB_USERNAME,
//   // password: process.env.DB_PASSWORD,
//   // database: process.env.DB_DATABASE,
//
//   host: '127.0.0.1',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'contact_mgmt_db',
//   entities: [UsersEntity, ContactsEntity],
//   autoLoadEntities: true,
//   synchronize: false,
//   migrations: ['database/migrations'],
// });

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'contact_mgmt_db',
  entities: [UserEntity, ContactEntity],
  migrations: ['dist/database/migrations/*.js', 'dist/database/seeders/*.js'],
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(AppDataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
