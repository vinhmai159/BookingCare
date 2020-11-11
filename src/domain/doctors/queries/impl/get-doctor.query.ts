import { IQuery } from '@nestjs/cqrs';

export class GetDoctorQuery implements IQuery {
    constructor(public readonly id: string) {}
}
