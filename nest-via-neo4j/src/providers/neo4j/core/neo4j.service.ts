import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import neo4j, { Driver, Result, Transaction } from 'neo4j-driver';

import { Neo4jConfig } from './neo4j-config.interface';
import { NEO4J_DRIVER, NEO4J_OPTIONS } from './neo4j.const';

// import TransactionImpl from 'neo4j-driver-core/lib/transaction';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  private readonly driver: Driver;
  private readonly config: Neo4jConfig;

  constructor(
    @Inject(NEO4J_OPTIONS) config: Neo4jConfig,
    @Inject(NEO4J_DRIVER) driver: Driver,
  ) {
    this.driver = driver;
    this.config = config;
  }

  getDriver() {
    return this.driver;
  }

  getConfig() {
    return this.config;
  }

  beginTransaction(database?: string): Transaction {
    const session = this.getWriteSession(database);
    return session.beginTransaction();
  }

  getReadSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.READ,
    });
  }

  getWriteSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }

  read(
    cypher: string,
    params?: Record<string, any>,
    databaseOrTransaction?: string | Transaction,
  ): Result {
    // if (databaseOrTransaction instanceof TransactionImpl) {
    //   return (<Transaction>databaseOrTransaction).run(cypher, params);
    // }

    const session = this.getReadSession(<string>databaseOrTransaction);
    return session.run(cypher, params);
  }

  write(
    cypher: string,
    params?: Record<string, any>,
    databaseOrTransaction?: string | Transaction,
  ): Result {
    // if (databaseOrTransaction instanceof TransactionImpl) {
    //   return (<Transaction>databaseOrTransaction).run(cypher, params);
    // }

    const session = this.getWriteSession(<string>databaseOrTransaction);
    return session.run(cypher, params);
  }

  onApplicationShutdown() {
    return this.driver.close();
  }
}
