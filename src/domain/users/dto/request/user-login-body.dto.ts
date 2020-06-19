import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserLogInBodyDto {
    @Expose()
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak!!!!' })
    password: string;
}
