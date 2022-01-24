import { Neo4jScheme } from './neo4j-schema.type';

export interface Neo4jConfig {
  scheme: Neo4jScheme;
  host: string;
  port: number | string;
  username: string;
  password: string;
  database?: string;
}
