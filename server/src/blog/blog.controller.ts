import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPost } from './entities/blog-post.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Get()
    findAll() {
        return this.blogService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const post = await this.blogService.findOne(+id);
        if (!post) throw new NotFoundException(`Blog post with ID ${id} not found`);
        return post;
    }

    @Get('slug/:slug')
    async findBySlug(@Param('slug') slug: string) {
        const post = await this.blogService.findBySlug(slug);
        if (!post) throw new NotFoundException(`Blog post with slug ${slug} not found`);
        return post;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() post: Partial<BlogPost>, @Req() req: any) {
        return this.blogService.create({
            ...post,
            author: req.user,
        });
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() post: Partial<BlogPost>) {
        const updated = await this.blogService.update(+id, post);
        if (!updated) throw new NotFoundException(`Blog post with ID ${id} not found`);
        return updated;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.blogService.remove(+id);
    }
}
