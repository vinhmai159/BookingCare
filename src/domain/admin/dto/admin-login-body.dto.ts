import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Matches, MinLength, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class AdminLogInDto {
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    userName: string;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak!!!!' })
    password: string;
}
