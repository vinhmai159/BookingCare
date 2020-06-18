import { Exclude, Expose } from 'class-transformer';
import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class IdUserParamDto {
    @Expose()
    @IsString()
    @IsUUID()
    @ApiProperty()
    id: string;
}
