import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async loginAdmin(credentials: { email: string; pass: string }) {
        if (credentials.email === 'admin@xigotso.co.mz' && credentials.pass === 'Manguele123') {
            const payload = { email: credentials.email, sub: 'admin', role: 'admin' };
            return {
                access_token: this.jwtService.sign(payload),
                user: { email: credentials.email, role: 'admin' }
            };
        }
        throw new UnauthorizedException('Credenciais inválidas');
    }
}
