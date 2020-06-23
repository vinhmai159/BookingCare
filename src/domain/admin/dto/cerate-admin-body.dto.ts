import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional, MaxLength, MinLength, Validate, Matches } from 'class-validator';
import {Expose} from 'class-transformer';
import {Unique} from 'typeorm';

export class CreateAdminBodyDto {
    @Expose()
    @MaxLength(30)
    @MinLength(6)
    @ApiProperty()
    @IsNotEmpty()
    @Validate(Unique)
    userName: string;

    @Expose()
    @MaxLength(20)
    @MinLength(6)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Password too weak!!!!'})
    @ApiProperty()
    password: string;

    @IsOptional()
    @ApiProperty()
    name?: string;

    @IsOptional()
    @ApiProperty()
    phoneNumber?: string;
}
