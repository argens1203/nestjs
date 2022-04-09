import { Module } from '@nestjs/common';

import { RepositoryModule } from '../providers/neo4j/repository/repository.module';

import { RELATIONSHIP } from './relationship.const';
import { RelationshipService } from './relationship.service';

@Module({
  imports: [RepositoryModule.forRoot({ type: RELATIONSHIP })],
  providers: [RelationshipService],
  exports: [RelationshipService],
})
export class RelatinoshipModule {}
