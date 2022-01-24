import { Module } from '@nestjs/common';

import { Neo4jSandboxService } from './neo4j-sandbox.service';

@Module({
  providers: [Neo4jSandboxService],
  exports: [Neo4jSandboxService],
})
export class Neo4jSandboxModule {}
