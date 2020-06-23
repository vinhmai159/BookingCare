import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class AdminBodyDto {
    @IsOptional()
    @ApiProperty()
    name?: string;

    @IsOptional()
    @ApiProperty()
    phoneNumber?: string;
}
