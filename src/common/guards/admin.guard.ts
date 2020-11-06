import { CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt } from './extract.jwt';
import { isNil } from 'lodash';

export class AdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // const token = request.headers['x-access-token'] || request.headers.authorization;
        const token = ExtractJwt.fromAuthHeader('x-access-token')(request);

        if (isNil(token)) {
            const admin = await this.validateToken(token);
            // tslint:disable-next-line: no-conditional-assignment
            if (admin.role !== 'admin') {
                throw new HttpException('The token have not permission!', HttpStatus.BAD_REQUEST);
            }

            request.user = admin;
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
