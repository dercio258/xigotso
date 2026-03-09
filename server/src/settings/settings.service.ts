import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService implements OnModuleInit {
    constructor(
        @InjectRepository(Setting)
        private settingsRepository: Repository<Setting>,
    ) { }

    async onModuleInit() {
        // Seed default settings if they don't exist
        const defaults = [
            { key: 'site_name', value: 'XIGOTSO Soluções & Serviços, Lda', description: 'Nome oficial da empresa' },
            { key: 'contact_phone', value: '(+258) 87 388 2380', description: 'Telefone de contacto' },
            { key: 'contact_email', value: 'info@xigotso.co.mz', description: 'Email de contacto' },
            { key: 'site_address', value: 'Rua Estacio Dias, nº 138, Maputo', description: 'Endereço físico' },
            { key: 'site_description', value: 'Especialistas em identidade visual e marketing digital.', description: 'Breve descrição do site' },
        ];

        for (const item of defaults) {
            const exists = await this.settingsRepository.findOne({ where: { key: item.key } });
            if (!exists) {
                await this.settingsRepository.save(item);
            }
        }
    }

    async findAll(): Promise<Setting[]> {
        return this.settingsRepository.find();
    }

    async update(key: string, value: string): Promise<Setting> {
        let setting = await this.settingsRepository.findOne({ where: { key } });
        if (!setting) {
            setting = this.settingsRepository.create({ key, value });
        } else {
            setting.value = value;
        }
        return this.settingsRepository.save(setting);
    }

    async getByKey(key: string): Promise<string> {
        const setting = await this.settingsRepository.findOne({ where: { key } });
        return setting ? setting.value : '';
    }
}
