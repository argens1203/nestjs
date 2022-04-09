import { Module } from '@nestjs/common';

import { RepositoryModule } from '../providers/neo4j/repository/repository.module';

import { NodeService } from './node.service';
import { NODE } from './types/node.const';

@Module({
  imports: [RepositoryModule.forRoot({ type: NODE })],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
