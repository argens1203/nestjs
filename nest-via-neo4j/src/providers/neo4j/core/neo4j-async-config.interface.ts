import { FactoryProvider } from '@nestjs/common';

import { Neo4jConfig } from './neo4j-config.interface';

export type Neo4jAsyncConfig = Omit<FactoryProvider<Neo4jConfig>, 'provide'>;
