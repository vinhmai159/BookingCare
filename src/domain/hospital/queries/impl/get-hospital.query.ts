import { IQuery } from '@nestjs/cqrs';

export class GetHospitalQuery implements IQuery {
    constructor(public readonly id: string) {}
}
