import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, type: 'varchar', length: 30 })
    username: string;

    @Column({ select: false, type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;
}
