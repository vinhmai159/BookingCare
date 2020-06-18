import { Exclude, Expose } from 'class-transformer';
import {IsString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class GetUserBodyDto {
    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string;

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty()
    email?: string;

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty()
    address?: string;
}
