import { Module } from '@nestjs/common';

import { RepositoryModule } from '../providers/neo4j/repository/repository.module';

import { NodeController } from './node.controller';
import { NodeService } from './node.service';
import { NODE } from './types/node.const';

@Module({
  controllers: [NodeController],
  imports: [RepositoryModule.forRoot({ type: NODE })],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
