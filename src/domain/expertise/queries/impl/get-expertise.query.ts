import { IQuery } from '@nestjs/cqrs';

export class GetExpertiseQuery implements IQuery {
    constructor(public readonly id: string) {}
}
