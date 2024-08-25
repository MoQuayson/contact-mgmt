import { MigrationInterface, QueryRunner } from "typeorm";

export class NullablePhoneColumnUsersTable1724183068148 implements MigrationInterface {
    name = 'NullablePhoneColumnUsersTable1724183068148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
    }

}
