import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('characteristics')
export class Characteristic {

    @PrimaryGeneratedColumn('uuid')
    characteristic_id: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
    })
    characteristic_name: string;
}