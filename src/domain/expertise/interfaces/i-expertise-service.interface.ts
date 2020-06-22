import { Expertise } from '../entities';
import { DeleteResult } from 'typeorm';

export interface IExpertiseService {
    createExpertise(expertise: Expertise): Expertise | Promise<Expertise>;

    getExpertises(name?: string): [Expertise[], number] | Promise<[Expertise[], number]>;

    deleteExpertise(id: string): Promise<DeleteResult>;

    upateExpertise(id: string, name: string): Expertise | Promise<Expertise>;
}
