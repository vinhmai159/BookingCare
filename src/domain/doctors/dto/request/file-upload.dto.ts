import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class FileUploadDto {
    @ApiProperty({
        type: 'string',
        format: 'binary'
    })
    @IsNotEmpty()
    @Expose()
    file: any;
}
