import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column()
    name: string;
    @Column()
    last_name: string;
    @Column()
    date_of_birth: Date;
    @Column()
    email: string;
    @Column()
    created_at: Date;
    @Column()
    user_verified_at: Date;
    @Column()
    deleted_at: Date;
    @Column()
    hashed_password: string;
    @Column()
    verification_key: number;
    @Column()
    reset_password_key: number;
    @Column()
    user_role: string;



}
