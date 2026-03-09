import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogPost)
        private blogRepository: Repository<BlogPost>,
    ) { }

    findAll(): Promise<BlogPost[]> {
        return this.blogRepository.find({ order: { createdAt: 'DESC' } });
    }

    async findOne(id: number): Promise<BlogPost | null> {
        return this.blogRepository.findOne({ where: { id } });
    }

    async findBySlug(slug: string): Promise<BlogPost | null> {
        return this.blogRepository.findOne({ where: { slug } });
    }

    create(post: Partial<BlogPost>): Promise<BlogPost> {
        const newPost = this.blogRepository.create(post);
        return this.blogRepository.save(newPost);
    }

    async update(id: number, post: Partial<BlogPost>): Promise<BlogPost | null> {
        await this.blogRepository.update(id, post);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.blogRepository.delete(id);
    }
}
