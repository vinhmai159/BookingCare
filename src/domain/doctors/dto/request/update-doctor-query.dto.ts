import {Expose} from 'class-transformer';
import { MaxLength, MinLength, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateDoctorQueryDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    fistName: string;

    @Expose()
    @ApiProperty()
    lastName: string;

    @Expose()
    @ApiProperty()
    description: string;

    @Expose()
    @ApiProperty()
    addressDetail: string;

    @Expose()
    @ApiProperty()
    @MaxLength(30)
    @MinLength(6)
    email: string;

}