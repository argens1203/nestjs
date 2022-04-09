import { DynamicModule } from '@nestjs/common';
import {
  DefaultConfig,
  RepositoryConfigInput,
} from './repository-config.interface';
import { REPOSITORY_OPTIONS } from './repository.const';
import { RepositoryService } from './repository.service';

export class RepositoryModule {
  static forRoot(config: RepositoryConfigInput): DynamicModule {
    return {
      providers: [
        {
          provide: REPOSITORY_OPTIONS,
          useValue: { ...DefaultConfig, ...config },
        },
        RepositoryService,
      ],
      module: RepositoryModule,
      exports: [RepositoryService],
    };
  }
}
