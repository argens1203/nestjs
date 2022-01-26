import { BadRequestException, Injectable } from '@nestjs/common';
import { Record as Neo4jRecord } from 'neo4j-driver-core';
import { Neo4jService } from '../neo4j';
import { CreateNodeDto } from './create-node.dto';

@Injectable()
export class NodeService {
  constructor(private readonly dbService: Neo4jService) {}

  async create(dto: CreateNodeDto) {
    const { data, type = 'TEXT', title, ref = '' } = dto;

    return await this.writeAndExtract(
      'CREATE (a:Node {data: $data, type: $type, title: $title, ref: $ref}) RETURN a',
      { data, type: type.toUpperCase(), title, ref: ref.toUpperCase() },
    );
  }

  async getByTitle(title: string) {
    return this.dbService.read('MATCH (a:Node {title: $title}) RETURN a', {
      title,
    });
  }

  async getByRef(ref: string) {
    if (!ref) {
      throw new BadRequestException('Ref cannot be undefined when querying.');
    }
    return await this.readAndExtract('MATCH (a:Node {ref: $ref}) RETURN a', {
      ref: ref.toUpperCase(),
    });
  }

  async scan() {
    return await this.readAndExtract('MATCH (a:Node) RETURN a');
  }

  async readAndExtract(cypher: string, params?: Record<string, any>) {
    const result = await this.dbService.read(cypher, params);
    const records = result.records || [];

    return records
      .map((rec: Neo4jRecord) => rec.keys.map((k) => rec.get(k).properties))
      .flat(Infinity);
  }

  async writeAndExtract(cypher: string, params?: Record<string, any>) {
    const result = await this.dbService.write(cypher, params);
    const records = result.records || [];

    return records
      .map((rec: Neo4jRecord) => rec.keys.map((k) => rec.get(k).properties))
      .flat(Infinity);
  }

  // TODO: move to migration
  addUniqueConstraint() {
    return this.dbService.write(
      'CREATE CONSTRAINT UniqueRef ' +
        'IF NOT EXISTS FOR (n:Node) ' +
        'REQUIRE n.ref IS UNIQUE',
    );
  }
}
