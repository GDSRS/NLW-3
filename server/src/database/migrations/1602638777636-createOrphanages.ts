import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrphanages1602638777636 implements MigrationInterface {
    name = 'createOrphanages1602638777636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orphanages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "latitude" decimal(2,10) NOT NULL, "longitude" decimal(2,10) NOT NULL, "about" varchar NOT NULL, "instructions" varchar NOT NULL, "opening_hours" varchar NOT NULL, "open_on_weekends" boolean NOT NULL DEFAULT (0))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orphanages"`);
    }

}
