import { Module } from '@nestjs/common';

import { RepositoryModule } from '../providers/neo4j/repository/repository.module';

import { NODE } from './node.const';
import { NodeService } from './node.service';

@Module({
  imports: [RepositoryModule.forRoot({ type: NODE })],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
