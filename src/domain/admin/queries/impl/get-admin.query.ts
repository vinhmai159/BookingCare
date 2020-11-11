import { IQuery } from '@nestjs/cqrs';

export class GetAdminQuery implements IQuery {
    constructor(public readonly id: string) {}
}
