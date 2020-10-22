// import { BadRequestException, HttpService, LoggerService } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { EventPayload } from '../mappers';

// export class BaseHandler {
//     constructor(protected readonly loggerService: LoggerService, protected readonly httpService?: HttpService) {}

//     protected async sendEventAsync(clientProxy: ClientProxy, event: string, payload: EventPayload<any>) {
//         try {
//             if (clientProxy) {
//                 return await clientProxy.emit({ cmd: event }, payload).toPromise();
//             }
//         } catch (e) {
//             this.loggerService.error(e);
//         }
//     }

//     protected async sendEvent<T>(clientProxy: ClientProxy, event: string, payload: EventPayload<any>): Promise<T> {
//         this.validateClientProxy(clientProxy);

//         try {
//             return await clientProxy.send<T>({ cmd: event }, payload).toPromise();
//         } catch (e) {
//             throw new BadRequestException(e);
//         }
//     }

//     private validateClientProxy(clientProxy: ClientProxy) {
//         if (!clientProxy) {
//             throw new BadRequestException('CLIENT_PROXY_CONFIGURATION_MISSING_ERR');
//         }
//     }
// }
