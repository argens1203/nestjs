import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j';
import { CreateNodeDto } from './create-node.dto';

@Injectable()
export class NodeService {
  constructor(private readonly dbService: Neo4jService) {}

  create(dto: CreateNodeDto) {
    const { data, type, title } = dto;

    return this.dbService.write(
      'CREATE (a:Node {data: $data, type: $type, title: $title}) RETURN a',
      { data, type, title },
    );
  }

  getByTitle(title: string) {
    return this.dbService.read('MATCH (a:Node {title: $title}) RETURN a', {
      title,
    });
  }

  scan() {
    return this.dbService.read('MATCH (a:Node) RETURN a');
  }

  // TODO: move to migration
  addUniqueConstraint() {
    return this.dbService.write(
      'CREATE CONSTRAINT UniqueTitle ' +
        'IF NOT EXISTS FOR (n:Node) ' +
        'REQUIRE n.title IS UNIQUE',
    );
  }
}
