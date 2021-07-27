import { Injectable } from '@nestjs/common';
import { ConsumerService } from './modules/consumer-module';

@Injectable()
export class AppService {
  constructor(private readonly consumerService: ConsumerService) {}

  getHello(): string {
    return this.consumerService.getGreetings();
  }
}
