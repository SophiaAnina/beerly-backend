import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
export type Role = 'user'| 'admin';
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    last_name: string;

    @Column({ type: 'date' })
    date_of_birth: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    user_verified_at: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;

    @Column({ type: 'varchar', nullable: true, select: false })
    hashed_password: string | null;
    
    @Column({ type: 'varchar', nullable: true })
    verification_key: string | null;

    @Column({ type: 'varchar', nullable: true })
    reset_password_key: string | null;

    @Column('simple-array',{ default: 'user' })
    user_role: Role[];

    
}