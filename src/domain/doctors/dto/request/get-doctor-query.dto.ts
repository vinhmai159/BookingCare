import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetDoctorQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    expertise?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    hospital?: string;
}
