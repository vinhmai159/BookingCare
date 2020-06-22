import { Injectable } from '@nestjs/common';
import { IExpertiseService } from '../interfaces';
import { Expertise } from '../entities';
import { ExpertiseRepository } from '../repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ExpertiseService implements IExpertiseService {
    constructor(
        @InjectRepository(ExpertiseRepository)
        private readonly expertiseRepository: ExpertiseRepository
    ) {}

    public async createExpertise(expertise: Expertise): Promise<Expertise> {
        expertise.id = uuid();
        return await this.expertiseRepository.saveExpertise(expertise);
    }

    public async getExpertises(name?: string): Promise<[Expertise[], number]> {
        return await this.expertiseRepository.getExpertises(name);
    }

    public async deleteExpertise(id: string): Promise<DeleteResult> {
        return await this.expertiseRepository.deleteExpertise(id);
    }

    public async upateExpertise(id: string, name: string): Promise<Expertise> {
        const expertise = await this.expertiseRepository.getExpertiseById(id);
        expertise.name = name;

        return await this.expertiseRepository.saveExpertise(expertise);
    }
}
