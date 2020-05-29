import {MigrationInterface, QueryRunner} from "typeorm";

export class v1590130574171 implements MigrationInterface {
    name = 'v1590130574171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `doctor` (`id` varchar(255) NOT NULL, `fistName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `addressDetail` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `salt` varchar(255) NOT NULL, `createAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `doctor`");
    }

}
