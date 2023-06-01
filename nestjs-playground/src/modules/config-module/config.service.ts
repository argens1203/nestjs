import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getMain(): string {
    return 'MEHHHH~';
  }
}
