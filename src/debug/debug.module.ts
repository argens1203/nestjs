import { Module } from '@nestjs/common';

import { NodeModule } from '../node';
import { RelatinoshipModule } from '../relationship';

import { DebugController } from './debug.controller';
import { DebugService } from './debug.service';
import { NodeController } from './node.controller';
import { RelationshipController } from './relationship.controller';

@Module({
  controllers: [DebugController, NodeController, RelationshipController],
  providers: [DebugService],
  imports: [NodeModule, RelatinoshipModule],
})
export class DebugModule {}
