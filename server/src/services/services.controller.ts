import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) { }

    @Get()
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':slug')
    async findOne(@Param('slug') slug: string) {
        const service = await this.servicesService.findBySlug(slug);
        if (!service) throw new NotFoundException(`Service with slug ${slug} not found`);
        return service;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() service: Partial<Service>) {
        return this.servicesService.create(service);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() service: Partial<Service>) {
        const updated = await this.servicesService.update(+id, service);
        if (!updated) throw new NotFoundException(`Service with ID ${id} not found`);
        return updated;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.servicesService.remove(+id);
    }
}
