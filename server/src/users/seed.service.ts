import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(private readonly usersService: UsersService) { }

    async onModuleInit() {
        await this.seedAdmin();
    }

    private async seedAdmin() {
        const adminEmail = 'admin@xigotso.co.mz';
        const existingAdmin = await this.usersService.findByEmail(adminEmail);

        if (!existingAdmin) {
            console.log('Seeding admin user...');
            await this.usersService.create({
                email: adminEmail,
                password: 'Manguele123',
                role: UserRole.ADMIN,
            });
            console.log('Admin user seeded successfully!');
        }
    }
}
