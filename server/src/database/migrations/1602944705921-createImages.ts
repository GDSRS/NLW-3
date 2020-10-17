import {MigrationInterface, QueryRunner} from "typeorm";

export class createImages1602944705921 implements MigrationInterface {
    name = 'createImages1602944705921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "orphanageId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "orphanageId" integer, CONSTRAINT "FK_96b2848afc17474a8c87a0b8caf" FOREIGN KEY ("orphanageId") REFERENCES "orphanages" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_images"("id", "path", "orphanageId") SELECT "id", "path", "orphanageId" FROM "images"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "temporary_images" RENAME TO "images"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" RENAME TO "temporary_images"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "orphanageId" integer)`);
        await queryRunner.query(`INSERT INTO "images"("id", "path", "orphanageId") SELECT "id", "path", "orphanageId" FROM "temporary_images"`);
        await queryRunner.query(`DROP TABLE "temporary_images"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
