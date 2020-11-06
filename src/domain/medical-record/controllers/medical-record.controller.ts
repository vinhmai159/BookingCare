import { Controller, Get, HttpCode, Inject, Param, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Auth, AuthMode, UserGuard } from '../../../common';
import { MedicalRecordServiceToken } from '../constants';
import { MedicalRecord } from '../entities';
import { IMedicalRecordService } from '../interfaces';
import { jwt } from '../../../common/decorators/jwt.decorator';
import { User } from '../../users';
import { MedicalRecordParamDto } from '../dto';

interface MedicalRecordResponse {
    data: MedicalRecord[];
    total: number;
}

@ApiBearerAuth()
@ApiTags('/medical-record')
@Auth([AuthMode.USER_GUARD])
@Controller('/medical-record')
export class MedicalRecordController {
    constructor(
        @Inject(MedicalRecordServiceToken)
        private readonly medicalRecordService: IMedicalRecordService
    ) {}

    @ApiResponse({
        status: HttpStatus.OK,
        type: MedicalRecord,
        description: 'Get a medical record is successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:medicalRecordId')
    public async getMedicalRecord(@Param() paramDto: MedicalRecordParamDto): Promise<MedicalRecord> {
        const data = await this.medicalRecordService.getMedicalRecord(paramDto.medicalRecordId);

        return data;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: [MedicalRecord],
        description: 'Get medical record are successfully'
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    public async getMedicalRecords(@jwt() user: User): Promise<MedicalRecordResponse> {
        const [data, total] = await this.medicalRecordService.getMedicalRecords(user.id);

        return { data, total };
    }
}
