import {MigrationInterface, QueryRunner} from "typeorm";

export class initalTables1652837102059 implements MigrationInterface {
    name = 'initalTables1652837102059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(40) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "receitas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(40) NOT NULL, "preparation" text NOT NULL, "photos" character varying array NOT NULL, "difficult" integer NOT NULL, "user_id" uuid, CONSTRAINT "PK_8312a0fa7e81b3c0643ccac8b36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredientes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(40) NOT NULL, "price" numeric NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_8901a565cc70a661928d2011f2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredientes_receitas" ("receitasId" uuid NOT NULL, "ingredientesId" uuid NOT NULL, CONSTRAINT "PK_5728702a4430d7cf3c3eff6fa4e" PRIMARY KEY ("receitasId", "ingredientesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_759a08c0181601828c8209cc65" ON "ingredientes_receitas" ("receitasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f4671e93caacd4f48e335fe341" ON "ingredientes_receitas" ("ingredientesId") `);
        await queryRunner.query(`ALTER TABLE "receitas" ADD CONSTRAINT "FK_3e3d2c8cecdf883e6e86d810b06" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredientes_receitas" ADD CONSTRAINT "FK_759a08c0181601828c8209cc65f" FOREIGN KEY ("receitasId") REFERENCES "receitas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ingredientes_receitas" ADD CONSTRAINT "FK_f4671e93caacd4f48e335fe3410" FOREIGN KEY ("ingredientesId") REFERENCES "ingredientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredientes_receitas" DROP CONSTRAINT "FK_f4671e93caacd4f48e335fe3410"`);
        await queryRunner.query(`ALTER TABLE "ingredientes_receitas" DROP CONSTRAINT "FK_759a08c0181601828c8209cc65f"`);
        await queryRunner.query(`ALTER TABLE "receitas" DROP CONSTRAINT "FK_3e3d2c8cecdf883e6e86d810b06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4671e93caacd4f48e335fe341"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_759a08c0181601828c8209cc65"`);
        await queryRunner.query(`DROP TABLE "ingredientes_receitas"`);
        await queryRunner.query(`DROP TABLE "ingredientes"`);
        await queryRunner.query(`DROP TABLE "receitas"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
