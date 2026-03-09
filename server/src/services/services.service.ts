import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private readonly servicesRepository: Repository<Service>,
    ) { }

    findAll(): Promise<Service[]> {
        return this.servicesRepository.find();
    }

    findOne(id: number): Promise<Service | null> {
        return this.servicesRepository.findOneBy({ id });
    }

    findBySlug(slug: string): Promise<Service | null> {
        return this.servicesRepository.findOneBy({ slug });
    }

    create(service: Partial<Service>): Promise<Service> {
        const newService = this.servicesRepository.create(service);
        return this.servicesRepository.save(newService);
    }

    async update(id: number, service: Partial<Service>): Promise<Service | null> {
        await this.servicesRepository.update(id, service);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.servicesRepository.delete(id);
    }
}
