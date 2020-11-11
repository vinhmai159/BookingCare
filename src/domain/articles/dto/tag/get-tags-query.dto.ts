import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetTagsQueryDto {
    @ApiProperty({
        required: false
    })
    @IsOptional()
    name?: string;
}
