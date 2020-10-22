import { Exclude, Expose } from 'class-transformer';
import {IsEmail, IsNotEmpty, MaxLength, MinLength, Matches, IsOptional, IsString, IsDate} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {UpdateUserBodyDto} from './update-user-body.dto';

@Exclude()
export class CreateUserBodyDto extends UpdateUserBodyDto {
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @Expose()
    @MaxLength(20)
    @MinLength(6)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Wrong format of password!!!!'})
    @IsNotEmpty()
    @ApiProperty()
    password: string;

}
