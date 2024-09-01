import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceOptions } from './app.datasource';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from './repositories/repository.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(AppDataSourceOptions),
    AuthModule,
    RepositoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
