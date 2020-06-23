import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdAdminParamDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    id: string;
}
