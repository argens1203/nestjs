import { Module } from '@nestjs/common';
import { RepositoryModule } from '../providers/neo4j/repository/repository.module';
import { RELATIONSHIP } from './relationship.const';
import { RelationshipController } from './relationship.controller';
import { RelationshipService } from './relationship.service';

@Module({
  controllers: [RelationshipController],
  imports: [RepositoryModule.forRoot({ type: RELATIONSHIP })],
  providers: [RelationshipService],
})
export class RelatinoshipModule {}
