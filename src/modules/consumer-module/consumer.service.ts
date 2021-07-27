import { Injectable } from '@nestjs/common';
import { InnerService } from '../inner-module';

@Injectable()
export class ConsumerService {
  constructor(private readonly innerService: InnerService) {}

  getGreetings(): string {
    return `Greetings: ${this.innerService.getConfig()}`;
  }
}
