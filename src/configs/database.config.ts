import { Neo4jConfig } from '../providers/neo4j/core/neo4j-config.interface';

export function databaseConfig(): { database: Neo4jConfig } {
  return {
    database: {
      username: 'neo4j',
      password: 'password',
      scheme: 'neo4j',
      host: process.env.NEO4J_HOST,
      port: process.env.NEO4J_PORT,
    },
  };
}
