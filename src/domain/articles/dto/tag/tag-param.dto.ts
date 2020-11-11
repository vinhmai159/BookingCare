import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class TagParamDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    tagId: string;
}
