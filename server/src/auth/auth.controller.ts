import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login/admin')
    async loginAdmin(@Body() body: { email: string; pass: string }) {
        return this.authService.loginAdmin(body);
    }
}
