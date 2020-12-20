import { Exclude, Expose } from 'class-transformer';
import {IsString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class GetUserBodyDto {
    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({
        required: false
    })
    data?: string;
}
