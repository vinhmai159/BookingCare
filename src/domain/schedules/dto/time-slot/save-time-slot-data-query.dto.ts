import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SaveTimeSlotDataQueryDto {
    @Expose()
    @ApiProperty({ required: false })
    name: string;
}
