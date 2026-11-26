import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Beer {
    @PrimaryGeneratedColumn("uuid")
    beer_id: string;
    @Column()
    beer_name: string;
    @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
    beer_abv: number;
    @Column()
    beer_type_id: string;
    @Column()
    brewery_id: string;
    @Column()
    beer_is_active: boolean;
}