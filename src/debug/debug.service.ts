import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../providers/neo4j/core';
import { Record as Neo4jRecord } from 'neo4j-driver-core';

@Injectable()
export class DebugService {
  constructor(private readonly dbService: Neo4jService) {}

  async scanAll() {
    const result = await this.dbService.read('MATCH (a) RETURN a');
    const records = result.records || [];
    return this.extract(records);
  }

  async deleteAll() {
    const result = await this.dbService.write('MATCH (a) DELETE a');
    const records = result.records || [];
    return this.extract(records);
  }

  async query(qs) {
    console.log('qs', qs);
    const result = await this.dbService.read(qs);
    const records = result.records || [];
    return this.extract(records);
  }

  extract(records: Neo4jRecord[]) {
    return records
      .map((rec: Neo4jRecord) => rec.keys.map((k) => rec.get(k).properties))
      .flat(Infinity);
  }
}
