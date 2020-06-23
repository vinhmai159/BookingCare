import { Admin } from '../entities';
import { DeleteResult } from 'typeorm';

export interface IAdminService {
    createAdmin(admin: Admin): Admin | Promise<Admin>;

    getAdmins(name?: string): [Admin[], number] | Promise<[Admin[], number]>;

    deleteAdmin(id: string): Promise<DeleteResult>;

    updateAdmin(id: string, admin: Admin): Admin | Promise<Admin>;

    adminLogin(userName: string, password: string): Promise<{ accessToken: string}>
}
