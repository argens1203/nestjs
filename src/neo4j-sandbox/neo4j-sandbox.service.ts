import { Injectable } from '@nestjs/common';

import { Neo4jService } from 'src/neo4j';

@Injectable()
export class Neo4jSandboxService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async put(name: string): Promise<string> {
    const result = await this.neo4jService.write(
      'CREATE (a:Person {name: $name}) RETURN a',
      { name },
    );
    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    return node.properties.name;
  }

  async get(name: string): Promise<any> {
    return this.neo4jService.read('MATCH (a:Person {name: $name}) RETURN a', {
      name,
    });
  }
}
