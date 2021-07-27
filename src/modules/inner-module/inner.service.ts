import { Inject, Injectable } from '@nestjs/common';
import { INNER_MODULE_OPTIONS } from './module-options.const';
import { InnerModuleOptions } from './inner-module-options.interface';

@Injectable()
export class InnerService {
  constructor(
    @Inject(INNER_MODULE_OPTIONS)
    private readonly options: InnerModuleOptions = {},
  ) {}

  getConfig(): string {
    return this.options.main || 'CONFIG!';
  }
}
