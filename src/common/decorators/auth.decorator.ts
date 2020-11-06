import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserGuard, DoctorGuard, AdminGuard, OthersGuard } from '../guards';

export enum AuthMode {
    USER_GUARD = 'USER_GUARD',
    DOCTOR_GUARD = 'DOCTOR_GUARD',
    ADMIN_GUARD = 'ADMIN_GUARD'
}

export const Auth = (modes: AuthMode[]): ClassDecorator & MethodDecorator & PropertyDecorator => {
    const guards: any[] = [];

    modes.forEach(item => {
        if (item === AuthMode.USER_GUARD) {
            guards.push(UserGuard);
        }

        if (item === AuthMode.DOCTOR_GUARD) {
            guards.push(DoctorGuard);
        }

        if (item === AuthMode.ADMIN_GUARD) {
            guards.push(AdminGuard);
        }
    });

    guards.push(OthersGuard);

    return applyDecorators(UseGuards(...guards));
};
