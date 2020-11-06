import { CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt } from './extract.jwt';
import { isNil } from 'lodash';

export class UserGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // const token = request.headers['x-access-token'] || request.headers.authorization;
        const token = ExtractJwt.fromAuthHeader('x-access-token')(request);

        if (isNil(token)) {
            const user = await this.validateToken(token);

            if (user.role !== 'user') {
                throw new HttpException('The token have not permission!', HttpStatus.BAD_REQUEST);
            }

            request.user = user;
        } else {
            throw new HttpException('Auth token is not supplied!', HttpStatus.BAD_REQUEST);
        }
        return true;
    }

    public async validateToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'bookingcare', (err, decode) => {
                if (err) {
                    return reject(new HttpException(err.toString(), HttpStatus.BAD_REQUEST));
                }
                resolve(decode);
            });
        });
    }
}
