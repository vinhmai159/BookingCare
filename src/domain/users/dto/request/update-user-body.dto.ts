import { Exclude, Expose } from 'class-transformer';
import {IsEmail, IsNotEmpty, MaxLength, MinLength, Matches, IsOptional, IsString, IsDate} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class UpdateUserBodyDto {
    @Expose()
    @IsOptional()
    @ApiProperty()
    fistName?: string;

    @Expose()
    @IsOptional()
    @ApiProperty()
    lastName?: string;

    @Expose()
    @IsOptional()
    @ApiProperty()
    birthday?: Date;

    @Expose()
    @IsOptional()
    @ApiProperty()
    address?: string;

    @Expose()
    @IsOptional()
    @ApiProperty()
    gender?: string;
}
