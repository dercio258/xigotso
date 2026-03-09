import { Controller, Get, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Get()
    async findAll() {
        return this.settingsService.findAll();
    }

    @Post()
    async update(@Body() data: { key: string; value: string }) {
        return this.settingsService.update(data.key, data.value);
    }
}
