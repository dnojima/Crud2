import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('auth/register')
  async register(@Body() body) {
    const { username, password, role } = body;
    const user = await this.usersService.register(username, password, role);
    return { message: 'Usuário registrado com sucesso', user };
  }
}
