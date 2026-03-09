import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('analytics')
export class Visit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '/' })
    page: string;

    @Column({ nullable: true })
    userAgent: string;

    @Column({ nullable: true })
    ip: string;

    @CreateDateColumn()
    timestamp: Date;
}
