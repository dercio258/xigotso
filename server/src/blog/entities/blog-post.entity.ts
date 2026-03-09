import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('blog_posts')
export class BlogPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    category: string;

    @ManyToOne(() => User, { eager: true, nullable: true })
    author: User;

    @Column({ default: 'Equipa XIGOTSO' })
    authorNameFallback: string;

    @Column({ unique: true, nullable: true })
    slug: string;

    @Column({ nullable: true })
    authorName: string;

    @Column({ nullable: true })
    authorImage: string;

    @Column('simple-array', { nullable: true })
    gallery: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
