import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Record as Neo4jRecord } from 'neo4j-driver-core';

import { toTitleCase } from '../../../common/utils';
import { Neo4jService } from '../core';

import { Action, CypherHelper } from './cypher-helper';
import { RepositoryConfig } from './repository-config.interface';
import { REPOSITORY_OPTIONS } from './repository.const';

@Injectable()
export class RepositoryService implements OnApplicationBootstrap {
  private readonly config: RepositoryConfig;

  constructor(
    private readonly dbService: Neo4jService,
    @Inject(REPOSITORY_OPTIONS) config: RepositoryConfig,
  ) {
    this.config = config;
  }

  async create(obj) {
    const queryString = CypherHelper.getQueryString({
      action: Action.CREATE,
      type: this.config.type,
      params: obj,
    });
    const records = await this.writeAndExtract(queryString, obj);
    return records[0];
  }

  async get(key) {
    const queryString = CypherHelper.getQueryString({
      action: Action.READ,
      type: this.config.type,
      params: key,
    });
    return await this.readAndExtract(queryString, key);
  }

  async scan() {
    const qs = CypherHelper.getQueryString({
      action: Action.READ,
      type: this.config.type,
    });
    return await this.readAndExtract(qs);
  }

  async delete(key) {
    const queryString = CypherHelper.getQueryString({
      action: Action.DELETE,
      type: this.config.type,
      params: key,
    });
    return await this.writeAndExtract(queryString, key);
  }

  async readAndExtract(cypher: string, params?: Record<string, any>) {
    const result = await this.dbService.read(cypher, params);
    const records = result.records || [];
    return this.extract(records);
  }

  async writeAndExtract(cypher: string, params?: Record<string, any>) {
    const result = await this.dbService.write(cypher, params);
    const records = result.records || [];
    return this.extract(records);
  }

  extract(records: Neo4jRecord[]) {
    return records
      .map((rec: Neo4jRecord) => rec.keys.map((k) => rec.get(k).properties))
      .flat(Infinity);
  }

  async onApplicationBootstrap() {
    await this.addUniqueConstraint();
  }

  async addUniqueConstraint() {
    return await this.dbService.write(
      `CREATE CONSTRAINT Unique${toTitleCase(this.config.type)}Ref ` +
        `IF NOT EXISTS FOR (n:${this.config.type}) ` +
        `REQUIRE n.${this.config.key} IS UNIQUE`,
    );
  }
}
