import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    username: string;

    @Column({ type: 'varchar', length: 100 })
    firstname: string;

    @Column({ type: 'varchar', length: 100 })
    lastname: string;
}
