import { INestApplication } from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
export class DocumentationModule {
    static load(app: INestApplication) {
        const options = new DocumentBuilder().setTitle('Booking care')
                                            .setDescription('The BookingCare apis description.')
                                            .setVersion('1.0.0')
                                            .addTag('BookingCare')
                                            .build()
        const document =  SwaggerModule.createDocument(app as any, options);
        SwaggerModule.setup('api/docs', app as any, document);
    }
}