import {Expose} from 'class-transformer';
import {IsNotEmpty, Matches, MaxLength, MinLength, Validate} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Unique } from 'typeorm';

export class CreateDoctorQueryDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    fistName: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @Expose()
    @ApiProperty()
    description: string;

    @Expose()
    @ApiProperty()
    addressDetail: string;

    @Expose()
    @MaxLength(30)
    @MinLength(6)
    @ApiProperty()
    @IsNotEmpty()
    @Validate(Unique)
    email: string;

    @Expose()
    @MaxLength(20)
    @MinLength(6)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Password too weak!!!!'})
    @ApiProperty()
    password: string;

}