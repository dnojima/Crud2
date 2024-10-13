import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      // Se não houver roles requeridas, permite o acesso
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as { role: UserRole };

    if (!user) {
      // Se não houver usuário na requisição, nega o acesso
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
