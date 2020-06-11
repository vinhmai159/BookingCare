import { IQuery } from '@nestjs/cqrs';

export class JwtQuery implements IQuery {
    constructor(public readonly token: string) {}
}
