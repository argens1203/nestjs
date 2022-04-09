import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Neo4jAsyncConfig } from './neo4j-async-config.interface';
import { Neo4jConfig } from './neo4j-config.interface';
import { NEO4J_DRIVER, NEO4J_OPTIONS } from './neo4j.const';
import { Neo4jService } from './neo4j.service';
import { createDriver } from './neo4j.util';

export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      providers: [
        {
          provide: NEO4J_OPTIONS,
          useValue: config,
        },
        ...DEFAULT_PROVIDERS,
      ],
      ...DEFAULT_MODULE_DEFINITION,
    };
  }

  static forRootAsync(config: Neo4jAsyncConfig): DynamicModule {
    return {
      providers: [
        {
          ...config,
          provide: NEO4J_OPTIONS,
        },
        ...DEFAULT_PROVIDERS,
      ],
      ...DEFAULT_MODULE_DEFINITION,
      imports: [ConfigModule],
    };
  }
}

const DEFAULT_PROVIDERS = [
  {
    provide: NEO4J_DRIVER,
    inject: [NEO4J_OPTIONS],
    useFactory: async (config: Neo4jConfig) => createDriver(config),
  },
  Neo4jService,
];

const DEFAULT_MODULE_DEFINITION = {
  module: Neo4jModule,
  exports: [Neo4jService],
  global: true,
};
