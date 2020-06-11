import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const jwt = createParamDecorator((_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.doctor;
});