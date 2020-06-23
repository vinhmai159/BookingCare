import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {DeleteResult} from 'typeorm';
import { IAdminService } from '../interfaces';
import { Admin } from '../entities';
import { AdminRepository } from '../repositories';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {isNullOrUndefined} from 'util';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AdminService implements IAdminService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository,
        private readonly jwtService: JwtService

    ) {}
    public async createAdmin(admin: Admin): Promise<Admin> {
        admin.id = uuid();
        return await this.adminRepository.saveAdmin(admin);
    }

    public async getAdmins(name?: string): Promise<[Admin[], number]> {
        return await this.adminRepository.getAdmins(name);
    }

    public async deleteAdmin(id: string): Promise<DeleteResult> {
        return await this.adminRepository.deleteAdmin(id);
    }

    public async updateAdmin(id: string, admin: Admin): Promise<Admin> {
        const exitAdmin = await this.adminRepository.getAdminById(id);
        if (!isNullOrUndefined(admin.name)) {
            exitAdmin.name = admin.name;
        }

        if (!isNullOrUndefined(admin.phoneNumber)) {
            exitAdmin.phoneNumber = admin.phoneNumber;
        }

        return await this.adminRepository.saveAdmin(exitAdmin);
    }

    async adminLogin(userName: string, password: string): Promise<{ accessToken: string}> {
        const admin = await this.adminRepository.getAdmin(userName);
        if ( admin && await this.validatePassword(password, admin.password)) {
            const {
                id,
                name,
                userName,
                createAt,
                updateAt
            } = admin;
            const payload = {
                id,
                name,
                userName,
                createAt,
                updateAt
            }
            const accessToken = await this.jwtService.sign(payload)
            return {accessToken, ...payload}
        }
        throw new UnauthorizedException('INVALID EMAIL OR PASSWORD!');
    }

    async validatePassword(password: string, passwordHashed: string): Promise<boolean> {
        return await bcrypt.compare(password,passwordHashed);
    }
}
