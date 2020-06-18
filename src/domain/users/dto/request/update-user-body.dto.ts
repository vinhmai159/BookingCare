import { Exclude, Expose } from 'class-transformer';
import {IsEmail, IsNotEmpty, MaxLength, MinLength, Matches, IsOptional, IsString, IsDate} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class UpdateUserBodyDto {

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty()
    fistName?: string;

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty()
    lastName?: string;

    @Expose()
    @IsOptional()
    @ApiProperty()
    birthday?: Date;

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty()
    address?: string;

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty()
    gender?: string;
}
