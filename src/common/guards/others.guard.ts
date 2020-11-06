import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class OthersGuard implements CanActivate {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        if (!req.user) {
            throw new UnauthorizedException('The \'Authorization\' header is provided in an invalid format');
        }

        return true;
    }
}
