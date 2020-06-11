import { CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {ExtractJwt} from './extract.jwt';

export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // const token = request.headers['x-access-token'] || request.headers.authorization;
        const token = ExtractJwt.fromAuthHeader('x-access-token')(request);

        if (token) {
            const user = this.validateToken(token);
            request.doctor = user;
        } else {
            throw new HttpException('Auth token is not supplied!', HttpStatus.BAD_REQUEST);
        }
        return true;
    }

    validateToken(token: string) {
        return jwt.verify(token, 'bookingcare', (err, decode) => {
            if(err) {
                return (new HttpException(err.toString(), HttpStatus.BAD_REQUEST));
            }
            return (decode);
        });
    }
}
